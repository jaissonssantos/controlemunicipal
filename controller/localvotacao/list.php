<?php

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;

try {
	$stmt = $oConexao->prepare(
		'SELECT
			lv.id, lv.secao, lv.local, lv.coordenadas, sum(eleitorado) as qtdvotos, lv.endereco, b.nome as bairro, c.nome as cidade,
			(SELECT count(*) as total FROM localfiscal lvf WHERE lvf.local = lv.local) as associados
		FROM localvotacao lv, bairro b, cidade c
		WHERE lv.bairro = b.id AND lv.idmunicipio = c.id AND lv.idmunicipio = :id group by lv.local'
	);
	
	$stmt->execute(array('id' => $params->id));
	$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
	http_response_code(200);
	$response = $results;

}catch (PDOException $e){
	http_response_code(500);
	$response->error = 'Desculpa. Tivemos um problema, tente novamente mais tarde';
}catch (Exception $e) {
	http_response_code($e->getCode());
	$response->error = $e->getMessage();
}

echo json_encode($response);
?>