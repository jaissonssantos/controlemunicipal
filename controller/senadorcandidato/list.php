<?php

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;

try {

	$cidade = isset($params->cidade) ?
						$params->cidade
						: 16;
	$turno = isset($params->turno) ? 
						$params->turno
						: 1;
	$tabela = isset($params->ano) ? 
						'eleicoes'. $params->ano .'apuracao'
						: 'eleicoes2014apuracao';

	$stmt = $oConexao->prepare(
		'SELECT
			el.numerovotavel,el.nomevotavel,el.partido
		FROM '. $tabela .' el, cidade c		
		WHERE 
			c.id=:cidade
		AND 
			el.municipio=c.nome
		AND 
			cargo="SENADOR"
		AND 
			numerovotavel NOT IN(95,96)
		AND
			turno=:turno
		GROUP BY nomevotavel
		ORDER BY numerovotavel'
	);

	$stmt->bindParam('cidade', $cidade, PDO::PARAM_STR);
	$stmt->bindParam('turno', $turno, PDO::PARAM_INT);
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
