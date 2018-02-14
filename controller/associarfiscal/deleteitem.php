<?php

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass();

try {

	//Apagar associados
	$stmt = $oConexao->prepare(
		'DELETE FROM localfiscalitem 
			WHERE idfiscal=:id
	');
	$stmt->bindValue(':id', $params->id);
	if($stmt->execute()){
		http_response_code(200);
		$response->success = 'Fiscal excluído com sucesso';	
	}

}catch (PDOException $e){
	http_response_code(500);
	$response->error = 'Desculpa. Tivemos um problema, tente novamente mais tarde';
}catch (Exception $e) {
	http_response_code($e->getCode());
	$response->error = $e->getMessage();
}

echo json_encode($response);
