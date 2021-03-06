<?php

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;

try {

	$cidade = isset($params->cidade) ?
						$params->cidade
						: 16;

	$stmt = $oConexao->prepare(
		'SELECT
			el.numerovotavel,el.nomevotavel,el.partido
		FROM eleicoes2016apuracao el, cidade c		
		WHERE 
			c.id=:cidade
		AND 
			el.municipio=c.nome
		AND 
			cargo="VEREADOR"
		AND 
			numerovotavel NOT IN(10,11,12,13,14,15,17,18,19,20,22,23,25,27,31,33,35,36,40,43,44,45,50,55,51,65,77,90,95,96)
		GROUP BY nomevotavel
		ORDER BY nomevotavel'
	);

	$stmt->bindParam('cidade', $cidade, PDO::PARAM_STR);
	$stmt->execute();

	$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

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
