<?php

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;

try {

	$cidade = isset($params->cidade) ?
						$params->cidade
						: 'RIO BRANCO';

	$stmt = $oConexao->prepare(
		'SELECT
			sum(aptos)aptos,sum(faltosos)faltosos,sum(comparecidos)comparecidos,
			sum(qtdnominais)nominais,sum(qtdbrancos)brancos,sum(qtdnulos)nulos,
			sum(qtdlegenda)legenda
		FROM eleicoes2016detalhe		
		WHERE municipio=:cidade
		AND cargo="PREFEITO"'
	);

	$stmt->bindParam('cidade', $cidade, PDO::PARAM_STR);
	$stmt->execute();

	$results->prefeitos = $stmt->fetchAll(PDO::FETCH_ASSOC);

	$stmt = $oConexao->prepare(
		'SELECT
			sum(aptos)aptos,sum(faltosos)faltosos,sum(comparecidos)comparecidos,
			sum(qtdnominais)nominais,sum(qtdbrancos)brancos,sum(qtdnulos)nulos,
			sum(qtdlegenda)legenda
		FROM eleicoes2016detalhe		
		WHERE municipio=:cidade
		AND cargo="VEREADOR"'
	);

	$stmt->bindParam('cidade', $cidade, PDO::PARAM_STR);
	$stmt->execute();

	$results->vereadores = $stmt->fetchAll(PDO::FETCH_ASSOC);

	http_response_code(200);
	if(!$results->prefeitos && !$results->vereadores){
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
