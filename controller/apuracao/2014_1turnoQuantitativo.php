<?php

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;

try {
	$turno = isset($params->turno) ? 
						$params->turno
						: 1;

	$stmt = $oConexao->prepare(
		'SELECT
			sum(aptos)aptos,sum(faltosos)faltosos,sum(comparecidos)comparecidos,
			sum(qtdnominais)nominais,sum(qtdbrancos)brancos,sum(qtdnulos)nulos,
			sum(qtdlegenda)legenda
		FROM eleicoes2014detalhe		
		WHERE 
			cargo="GOVERNADOR"
		AND
			turno=:turno'
	);

	$stmt->bindParam('turno', $turno, PDO::PARAM_INT);
	$stmt->execute();

	$results->governadores = $stmt->fetchAll(PDO::FETCH_ASSOC);

	http_response_code(200);
	if(!$results->governadores){
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
