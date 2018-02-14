<?php

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;

try {

	$associados = isset($params->associados) ? $params->associados : null;
	$status	= isset($params->status) ? $params->status : 1;

	if ( !is_array($associados) ) {
		throw new Exception('Verifique os dados preenchidos', 400);
	}

	$idsAssociados = implode(',', $associados);

	$oConexao->beginTransaction();

	$stmt = $oConexao->prepare(
		'UPDATE localcoordenador lc SET status=?' .
		'WHERE FIND_IN_SET(cast(lc.id AS CHAR), ?)'
	);
	$stmt->execute(array($status, $idsAssociados));

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
