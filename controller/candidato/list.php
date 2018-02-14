<?php

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;
$response->count = array('ativos' => 0 ,'inativos' => 0);

$uid = $_SESSION['ang_cm_uid'];

try {

	//pega os municipios que o usuário possui permissao
	$stmt = $oConexao->prepare(
		"SELECT * FROM usuario_cidade WHERE idusuario = :uid"
	);
	$stmt->bindParam('uid', $uid);
	$stmt->execute();
	$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
	$ids = "|";
	foreach($results as $row){
		$ids .= ",".$row["idcidade"];
	}
	$ids = str_replace("|,", "", $ids);

	$offset = isset($params->offset) && $params->offset > 0
						? $params->offset
						: 0;
	$limit = isset($params->limit) && $params->limit < 200
						? $params->limit
						: 200;

	$status = isset($params->status) ?
						(int) $params->status
						: 1;

	$search = isset($params->search[0])
						? " AND
								(
									a.nome LIKE :query
								)
							"
						: null;

	//$idestabelecimento = $_SESSION['ang_plataforma_estabelecimento'];	

	$stmt = $oConexao->prepare(
		'SELECT
			a.*, c.nome as cidade, p.sigla as partido
		FROM candidato a
		LEFT JOIN partido p
		ON a.idpartido=p.id
		LEFT JOIN cidade c
		ON a.idcidade=c.id
		WHERE a.status = :status AND c.id in ('.$ids.')'. $search .'
		LIMIT :offset,:limit'
	);
	//$stmt->bindParam('idestabelecimento', $idestabelecimento);
	$stmt->bindParam('offset', $offset, PDO::PARAM_INT);
	$stmt->bindParam('limit', $limit, PDO::PARAM_INT);
	$stmt->bindParam('status', $status, PDO::PARAM_INT);

	if(isset($params->search[0])){
		$query = '%'.$params->search.'%';
		$stmt->bindParam('query', $query);
	}

	$stmt->execute();
	$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

	$count = $oConexao->prepare(
		'SELECT
			COUNT(*)
		FROM candidato a
		WHERE a.status = :status AND a.idcidade in ('.$ids . ') ' . $search
	);

	if(isset($params->search[0])){
		$query = '%'.$params->search.'%';
		$count->bindParam('query', $query);
	}

	//$count->bindParam('idestabelecimento', $idestabelecimento);
	$count->bindParam('status', $status);
	$count->execute();
	$count_results = $count->fetchColumn();

	$status = 1;
	//$count->bindParam('idestabelecimento', $idestabelecimento);
	$count->bindParam('status', $status);
	$count->execute();
	$count_ativos = $count->fetchColumn();

	$status = 2;
	//$count->bindParam('idestabelecimento', $idestabelecimento);
	$count->bindParam('status', $status);
	$count->execute();
	$count_inativos = $count->fetchColumn();

	/*$status = 3;
	$count->bindParam('idestabelecimento', $idestabelecimento);
	$count->bindParam('status', $status);
	$count->execute();
	$count_arquivados = $count->fetchColumn();*/

	http_response_code(200);
	if(!$count_results && !$count_ativos && !$count_inativos){
		throw new Exception('Nenhum resultado encontrado', 404);
	}
	$response = array(
		'results' => $results,
		'count' => array(
			'results' => $count_results,
			'ativos' => $count_ativos,
			'inativos' => $count_inativos
		)
	);

}catch (PDOException $e){
	//echo $e->getMessage();
	http_response_code(500);
	$response->error = 'Desculpa. Tivemos um problema, tente novamente mais tarde';
}catch (Exception $e) {
	http_response_code($e->getCode());
	$response->error = $e->getMessage();
}

echo json_encode($response);
