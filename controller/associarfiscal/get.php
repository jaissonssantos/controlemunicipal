<?php

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;

try {

	if (isset($params->id)) {

		$stmt = $oConexao->prepare(
			'SELECT 
				lf.id,lf.hash,lf.local,lf.status,lv.endereco,b.nome as bairro,c.id as cidade,c.nome as cidadenome
				FROM localfiscal lf 
				LEFT JOIN localvotacao lv
					ON(lv.local=lf.local)
				LEFT JOIN cidade c
					ON(lv.idmunicipio=c.id)
				LEFT JOIN bairro b
					ON(lv.bairro=b.id)
				WHERE lf.id=:id
				AND lv.idmunicipio=lf.idcidade
				GROUP BY lv.local'
		);
		$stmt->execute(array('id' => $params->id));

		$associado = $stmt->fetchObject();

		$stmtadv = $oConexao->prepare(
			'SELECT
				lci.secao,del.id,del.nome,del.celular1,del.celular2,del.email
			FROM localfiscalitem lci
			INNER JOIN localfiscal la 
			ON la.id = lci.idlocalfiscal
			INNER JOIN fiscal del
			ON lci.idfiscal = del.id
			WHERE lci.idlocalfiscal=:id
			ORDER BY del.nome'
		);

		$stmtadv->execute(array('id' => $params->id));
		$associado->fiscais = $stmtadv->fetchAll(PDO::FETCH_ASSOC);

	}

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
