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

    $required = array('id', 'nome','email', 'perfil', 'status');

    $usuario = array_intersect_key($usuario, array_flip($required));

    if (count($usuario) != count($required)) {
            throw new Exception('Verifique os dados preenchidos', 400);
    }

    $oConexao->beginTransaction();

    $stmt = $oConexao->prepare(
    'UPDATE usuario SET
		nome=:nome,email=:email,perfil=:perfil,status=:status
    	WHERE id=:id');

    $stmt->execute($usuario);

    // Perfil administrador do sistema
    if($usuario['perfil'] == 1){

    	//Deletar permissões
        $stmt = $oConexao->prepare(
        'DELETE FROM usuario_permissao
        	WHERE idusuario=:idusuario');
        $stmt->execute(array('idusuario' => $params->id));

        // Permissões
        $stmt = $oConexao->prepare(
        'INSERT INTO usuario_permissao(
                idusuario,permissao
            ) VALUES (
                :idusuario,:permissao
            )');

        $usuario_permissao = array('idusuario' => $params->id);
        $permissao = array(
                    '/dashboard',
                    '/advogado', 
                    '/coordenador', 
                    '/delegado', 
                    '/fiscal', 
                    '/candidato', 
                    '/associar', 
                    '/apuracao',
                    '/relatorio', 
                    '/mapa', 
                    '/usuario', 
                    '/404'
                );

        foreach ($permissao as $p) {
                $usuario_permissao['permissao'] = $p;
                $stmt->execute($usuario_permissao);
        }

    // Perfil gestor de tarefas
    }else if($usuario['perfil'] == 2){

    	//Deletar permissões
        $stmt = $oConexao->prepare(
        'DELETE FROM usuario_permissao
        	WHERE idusuario=:idusuario');
        $stmt->execute(array('idusuario' => $params->id));

        // Permissões
        $stmt = $oConexao->prepare(
        'INSERT INTO usuario_permissao(
                idusuario,permissao
            ) VALUES (
                :idusuario,:permissao
            )');

        $usuario_permissao = array('idusuario' => $params->id);
        $permissao = array(
                    '/dashboard',
                    '/advogado', 
                    '/coordenador', 
                    '/delegado', 
                    '/fiscal', 
                    '/candidato', 
                    '/associar', 
                    '/apuracao',
                    '/relatorio', 
                    '/mapa', 
                    '/404'
                );

        foreach ($permissao as $p) {
                $usuario_permissao['permissao'] = $p;
                $stmt->execute($usuario_permissao);
        }

    // Perfil observador de resultados
    }else if($usuario['perfil'] == 3){

    	//Deletar permissões
        $stmt = $oConexao->prepare(
        'DELETE FROM usuario_permissao
        	WHERE idusuario=:idusuario');
        $stmt->execute(array('idusuario' => $params->id));

        // Permissões
        $stmt = $oConexao->prepare(
        'INSERT INTO usuario_permissao(
                idusuario,permissao
            ) VALUES (
                :idusuario,:permissao
            )');

        $usuario_permissao = array('idusuario' => $params->id);
        $permissao = array(
                    '/dashboard',
                    '/relatorio',
                    '/apuracao',
                    '/404'
                );

        foreach ($permissao as $p) {
                $usuario_permissao['permissao'] = $p;
                $stmt->execute($usuario_permissao);
        }

    }


    //Deletar cidade do cliente
    $stmt = $oConexao->prepare(
    'DELETE FROM usuario_cidade
    	WHERE idusuario=:idusuario');
    $stmt->execute(array('idusuario' => $params->id));

    //Inserir cidade do cliente
    $usuario_cidade =  array('idusuario' => $params->id);
    $stmt = $oConexao->prepare(
        'INSERT INTO 
            usuario_cidade(
                idusuario,idcidade
            ) VALUES (
                :idusuario,:idcidade
            )'
    );

    $cidades = $params->cidades;
    foreach ($cidades as $cidade) {
        if(isset($cidade->id)){
            $usuario_cidade['idcidade'] = $cidade->id;
            $stmt->execute($usuario_cidade);
        } 
    }


	$oConexao->commit();
    http_response_code(200);
    $response->success = 'Usuário atualizado com sucesso';


}catch (PDOException $e){
    http_response_code(500);
    $response->error = 'Desculpa. Tivemos um problema, tente novamente mais tarde';
}catch (Exception $e) {
    http_response_code($e->getCode());
    $response->error = $e->getMessage();
}

echo json_encode($response);

?>