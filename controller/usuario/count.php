<?php

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;

try {

	$count = $oConexao->prepare(
		'SELECT
			COUNT(*)
		FROM usuario u
		WHERE u.status = :status'
	);

	$status = 1;
	$count->bindParam('status', $status);
	$count->execute();
	$count_results = $count->fetchColumn();

	http_response_code(200);
	if(!$count_results){
		throw new Exception('Nenhum resultado encontrado', 404);
	}
	$response = array(
		'count' => array(
			'results' => $count_results,
		)
	);

}catch (PDOException $e){
	http_response_code(500);
	$response->error = 'Desculpa. Tivemos um problema, tente novamente mais tarde';
}catch (Exception $e) {
	http_response_code($e->getCode());
	$response->error = $e->getMessage();
}

echo json_encode($response);
