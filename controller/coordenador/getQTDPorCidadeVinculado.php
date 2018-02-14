<?php

header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;
//return JSON
$cp = array();
try {

	if (isset($params->cidade)) {

		$stmt = $oConexao->prepare(
		'SELECT
				count(*) as qtd
			FROM localcoordenadoritem lci
			INNER JOIN localcoordenador la 
			ON la.id = lci.idlocalcoordenador
			INNER JOIN coordenador adv
			ON lci.idcoordenador = adv.id
      WHERE la.idcidade = :idcidade'
		);
		$stmt->execute(array('idcidade' => $params->cidade));
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		//echo $result["qtd"];
		//((100*$scope.qtdadvv[0].qtd)/221).fixed(2);
		$cp['qtd'] = number_format((100*$result[0]["qtd"])/442, 2, '.', '');
		if($cp['qtd'] > 0 && $cp['qtd'] <= 40)
			$cp['cor'] = "progress-bar-info";
		else if($cp['qtd'] > 40 && $cp['qtd'] <= 99.9)
			$cp['cor'] = "progress-bar-warning";
		else
			$cp['cor'] = "progress-bar-danger";
	}

	http_response_code(200);
	$response = $cp;

}catch (PDOException $e){
	http_response_code(500);
	$response->error = 'Desculpa. Tivemos um problema, tente novamente mais tarde';
}catch (Exception $e) {
	http_response_code($e->getCode());
	$response->error = $e->getMessage();
}

echo json_encode($response);
