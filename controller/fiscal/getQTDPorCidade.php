<?php

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;

try {

	if (isset($params->cidade)) {

		$stmt = $oConexao->prepare(
		//'SELECT COUNT(*) as qtd
		//FROM  fiscal
		//WHERE idcidade = :idcidade'
		//'SELECT count(*) as qtd FROM fiscal f
		//INNER JOIN localfiscalitem lfi ON lfi.idfiscal = f.id
		//INNER JOIN localfiscal lf ON lf.id = lfi.idlocalfiscal
		//WHERE lf.idcidade = :idcidade'
		'select count(*) as qtd from localvotacao lv
		INNER JOIN localfiscal lf ON lv.local = lf.local
		INNER JOIN localfiscalitem lfi ON lfi.idlocalfiscal = lf.id
		WHERE lv.idmunicipio = :idcidade AND lv.secao = lfi.secao order by lfi.secao'
		);
		$stmt->execute(array('idcidade' => $params->cidade));
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

	}

	http_response_code(200);
	$response = $result;

}catch (PDOException $e){
	http_response_code(500);
	$response->error = 'Desculpa. Tivemos um problema, tente novamente mais tarde';
}catch (Exception $e) {
	http_response_code($e->getCode());
	$response->error = $e->getMessage();
}

echo json_encode($response);
