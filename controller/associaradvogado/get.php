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
			FROM localadvogado lc
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
				adv.id,adv.nome,adv.oab,adv.email,adv.celular1,adv.celular2
			FROM localadvogadoitem lci
			INNER JOIN localadvogado la 
			ON la.id = lci.idlocaladvogado
			INNER JOIN advogado adv
			ON lci.idadvogado = adv.id
			WHERE lci.idlocaladvogado=:id
			ORDER BY adv.nome'
		);

		$stmtadv->execute(array('id' => $params->id));
		$associado->advogados = $stmtadv->fetchAll(PDO::FETCH_ASSOC);

	}

	$stmt = $oConexao->prepare(
		'SELECT COUNT(li.idadvogado)
		 FROM localadvogadoitem li
			LEFT JOIN advogado a
			ON(li.idadvogado=a.id)'
	);
	$stmt->execute();
	$associado->count->associados = $stmt->fetchColumn();

	$stmt = $oConexao->prepare(
		'SELECT COUNT(a.id)
		 FROM advogado a
			LEFT JOIN localadvogadoitem li
			ON(li.idadvogado<>a.id)'
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
