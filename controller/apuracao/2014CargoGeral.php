<?php

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;

try {

	$cidade = isset($params->cidade) && $params->cidade != 99 ? 
						$params->cidade
						: null;
    $cargo = isset($params->cargo) ? 
						$params->cargo
						: null;
	$candidato = isset($params->candidato) ? 
						$params->candidato
                        : null;
    $turno = isset($params->turno) ? 
						$params->turno
						: 1;
	$bairro = isset($params->bairro) && $params->bairro != 'all' ? 
						$params->bairro == 'ZONA RURAL' ? 
							" AND 
								b.nome='ZONA RURAL'"
						:
							" AND 
								b.nome<>'ZONA RURAL'"
						: null;

	$stmt = $oConexao->prepare(
		'SELECT lv.id,lv.local,lv.endereco,b.nome as bairro
		FROM localvotacao2014 lv
		LEFT JOIN bairro b ON(lv.bairro=b.id)
		WHERE 
			lv.idmunicipio=:cidade '.$bairro.'
		GROUP BY
			lv.local
		'
	);

	$stmt->bindParam('cidade', $cidade, PDO::PARAM_INT);
	$stmt->execute();
	$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

	$i = 0;
	foreach ($results as $row) {

		$stmt = $oConexao->prepare(
			'SELECT secao,zona
			FROM localvotacao2014 lv
			WHERE 
				lv.local=:local
			AND 
				lv.idmunicipio=:cidade
			'
		);

		$stmt->bindParam('local', $row['local'], PDO::PARAM_STR);
		$stmt->bindParam('cidade', $cidade, PDO::PARAM_INT);
		$stmt->execute();

		$secoes = $stmt->fetchAll(PDO::FETCH_ASSOC);

		$x = 0;
		foreach ($secoes as $sc) {

			$secao['secao'] = $sc['secao'];
			$secao['zona'] = $sc['zona'];
			$sec = explode(", ", $sc['secao']);

			for($z=0; $z<count($sec);$z++){

				$stmt_secao = $oConexao->prepare(
					'SELECT sum(el.qtdvotos) votos
					FROM eleicoes2014apuracao el, cidade c
					WHERE
						c.nome=el.municipio
					AND 
						c.id=:cidade
					AND 
						el.cargo=:cargo
					AND
						el.secao=:secao
					AND
						el.zona=:zona
					AND
						el.numerovotavel=:candidato
                    AND
                        el.turno=:turno
					'
				);
				
				$stmt_secao->bindParam('cidade', $cidade, PDO::PARAM_INT);
                $stmt_secao->bindParam('cargo', $cargo, PDO::PARAM_STR);
                $stmt_secao->bindParam('secao', $sec[$z], PDO::PARAM_STR);
				$stmt_secao->bindParam('zona', $sc['zona'], PDO::PARAM_INT);
                $stmt_secao->bindParam('candidato', $candidato, PDO::PARAM_STR);
                $stmt_secao->bindParam('turno', $turno, PDO::PARAM_INT);
				$stmt_secao->execute();
				
				$results_secao = $stmt_secao->fetchAll(PDO::FETCH_ASSOC);
				foreach ($results_secao as $s) {
					if($s['votos']!=null)
						$secao['votos'] = $s['votos'];
				}

			}

			$results[$i]['secoes'][] = $secao;
			$x++;

			$secao = array();

		}

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
