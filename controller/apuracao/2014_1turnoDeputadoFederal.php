<?php

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;
$response->count = array('ativos' => 0 ,'inativos' => 0);

try {

    $cidade = isset($params->cidade) && $params->cidade != 'AC' ?
                        ' AND
                            municipio="'. $params->cidade . '"'
                        : '';

	$stmt = $oConexao->prepare(
		'SELECT
			numerovotavel,nomevotavel,partido,sum(qtdvotos) as votos,eleito
		FROM eleicoes2014apuracao		
		WHERE cargo="DEPUTADO FEDERAL"
		AND turno=1 
        AND numerovotavel NOT IN(10,11,12,13,14,15,17,18,19,20,22,23,25,27,31,33,35,36,40,43,44,45,50,55,51,65,77,90,95,96)
		'. $cidade .' 
		GROUP BY nomevotavel
		ORDER BY votos DESC'
	);
	$stmt->execute();

	$results = $stmt->fetchAll(PDO::FETCH_ASSOC);


	$count = $oConexao->prepare(
		'SELECT
			COUNT(*)
		FROM eleicoes2014apuracao
		WHERE cargo="DEPUTADO FEDERAL"
		AND turno=1
        AND numerovotavel NOT IN(95,96)
        GROUP BY numerovotavel'
	);

	$count->execute();
	$count_results = $count->rowCount();

	$count = $oConexao->prepare(
		'SELECT
			sum(qtdvotos) as votos
		FROM eleicoes2014apuracao
		WHERE cargo="DEPUTADO FEDERAL"
        AND turno=1 ' . $cidade
	);

	$count->execute();
	$count_votes = $count->fetchColumn();

	http_response_code(200);
	if(!$count_results && !$count_votes){
		throw new Exception('Nenhum resultado encontrado', 404);
	}
	$response = array(
		'results' => $results,
		'count' => array(
			'results' => $count_results,
			'votes' => $count_votes
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
