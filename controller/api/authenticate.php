<?php 
header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass();

try{

	if(!isset($params->email)){
		throw new Exception('Verifique os dados preenchidos', 400);
    }

    $login = (array) $params;

    /*set names*/
    $login['senha'] = sha1(SALT. $params->senha);

    $required = array('email', 'senha');

    $login = array_intersect_key($login, array_flip($required));

    if (count($login) != count($required)) {
            throw new Exception('Verifique os dados preenchidos', 400);
    }

	$stmt = $oConexao->prepare(
		'SELECT id,nome,email,perfil,status
			FROM usuario
			WHERE UPPER(email)=UPPER(:email)
			AND UPPER(senha)=UPPER(:senha)
			AND status=1'
	);  
	$stmt->execute($login);
	$usuario = $stmt->fetchObject();

	$stmt = $oConexao->prepare(
		'SELECT
			permissao
		FROM usuario_permissao
		WHERE idusuario=?'
	);

	$stmt->execute(array($usuario->id));
	$usuario->permissao = $stmt->fetchAll(PDO::FETCH_ASSOC);

	$stmt = $oConexao->prepare(
		'SELECT
			idcidade as cidade
		FROM usuario_cidade
		WHERE idusuario=?'
	);

	$stmt->execute(array($usuario->id));
	$usuario->cidade = $stmt->fetchAll(PDO::FETCH_ASSOC);

	if(!$usuario || !count($usuario->permissao) || !count($usuario->cidade)){
		throw new Exception('Credenciais não encontrada, verifique os dados informados', 404);
	}

	if($usuario && count($usuario->permissao) && count($usuario->cidade)){
		//criando a session
		$_SESSION['ang_cm_uid'] = $usuario->id;
		$_SESSION['ang_cm_name'] = $usuario->nome;
		$_SESSION['ang_cm_email'] = $usuario->email;
		$_SESSION['ang_cm_profile'] = $usuario->perfil;
		$_SESSION['ang_cm_roles'] = $usuario->permissao;
		$_SESSION['ang_cm_city'] = $usuario->cidade;
		
		http_response_code(200);
		$response = $usuario;
	}

}catch (PDOException $e){
	http_response_code(500);
	$response->error = 'Desculpa. Tivemos um problema, tente novamente mais tarde';
}catch (Exception $e) {
	http_response_code($e->getCode());
	$response->error = $e->getMessage();
}

echo json_encode($response);

?>