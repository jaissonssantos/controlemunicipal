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

    if (!count($params->advogados)) {
            throw new Exception('Verifique os dados preenchidos', 400);
    }

    $oConexao->beginTransaction();

    $stmt = $oConexao->prepare(
    'INSERT INTO
        localadvogado(
            hash,idcidade,idlocalvotacao,status
        ) VALUES (
            :hash,:idcidade,:idlocalvotacao,:status
        )');

    $stmt->execute($associar);
    $idlocaladvogado = $oConexao->lastInsertId();

    //Inserir advogados associados
    $local_advogado =  array('idlocaladvogado' => $idlocaladvogado);
    $stmt = $oConexao->prepare(
        'INSERT INTO 
            localadvogadoitem(
                idlocaladvogado,idadvogado
            ) VALUES (
                :idlocaladvogado,:idadvogado
            )'
    );

    $advogados = $params->advogados;
    foreach ($advogados as $advogado) {
        if(isset($advogado->id)){
            $local_advogado['idadvogado'] = $advogado->id;
            $stmt->execute($local_advogado);
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