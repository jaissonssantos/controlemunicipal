<?php

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;

try {
	$stmt = $oConexao->prepare(
		'SELECT
			*
		FROM regional'
	);
	

	$stmt->execute();
	$results = $stmt->fetchAll(PDO::FETCH_ASSOC);


	http_response_code(200);
	$response = $results;

}catch (PDOException $e){
	//echo $e->getMessage();
	http_response_code(500);
	$response->error = 'Desculpa. Tivemos um problema, tente novamente mais tarde';
}catch (Exception $e) {
	http_response_code($e->getCode());
	$response->error = $e->getMessage();
}

echo json_encode($response);
