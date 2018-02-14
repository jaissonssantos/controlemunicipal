<?php

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass();

try {

	//Apagar associados
	$stmt = $oConexao->prepare(
		'DELETE FROM localadvogadoitem 
			WHERE idadvogado=:id AND idlocaladvogado=:idlocal
	');
	$stmt->bindValue(':id', $params->id);
	$stmt->bindValue(':idlocal', $params->associar);
	if($stmt->execute()){
		http_response_code(200);
		$response->success = 'Advogado excluído com sucesso';	
	}

}catch (PDOException $e){
	http_response_code(500);
	$response->error = 'Desculpa. Tivemos um problema, tente novamente mais tarde';
}catch (Exception $e) {
	http_response_code($e->getCode());
	$response->error = $e->getMessage();
}

echo json_encode($response);
