<?php

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;

try {
	$stmt = $oConexao->prepare(
		'SELECT lv.id,lv.secao,lv.local,
			(SELECT COUNT(*) 
				FROM localfiscal lf 
				WHERE lf.local = lv.local
			) AS associados
			FROM localvotacao lv
			WHERE
				lv.idmunicipio=:id
				GROUP BY lv.local'
	);
	
	$stmt->execute(array('id' => $params->id));
	$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
	http_response_code(200);
	$response = $results;

}catch (PDOException $e){
	http_response_code(500);
	$response->error = 'Desculpa. Tivemos um problema, tente novamente mais tarde';
}catch (Exception $e) {
	http_response_code($e->getCode());
	$response->error = $e->getMessage();
}

echo json_encode($response);
?>