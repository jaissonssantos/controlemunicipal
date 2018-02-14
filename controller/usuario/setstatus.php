<?php

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;

try {

	$usuarios = isset($params->usuarios) ? $params->usuarios : null;
	$status	= isset($params->status) ? $params->status : 1;

	if ( !is_array($usuarios) ) {
		throw new Exception('Verifique os dados preenchidos', 400);
	}

	$idsUsuarios = implode(',', $usuarios);

	$oConexao->beginTransaction();

	$stmt = $oConexao->prepare(
		'UPDATE usuario u SET status=?' .
		'WHERE FIND_IN_SET(cast(u.id AS CHAR), ?)'
	);
	$stmt->execute(array($status, $idsUsuarios));

	http_response_code(200);
	$response->success = 'Atualizado com sucesso';
	$oConexao->commit();

}catch (PDOException $e){
	$oConexao->rollBack();
	http_response_code(500);
	$response->error = 'Desculpa. Tivemos um problema, tente novamente mais tarde';
}catch (Exception $e) {
	http_response_code($e->getCode());
	$response->error = $e->getMessage();
}

echo json_encode($response);
