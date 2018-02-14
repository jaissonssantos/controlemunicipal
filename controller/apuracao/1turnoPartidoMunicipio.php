<?php

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;

try {

	$cidade = isset($params->cidade) && $params->cidade != 99 ? 
						' AND 
							c.id=' . $params->cidade
						: null;
	$partido = isset($params->partido) && $params->partido != 99 ? 
						' AND 
							partido="'. $params->partido . '"'
						: ' AND 
							partido IN("PMDB","PC do B","PP","PT","PDT","PRB","DEM","PSD","PSDB","PRP","PSC","PMB","PR","PSB","PSDC","PTC","PROS","PHS","PEN","PSOL")';

	$stmt = $oConexao->prepare(
		'SELECT partido		
		FROM eleicoes2016apuracao 
		WHERE 
			cargo="VEREADOR"
		' . $partido . '
		GROUP BY partido
		ORDER BY partido 
		'
	);

	$stmt->execute();
	$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

	$i = 0;
	foreach ($results as $row) {

		$stmt = $oConexao->prepare(
			'SELECT c.nome,sum(el.qtdvotos) as votos
			FROM eleicoes2016apuracao el, cidade c	
			WHERE 
				c.nome=el.municipio 
			AND
				el.cargo="VEREADOR"
			AND 
				el.partido=:partido
			'. $cidade .'
			GROUP BY el.partido,c.nome
			ORDER BY c.nome,votos DESC
			'
		);

		$stmt->bindParam('partido', $row['partido'], PDO::PARAM_STR);
		$stmt->execute();

		$cidades = $stmt->fetchAll(PDO::FETCH_ASSOC);

		$results[$i]['cidade'] = $cidades;
		$i++;

	}

	http_response_code(200);
	if(!$results){
		throw new Exception('Nenhum resultado encontrado', 404);
	}
	$response = array(
		'results' => $results	
	);

}catch (PDOException $e){
	http_response_code(500);
	$response->error = 'Desculpa. Tivemos um problema, tente novamente mais tarde';
}catch (Exception $e) {
	http_response_code($e->getCode());
	$response->error = $e->getMessage();
}

echo json_encode($response);
