<?php

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;

try {

    $cargo = isset($params->cargo) ? 
						$params->cargo
						: null;
	$turno = isset($params->turno) ? 
						$params->turno
						: 1;

	$stmt = $oConexao->prepare(
		'SELECT partido
        FROM eleicoes2014apuracao
        WHERE 
            cargo=:cargo
        AND
			turno=:turno
		AND 
            numerovotavel NOT IN(95,96)
        GROUP BY partido
        ORDER BY partido'
	);
	
	$stmt->bindParam('cargo', $cargo, PDO::PARAM_STR);
	$stmt->bindParam('turno', $turno, PDO::PARAM_INT);
	$stmt->execute();
	$results = $stmt->fetchAll(PDO::FETCH_ASSOC);


	http_response_code(200);
	$response = $results;

}catch (PDOException $e){
	//echo $e->getMessage();
	http_response_code(500);
	$response->error = 'Desculpa. Tivemos um problema, tente novamente mais tarde';
}catch (Exception $e) {
	http_response_code($e->getCode());
	$response->error = $e->getMessage();
}

echo json_encode($response);
