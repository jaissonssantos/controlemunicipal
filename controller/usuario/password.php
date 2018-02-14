<?php 

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass();

try{

	if (!isset($params->id)) {
        throw new Exception('Verifique os dados preenchidos', 400);
    }

    $usuario = (array) $params;

    $required = array('id', 'senha');

    $usuario = array_intersect_key($usuario, array_flip($required));

    if (count($usuario) != count($required)) {
            throw new Exception('Verifique os dados preenchidos', 400);
    }

    $usuario['senha'] = sha1( SALT. $usuario['senha'] );

    $oConexao->beginTransaction();

    $stmt = $oConexao->prepare(
    'UPDATE usuario SET
		senha=:senha
    	WHERE id=:id');

    $stmt->execute($usuario);

	$oConexao->commit();
    http_response_code(200);
    $response->success = 'Senha atualizada com sucesso';


}catch (PDOException $e){
    http_response_code(500);
    $response->error = 'Desculpa. Tivemos um problema, tente novamente mais tarde';
}catch (Exception $e) {
    http_response_code($e->getCode());
    $response->error = $e->getMessage();
}

echo json_encode($response);

?>