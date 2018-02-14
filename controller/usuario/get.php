<?php 	

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass();

try{

	if (!isset($params->id)) {
        throw new Exception('Verifique os dados preenchidos', 400);
    }   

	$stmt = $oConexao->prepare(
		'SELECT 
				u.id,u.nome,u.email,u.perfil,u.status
			FROM usuario u 
			WHERE u.id=:id
		LIMIT 1'
	);  
	$stmt->execute(array('id' => $params->id));
	$usuario = $stmt->fetchObject();

	if(!$usuario){
		throw new Exception('Não encontrado', 404);
	}

	$stmtuc = $oConexao->prepare(
		'SELECT c.id,c.nome as nome,e.nome as estado
			FROM usuario_cidade uc
			LEFT JOIN cidade c 
			ON uc.idcidade = c.id
			LEFT JOIN estado e 
			ON e.idestado = c.estado_id
			WHERE uc.idusuario=:id
		ORDER BY c.nome'
	);
	$stmtuc->execute(array('id' => $params->id));
	$usuario->cidade = $stmtuc->fetchAll(PDO::FETCH_ASSOC);

	http_response_code(200);
	$response = $usuario;

} catch (PDOException $e) {
    http_response_code(500);
    $response->error = 'Desculpa. Tivemos um problema, tente novamente mais tarde';
} catch (Exception $e) {
    http_response_code($e->getCode());
    $response->error = $e->getMessage();
}

echo json_encode($response);

?>