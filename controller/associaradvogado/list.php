<?php

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;
$response->count = array('ativos' => 0 ,'inativos' => 0);

try {

	$idsCity = isset($_SESSION['ang_cm_city'])
					? implode(', ', array_column($_SESSION['ang_cm_city'], 'cidade'))
					: null;

	$offset = isset($params->offset) && $params->offset > 0
						? $params->offset
						: 0;
	$limit = isset($params->limit) && $params->limit < 200
						? isset($params->search[0]) 
							? 500
							: $params->limit
						: 200;

	$status = isset($params->status) ?
						(int) $params->status
						: 1;

	$search = isset($params->search[0])
						? (!$params->searchtype) 
							? " AND
									(
										UPPER(av.nome) LIKE UPPER(:query)
									)
								"
							: " AND
									(
										UPPER(lv.local) LIKE UPPER(:query)
									)
								"
						: null;

	$searchAdvogado = (isset($params->search[0]) && !$params->searchtype) ? $search : null;
	$searchLocal = (isset($params->search[0]) && $params->searchtype) ? $search : null;


	$stmt = $oConexao->prepare(
		'SELECT
			lc.id,lc.hash,c.nome as cidade,lv.local,lv.endereco,b.nome as bairro, 
			(SELECT 
				COUNT(id) 
			FROM localadvogadoitem 
			WHERE idlocaladvogado=lc.id
			) as qtd,
			(select group_concat(
				concat(" ", av.nome )
				) as advogado
				from localadvogadoitem ags
				inner join advogado av on av.id = ags.idadvogado
				where ags.idlocaladvogado = lc.id '. $searchAdvogado .'
			) as advogados
		FROM localadvogado lc
		INNER JOIN cidade c 
		ON lc.idcidade = c.id
		INNER JOIN localvotacao lv
		ON lc.idlocalvotacao = lv.id
		INNER JOIN bairro b
		ON lv.bairro = b.id
		WHERE lc.status=:status
		AND c.id IN('. $idsCity .') '. $searchLocal .'
		GROUP BY lc.hash
		LIMIT :offset,:limit'
	);
	
	$stmt->bindParam('offset', $offset, PDO::PARAM_INT);
	$stmt->bindParam('limit', $limit, PDO::PARAM_INT);
	$stmt->bindParam('status', $status, PDO::PARAM_INT);

	if(isset($params->search[0])){
		$query = '%'.$params->search.'%';
		$stmt->bindParam('query', $query);
	}

	$stmt->execute();
	$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

	$result = array();
	$limit = 0; 
	foreach ($results as $value) {
		if($value['advogados']!=null){
			$value['advogados'] = explode(",", $value['advogados']);
			$result[] = $value;
			$limit++;
		}
	}

	$results = $result;


	$count = $oConexao->prepare(
		'SELECT
			COUNT(*),
			(select group_concat(
				concat(" ", av.nome )
				) as advogado
				from localadvogadoitem ags
				inner join advogado av on av.id = ags.idadvogado
				where ags.idlocaladvogado = lc.id '. $searchAdvogado .'
			) as advogados
		FROM localadvogado lc
		INNER JOIN cidade c 
		ON lc.idcidade = c.id
		INNER JOIN localvotacao lv
		ON lc.idlocalvotacao = lv.id
		WHERE lc.status = :status
		AND c.id IN('. $idsCity .') '. $searchLocal .'
		GROUP BY lc.hash'
	);

	if(isset($params->search[0])){
		$query = '%'.$params->search.'%';
		$count->bindParam('query', $query);
	}
	$count->bindParam('status', $status);
	$count->execute();
	$count_results = isset($params->search[0]) ? $limit : $count->rowCount();

	$status = 1;
	$count->bindParam('status', $status);
	$count->execute();
	$count_ativos = $count->rowCount();

	$status = 2;
	$count->bindParam('status', $status);
	$count->execute();
	$count_inativos = $count->rowCount();

	http_response_code(200);
	if(!$count_results && !$count_ativos && !$count_inativos){
		throw new Exception('Nenhum resultado encontrado', 404);
	}
	$response = array(
		'results' => $results,
		'count' => array(
			'results' => (!$count_results) ? 0 : $count_results ,
			'ativos' => (!$count_ativos) ? 0 : $count_ativos,
			'inativos' => (!$count_inativos) ? 0 : $count_inativos
		)
	);

}catch (PDOException $e){
	http_response_code(500);
	$response->error = 'Desculpa. Tivemos um problema, tente novamente mais tarde' . $e->getMessage();
}catch (Exception $e) {
	http_response_code($e->getCode());
	$response->error = $e->getMessage();
}

echo json_encode($response);
