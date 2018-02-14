<?php

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;


if(!isset($params->id)){
	throw new Exception('Verifique os dados preenchidos', 400);
}

$id = $params->id;

//echo $id;

try {

	$stmt = $oConexao->prepare(
		'SELECT
			*
		FROM cidade sv
		WHERE sv.id = ?
		LIMIT 1'
	);
	$stmt->bindValue('id', $id);
	$stmt->execute();
	$regional = $stmt->fetchObject();

	//print_r($regional);

	if(!$regional){
		throw new Exception('Não encontrado', 404);
	}

	http_response_code(200);
	$response = $regional;

}catch (PDOException $e){
	//echo $e->getMessage();
	http_response_code(500);
	$response->error = 'Desculpa. Tivemos um problema, tente novamente mais tarde';
}catch (Exception $e) {
	http_response_code($e->getCode());
	$response->error = $e->getMessage();
}

echo json_encode($response);
