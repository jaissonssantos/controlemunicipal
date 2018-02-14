<?php 

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass();

try{

    $associar = (array) $params;

    /*set names*/

    $associar['idcidade'] = $params->cidade;
    $associar['idlocalvotacao'] = $params->local;

    $required = array('id','idcidade','idlocalvotacao');
    $associar = array_intersect_key($associar, array_flip($required));

    if (count($associar) != count($required)) {
            throw new Exception('Verifique os dados preenchidos', 400);
    }

    $oConexao->beginTransaction();

    $stmt = $oConexao->prepare(
    'UPDATE localdelegado SET
            idcidade=:idcidade,idlocalvotacao=:idlocalvotacao
        WHERE id=:id'
    );

    $stmt->execute($associar);

    //Deleta delegados associados
    $local_delegado =  array('idlocaldelegado' => $associar['id']);
    $stmt = $oConexao->prepare(
        'DELETE FROM localdelegadoitem
            WHERE idlocaldelegado=:idlocaldelegado'
    );
    $stmt->execute($local_delegado);

    //Inserir delegados associados
    $stmt = $oConexao->prepare(
        'INSERT INTO 
            localdelegadoitem(
                idlocaldelegado,iddelegado
            ) VALUES (
                :idlocaldelegado,:iddelegado
            )'
    );

    $delegados = $params->delegados;
    foreach ($delegados as $delegado) {
        if(isset($delegado->id)){
            $local_delegado['iddelegado'] = $delegado->id;
            $stmt->execute($local_delegado);
        } 
    }

	$oConexao->commit();
    http_response_code(200);
    $response->success = 'Associação atualizada com sucesso';


}catch (PDOException $e){
    http_response_code(500);
    $response->error = 'Desculpa. Tivemos um problema, tente novamente mais tarde: ' .$e->getMessage();
}catch (Exception $e) {
    http_response_code($e->getCode());
    $response->error = $e->getMessage();
}

echo json_encode($response);

?>