<?php 

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass();

try{

    $associar = (array) $params;

    /*set names*/
    $associar['hash'] = generatehash();
    $associar['idcidade'] = $params->cidade;
    $associar['idlocalvotacao'] = $params->local;
    $associar['status'] = 1;

    $required = array('hash', 'idcidade','idlocalvotacao', 'status');
    $associar = array_intersect_key($associar, array_flip($required));

    if (count($associar) != count($required)) {
            throw new Exception('Verifique os dados preenchidos', 400);
    }

    if (!count($params->coordenadores)) {
            throw new Exception('Verifique os dados preenchidos', 400);
    }

    $oConexao->beginTransaction();

    $stmt = $oConexao->prepare(
    'INSERT INTO
        localcoordenador(
            hash,idcidade,idlocalvotacao,status
        ) VALUES (
            :hash,:idcidade,:idlocalvotacao,:status
        )');

    $stmt->execute($associar);
    $idlocalcoordenador = $oConexao->lastInsertId();

    //Inserir coordenador associados
    $local_coordenador =  array('idlocalcoordenador' => $idlocalcoordenador);
    $stmt = $oConexao->prepare(
        'INSERT INTO 
            localcoordenadoritem(
                idlocalcoordenador,idcoordenador
            ) VALUES (
                :idlocalcoordenador,:idcoordenador
            )'
    );

    $coordenadores = $params->coordenadores;
    foreach ($coordenadores as $coordenador) {
        if(isset($coordenador->id)){
            $local_coordenador['idcoordenador'] = $coordenador->id;
            $stmt->execute($local_coordenador);
        } 
    }

	$oConexao->commit();
    http_response_code(200);
    $response->success = 'Associação salva com sucesso';


}catch (PDOException $e){
    http_response_code(500);
    $response->error = 'Desculpa. Tivemos um problema, tente novamente mais tarde: ' .$e->getMessage();
}catch (Exception $e) {
    http_response_code($e->getCode());
    $response->error = $e->getMessage();
}

echo json_encode($response);

?>