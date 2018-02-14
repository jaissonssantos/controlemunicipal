<?php

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;
$response->count = array('ativos' => 0 ,'inativos' => 0);

try {

	$status = isset($params->status) && $params->status == 1 ?
						' AND numerovotavel NOT IN(10,11,12,13,14,15,17,18,19,20,22,23,25,27,31,33,35,36,40,43,44,45,50,55,51,65,77,90,95,96)
						GROUP BY nomevotavel'
						: ' AND partido IN("PMDB","PC do B","PP","PT","PDT","PRB","DEM","PSD","PSDB","PRP","PSC","PMB","PR","PSB","PSDC","PTC","PROS","PHS","PEN","PSOL")
						GROUP BY partido';

	$cidade = isset($params->cidade) ?
						$params->cidade
						: 'RIO BRANCO';

	$stmt = $oConexao->prepare(
		'SELECT
			numerovotavel,nomevotavel,partido,sum(qtdvotos) as votos,eleito
		FROM eleicoes2016apuracao		
		WHERE municipio=:cidade
		AND cargo="VEREADOR"
		'. $status .'
		ORDER BY votos DESC'
	);

	$stmt->bindParam('cidade', $cidade, PDO::PARAM_STR);
	$stmt->execute();

	$results = $stmt->fetchAll(PDO::FETCH_ASSOC);


	$count = $oConexao->prepare(
		'SELECT
			COUNT(*)
		FROM eleicoes2016apuracao
		WHERE municipio=:cidade
		AND cargo="VEREADOR"
		AND numerovotavel NOT IN(10,11,12,13,14,15,17,18,19,20,22,23,25,27,31,33,35,36,40,43,44,45,50,55,51,65,77,90,95,96)
		GROUP BY numerovotavel'
	);

	$count->bindParam('cidade', $cidade, PDO::PARAM_STR);
	$count->execute();
	$count_results_vereadores = $count->rowCount();

	$count = $oConexao->prepare(
		'SELECT
			COUNT(*)
		FROM eleicoes2016apuracao
		WHERE municipio=:cidade
		AND cargo="VEREADOR"
		AND partido IN("PMDB","PC do B","PP","PT","PDT","PRB","DEM","PSD","PSDB","PRP","PSC","PMB","PR","PSB","PSDC","PTC","PROS","PHS","PEN","PSOL")
		GROUP BY partido'
	);

	$count->bindParam('cidade', $cidade, PDO::PARAM_STR);
	$count->execute();
	$count_results_partido = $count->rowCount();

	$count = $oConexao->prepare(
		'SELECT
			sum(qtdvotos) as votos
		FROM eleicoes2016apuracao
		WHERE municipio=:cidade
		AND cargo="VEREADOR"'
	);

	$count->bindParam('cidade', $cidade, PDO::PARAM_STR);
	$count->execute();
	$count_votes = $count->fetchColumn();

	http_response_code(200);
	if(!$count_results_vereadores && !$count_votes){
		throw new Exception('Nenhum resultado encontrado', 404);
	}
	$response = array(
		'results' => $results,
		'count' => array(
			'vereadores' => $count_results_vereadores,
			'partido' => $count_results_partido,
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
