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
    $associar['local'] = $params->local;
    $associar['status'] = 1;

    $required = array('hash', 'idcidade','local', 'status');
    $associar = array_intersect_key($associar, array_flip($required));

    if (count($associar) != count($required)) {
            throw new Exception('Verifique os dados preenchidos', 400);
    }

    $oConexao->beginTransaction();

    $stmt = $oConexao->prepare(
    'INSERT INTO
        localfiscal(
            hash,idcidade,local,status
        ) VALUES (
            :hash,:idcidade,:local,:status
        )');

    $stmt->execute($associar);
    $idlocalfiscal = $oConexao->lastInsertId();

    //Inserir fiscais associados
    $local_fiscal =  array('idlocalfiscal' => $idlocalfiscal);
    $stmt = $oConexao->prepare(
        'INSERT INTO 
            localfiscalitem(
                idlocalfiscal,secao,idfiscal
            ) VALUES (
                :idlocalfiscal,:secao,:idfiscal
            )'
    );

    $fiscais = $params->fiscais;
    foreach ($fiscais as $fiscal) {
        if(isset($fiscal->id)){
            $local_fiscal['secao'] = $fiscal->secao;
            $local_fiscal['idfiscal'] = $fiscal->id;
            $stmt->execute($local_fiscal);
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