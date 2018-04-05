<?php

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;

try {

	$cidade = isset($params->cidade) ?
						$params->cidade
						: 16;
	$zona = isset($params->zona) ?
						$params->zona
						: null;
	$ano = isset($params->ano) ?
						$params->ano
						: '';

	$stmt = $oConexao->prepare(
		'SELECT secao,zona
		FROM localvotacao'. $ano .' lv
		WHERE 
			lv.idmunicipio=:cidade
		AND
			zona=:zona
		GROUP BY secao'
	);

	$stmt->bindParam('cidade', $cidade, PDO::PARAM_STR);
	$stmt->bindParam('zona', $zona, PDO::PARAM_STR);
	$stmt->execute();

	$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

	http_response_code(200);
	if(!$results){
		throw new Exception('Nenhum resultado encontrado', 404);
	}
	$response = $results;

}catch (PDOException $e){
	http_response_code(500);
	$response->error = 'Desculpa. Tivemos um problema, tente novamente mais tarde';
}catch (Exception $e) {
	http_response_code($e->getCode());
	$response->error = $e->getMessage();
}

echo json_encode($response);
