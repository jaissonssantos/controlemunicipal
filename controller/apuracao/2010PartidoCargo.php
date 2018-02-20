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
                            partido IN("PMDB","PC do B","PP","PT","PDT","PRB","DEM","PCB","PC","PPL","PPS","PSD","PSL","PSTU","PRTB","PSDB","PTB","PRP","PTC","PSC","SD","PV","PMB","PR","PSB","PSDC","PTC","PROS","PHS","PEN","PSOL","PCO","PMN","PT do B","PTN")';
    $cargo = isset($params->cargo) ? 
                        $params->cargo
                        : null;

	$stmt = $oConexao->prepare(
		'SELECT partido		
		FROM eleicoes2010apuracao 
		WHERE 
			cargo=:cargo
        AND 
			numerovotavel NOT IN(95,96)
		' . $partido . '
		GROUP BY partido
		ORDER BY partido
		'
	);

    $stmt->bindParam('cargo', $cargo, PDO::PARAM_STR);
	$stmt->execute();
	$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

	$i = 0;
	foreach ($results as $row) {

		$stmt = $oConexao->prepare(
			'SELECT el.numerovotavel,el.nomevotavel,c.nome cidade,sum(el.qtdvotos) as votos
			FROM eleicoes2010apuracao el, cidade c	
			WHERE 
				c.nome=el.municipio 
			AND
				el.cargo=:cargo
			AND 
				el.partido=:partido
            AND 
			    numerovotavel NOT IN(95,96)
			'. $cidade .'
			GROUP BY el.nomevotavel,c.nome
			ORDER BY cidade,votos DESC
			'
		);

        $stmt->bindParam('cargo', $cargo, PDO::PARAM_STR);
		$stmt->bindParam('partido', $row['partido'], PDO::PARAM_STR);
		$stmt->execute();

		$candidatos = $stmt->fetchAll(PDO::FETCH_ASSOC);

		$results[$i]['candidato'] = $candidatos;
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
	$response->error = 'Desculpa. Tivemos um problema, tente novamente mais tarde: '. $e->getMessage();
}catch (Exception $e) {
	http_response_code($e->getCode());
	$response->error = $e->getMessage();
}

echo json_encode($response);
