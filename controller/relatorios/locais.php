<?php
//header("Content-Type: text/html; charset=UTF-8",true);
header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;


$id = $params->id;
try{

//pega os locais da regional especifica
$stmt = $oConexao->prepare(
	'SELECT
	lv.id, lv.local, lv.endereco, b.nome as bairro, lv.idmunicipio, r.nome as regional
	FROM localvotacao lv, bairro b, regional r
	WHERE lv.bairro = b.id AND b.regional_id = r.id AND lv.idmunicipio = :id group by lv.local order by lv.local'
	);
$stmt->bindParam('id', $id);
$stmt->execute();
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($results);


}catch (PDOException $e){
	http_response_code(500);
	$response->error = 'Desculpa. Tivemos um problema, tente novamente mais tarde';
	echo json_encode($response);
}catch (Exception $e) {
	http_response_code($e->getCode());
	$response->error = $e->getMessage();
	echo json_encode($response);
}