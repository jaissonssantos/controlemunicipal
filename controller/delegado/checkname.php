<?php 

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;

try{

	if (!isset($params->nome)) {
		throw new Exception('Verifique os dados preenchidos', 400);
	}

	$status = isset($params->status) ?
						(int) $params->status
						: 1;

	$cidade = isset($params->cidade) ?
						(int) $params->cidade
						: 1;

	$stmt = $oConexao->prepare(
		'SELECT
			DISTINCT(a.nome),a.id,a.celular1,a.celular2,a.email
		FROM delegado a
		WHERE a.nome LIKE :query
			AND a.status=:status
			AND a.idcidade=:cidade
		LIMIT 0,10'
	); 
	if(isset($params->nome)){
		$query = '%'.$params->nome.'%';
		$stmt->bindParam('query', $query);
	}
	$stmt->bindParam('status', $status);
	$stmt->bindParam('cidade', $cidade);

	$stmt->execute();
	$results = $stmt->fetchAll(PDO::FETCH_ASSOC);


	$count = $oConexao->prepare(
		'SELECT
			COUNT(*),
			(SELECT COUNT(*) as total 
			FROM localdelegadoitem lai
			LEFT JOIN localdelegado la ON(la.id = lai.idlocaldelegado)
			WHERE lai.iddelegado=a.id
				AND la.status=1) as qtd
		FROM delegado a 
		WHERE a.nome LIKE :query
			AND a.status=:status
			AND a.idcidade=:cidade'
	);
	if(isset($params->nome)){
		$query = '%'.$params->nome.'%';
		$count->bindParam('query', $query);
	}

	$count->bindParam('status', $status);
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