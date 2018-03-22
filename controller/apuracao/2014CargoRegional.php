<?php

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;

try {

	$regional = isset($params->regional) && $params->regional != 99 ? 
						$params->regional
						: null;
	$cargo = isset($params->cargo) ? 
						$params->cargo
						: null;

						echo $cargo;

	$stmt = $oConexao->prepare(
		'SELECT nomevotavel,numerovotavel
		FROM eleicoes2014apuracao
		WHERE
			municipio="RIO BRANCO"
		AND
			cargo=:cargo
		AND 
			turno=1
        AND 
        	numerovotavel NOT IN(95,96)
        GROUP BY numerovotavel
		'
	);
	$stmt->bindParam('cargo', $cargo, PDO::PARAM_STR);
	$stmt->execute();
	$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

	$i = 0;
	foreach ($results as $candidato) {

		$stmt = $oConexao->prepare(
			'SELECT lv.id,lv.local,lv.endereco,b.nome as bairro,r.nome as regional
			FROM localvotacao lv
			LEFT JOIN bairro b ON(lv.bairro=b.id)
			LEFT JOIN regional r ON(b.regional_id=r.id)
			WHERE 
				lv.idmunicipio=16
			AND
				r.id=:regional
			GROUP BY
				lv.local
			'
		);

		$stmt->bindParam('regional', $regional, PDO::PARAM_INT);
		$stmt->execute();
		$locais = $stmt->fetchAll(PDO::FETCH_ASSOC);

		foreach ($locais as $row) {

			$stmt = $oConexao->prepare(
				'SELECT secao,zona
				FROM localvotacao lv
				WHERE 
					lv.local=:local
				AND 
					lv.idmunicipio=16
				'
			);

			$stmt->bindParam('local', $row['local'], PDO::PARAM_STR);
			$stmt->execute();

			$secoes = $stmt->fetchAll(PDO::FETCH_ASSOC);

			foreach ($secoes as $sc) {

				$secao['secao'] = $sc['secao'];
				$secao['zona'] = $sc['zona'];
				$sec = explode(", ", $sc['secao']);

				for($z=0; $z<count($sec);$z++){

					$stmt_secao = $oConexao->prepare(
						'SELECT sum(qtdvotos) votos
						FROM eleicoes2014apuracao
						WHERE 
							municipio="RIO BRANCO"
						AND 
							cargo=:cargo
						AND
							secao=:secao
						AND
							zona=:zona
						AND 
						 	numerovotavel=:candidato
						'
					);
					
					$stmt_secao->bindParam('cargo', $cargo, PDO::PARAM_STR);
					$stmt_secao->bindParam('secao', $sec[$z], PDO::PARAM_STR);
					$stmt_secao->bindParam('zona', $sc['zona'], PDO::PARAM_INT);
					$stmt_secao->bindParam('candidato', $candidato['numerovotavel'], PDO::PARAM_INT);
					$stmt_secao->execute();
					
					$results_secao = $stmt_secao->fetchAll(PDO::FETCH_ASSOC);
					foreach ($results_secao as $s) {
						if($s['votos']!=null)
							$votos += $s['votos'];
					}

				}

				$secao = array();

			}

		}

		$results[$i]['votos'] = $votos;
		$votos = 0;

		$i++;

	}//end foreach candidate

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
