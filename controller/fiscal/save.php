<?php

$oConexao = Conexao::getInstance();

//params
$params = json_decode(file_get_contents('php://input'));

//get session local browser
//$uid = $_SESSION['ang_ktcomentario_uid'];
$response = new stdClass();

try {

	$status = isset($params->status) && $params->status == 2
						? 2
						: 1;

	$status = !isset($params->status) 
						? 1
						: 2;

	//inserir o comentario
	$stmt = $oConexao->prepare(
		'INSERT INTO fiscal(
			nome, celular1, celular2, email, status, idcidade
		)VALUES(
			:nome, :celular1, :celular2, :email, :status, :idcidade
		)
	');
	$stmt->bindValue('nome', $params->nome);
	$stmt->bindValue('celular1', $params->celular1);
	$stmt->bindValue('celular2', $params->celular2);
	$stmt->bindValue('email', $params->email);
	$stmt->bindValue('status', 1);
	$stmt->bindValue('idcidade', $params->idcidade);
	$stmt->execute();

	http_response_code(200);
	$response->success = 'Fiscal salvo com sucesso';


}catch (PDOException $e){
	http_response_code(500);
	$response->error = 'Desculpa. Tivemos um problema, tente novamente mais tarde';
}catch (Exception $e) {
	http_response_code($e->getCode());
	$response->error = $e->getMessage();
}

echo json_encode($response);
