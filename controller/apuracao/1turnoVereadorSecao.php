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

	$stmt = $oConexao->prepare(
		'SELECT lv.id,lv.local,lv.endereco,b.nome as bairro
		FROM localvotacao lv
		LEFT JOIN bairro b ON(lv.bairro=b.id)
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
		FROM localvotacao lv
		WHERE 
			lv.idmunicipio=:cidade
		AND 
			lv.zona=:zona
		AND
			lv.secao=:secao
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
				FROM eleicoes2016apuracao el, cidade c
				WHERE 
					c.nome= el.municipio
				AND
					c.id=:cidade
				AND 
					el.cargo="VEREADOR"
				AND
					el.secao LIKE :secao
				AND
					el.zona=:zona
				AND 
					numerovotavel NOT IN(10,11,12,13,14,15,17,18,19,20,22,23,25,27,31,33,35,36,40,43,44,45,50,55,51,65,77,90,95,96)
				GROUP BY nomevotavel
				'
			);
			
			if($sec[$z]!=null){
				$query = '%'.$sec[$z].'%';
				$stmt_secao->bindParam('secao', $query, PDO::PARAM_STR);
			}
			$stmt_secao->bindParam('zona', $sc['zona'], PDO::PARAM_STR);
			$stmt_secao->bindParam('cidade', $cidade, PDO::PARAM_STR);
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
