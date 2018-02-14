<?php
//header("Content-Type: text/html; charset=UTF-8",true);
header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;

//return JSON
$cp = array();


//mysql_set_charset('utf8');

try {
	$stmt = $oConexao->prepare(
		'SELECT
			*
		FROM cidade
		WHERE id = :id'
	);
	
	$stmt->execute(array('id' => $params->id));
	$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
	//http_response_code(200);
	//$response = $results;
	

	echo json_encode($results);


}catch (PDOException $e){
	http_response_code(500);
	$response->error = 'Desculpa. Tivemos um problema, tente novamente mais tarde';
	echo json_encode($response);
}catch (Exception $e) {
	http_response_code($e->getCode());
	$response->error = $e->getMessage();
	echo json_encode($response);
}


