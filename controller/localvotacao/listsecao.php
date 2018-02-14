<?php 

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;

try{

	if (!isset($params->secao)) {
		throw new Exception('Verifique os dados preenchidos', 400);
	}

	$cidade = isset($params->cidade) ?
						(int) $params->cidade
						: 1;

	$stmt = $oConexao->prepare(
		'SELECT
			secao, local
		FROM localvotacao 
		WHERE local=:query
			AND idmunicipio=:cidade'
	); 
	if(isset($params->secao)){
		$query = $params->secao;
		$stmt->bindParam('query', $query);
	}
	$stmt->bindParam('cidade', $cidade);

	$stmt->execute();
	$results = $stmt->fetchAll(PDO::FETCH_ASSOC);


	$count = $oConexao->prepare(
		'SELECT
			COUNT(*)
		FROM localvotacao 
		WHERE local=:query
			AND idmunicipio=:cidade'
	);
	if(isset($params->secao)){
		$query = $params->secao;
		$count->bindParam('query', $query);
	}

	$count->bindParam('cidade', $cidade);

	$count->execute();
	$count_results = $count->fetchColumn();

	if(!$results && !$count_results){
		throw new Exception('Nenhum resultado encontrado', 404);
	}

	http_response_code(200);
	$response = array(
		'results' => $results,
		'count' => array(
			'results' => $count_results
		)
	);

}catch (PDOException $e){
	http_response_code(500);
	$response->error = 'Desculpa. Tivemos um problema, tente novamente mais tarde';
}catch (Exception $e) {
	http_response_code($e->getCode());
	$response->error = $e->getMessage();
}

echo json_encode($response);

?>