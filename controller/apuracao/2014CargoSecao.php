<?php

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;

try {

	$cidade = isset($params->cidade) ? 
						$params->cidade
						: null;
	$zona = isset($params->zona) ? 
						$params->zona
						: null;
	$secs = isset($params->secao) ? 
						$params->secao
                        : null;
    $turno = isset($params->turno) ? 
						$params->turno
                        : 1;
    $cargo = isset($params->cargo) ? 
						$params->cargo
						: null;

	$stmt = $oConexao->prepare(
		'SELECT lv.id,lv.local,lv.endereco,b.nome as bairro
		FROM localvotacao2014 lv
		LEFT JOIN bairro b ON(lv.bairro=b.nome)
		WHERE 
			lv.idmunicipio=:cidade
		AND
			lv.zona=:zona
		AND
			lv.secao IN(:secao)
		GROUP BY
			lv.local
		'
	);

	$stmt->bindParam('cidade', $cidade, PDO::PARAM_STR);
	$stmt->bindParam('zona', $zona, PDO::PARAM_STR);
	$stmt->bindParam('secao', $secs, PDO::PARAM_STR);

	$stmt->execute();
	$results['localizacao'] = $stmt->fetchObject();

	$stmt = $oConexao->prepare(
		'SELECT secao,zona
		FROM localvotacao2014 lv
		WHERE 
			lv.idmunicipio=:cidade
		AND 
			lv.zona=:zona
		AND
			lv.secao IN(:secao)
		'
	);

	$stmt->bindParam('cidade', $cidade, PDO::PARAM_STR);
	$stmt->bindParam('zona', $zona, PDO::PARAM_STR);
	$stmt->bindParam('secao', $secs, PDO::PARAM_STR);
	
	$stmt->execute();
	$secoes = $stmt->fetchAll(PDO::FETCH_ASSOC);

	$i=0;
	foreach ($secoes as $sc) {

		$secao['secao'] = $sc['secao'];
		$secao['zona'] = $sc['zona'];
		$sec = explode(", ", $sc['secao']);

		for($z=0; $z<count($sec);$z++){

			$stmt_secao = $oConexao->prepare(
				'SELECT el.nomevotavel,sum(el.qtdvotos) votos
				FROM eleicoes2014apuracao el, cidade c
				WHERE 
					c.nome= el.municipio
				AND
					c.id=:cidade
				AND 
					el.cargo=:cargo
				AND
					el.secao LIKE :secao
				AND
					el.zona=:zona
				AND 
					el.numerovotavel NOT IN(95,96)
                AND
                    el.turno=:turno
				GROUP BY nomevotavel
				'
			);
            
            $stmt_secao->bindParam('cidade', $cidade, PDO::PARAM_STR);
            $stmt_secao->bindParam('cargo', $cargo, PDO::PARAM_STR);
			if($sec[$z]!=null){
				$query = '%'.$sec[$z].'%';
				$stmt_secao->bindParam('secao', $query, PDO::PARAM_STR);
			}
			$stmt_secao->bindParam('zona', $sc['zona'], PDO::PARAM_STR);
            $stmt_secao->bindParam('turno', $turno, PDO::PARAM_INT);
			$stmt_secao->execute();
			
			$results_secao = $stmt_secao->fetchAll(PDO::FETCH_ASSOC);
			$x=0;
			foreach ($results_secao as $s) {
				if($s['votos']!=null){
					$secao['candidato'][$i]['nome'][$x] = $s['nomevotavel'];
					$secao['candidato'][$i]['votos'][$x] = $s['votos'];
					$x++;
				}
			}

		}

		$results['secoes'][] = $secao;

		$secao = array();

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
