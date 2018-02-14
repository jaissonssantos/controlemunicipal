<?php

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;

try {

	if (isset($params->id)) {

		$stmt = $oConexao->prepare(
			'SELECT
				lc.id,lc.hash,c.id as cidade,c.nome as cidadenome,lv.id as local,lv.local as localnome,lc.status,lv.endereco,b.nome as bairro
			FROM localdelegado lc
			INNER JOIN cidade c 
			ON lc.idcidade = c.id
			INNER JOIN localvotacao lv
			ON lc.idlocalvotacao = lv.id
			INNER JOIN bairro b
			ON lv.bairro = b.id
			WHERE lc.id=:id'
		);
		$stmt->execute(array('id' => $params->id));

		$associado = $stmt->fetchObject();

		$stmtadv = $oConexao->prepare(
			'SELECT
				del.id,del.nome,del.celular1,del.celular2,del.email
			FROM localdelegadoitem lci
			INNER JOIN localdelegado la 
			ON la.id = lci.idlocaldelegado
			INNER JOIN delegado del
			ON lci.iddelegado = del.id
			WHERE lci.idlocaldelegado=:id
			ORDER BY del.nome'
		);

		$stmtadv->execute(array('id' => $params->id));
		$associado->delegados = $stmtadv->fetchAll(PDO::FETCH_ASSOC);

	}

	$stmt = $oConexao->prepare(
		'SELECT COUNT(li.iddelegado)
		 FROM localdelegadoitem li
			LEFT JOIN delegado a
			ON(li.iddelegado=a.id)'
	);
	$stmt->execute();
	$associado->count->associados = $stmt->fetchColumn();

	$stmt = $oConexao->prepare(
		'SELECT COUNT(a.id)
		 FROM delegado a
			LEFT JOIN localdelegadoitem li
			ON(li.iddelegado<>a.id)'
	);
	$stmt->execute();
	$associado->count->naoassociados = $stmt->fetchColumn();

	if(!$associado){
		throw new Exception('Não encontrado', 404);
	}

	http_response_code(200);
	$response = $associado;

}catch (PDOException $e){
	http_response_code(500);
	$response->error = 'Desculpa. Tivemos um problema, tente novamente mais tarde';
}catch (Exception $e) {
	http_response_code($e->getCode());
	$response->error = $e->getMessage();
}

echo json_encode($response);
