<?php 
header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;

$uid = $_SESSION['ang_cm_uid'];

$id = $params->id;
$cargo = $params->cargo;

//echo $cargo;

//return JSON
$cp = array();
try{

	if($cargo == 1){
		$stmt = $oConexao->prepare(
		'SELECT a.id, a.nome, a.celular1, lv.local, b.nome as bairro, c.id as idcidade, c.nome as cidade, r.nome as regional, lv.endereco
   		FROM advogado a
   		INNER JOIN localadvogadoitem lai ON lai.idadvogado = a.id
   		INNER JOIN localadvogado la ON la.id = lai.idlocaladvogado
   		INNER JOIN localvotacao lv ON la.idlocalvotacao = lv.id
   		INNER JOIN cidade c ON lv.idmunicipio = c.id
   		INNER JOIN bairro b ON b.id = lv.bairro
   		LEFT JOIN regional r ON b.regional_id = r.id
   		WHERE  lai.idadvogado = a.id AND a.id = :query group by lv.local'
		); 
		//$query = '%'.$params->nome.'%';
		$stmt->bindParam('query', $id);

		$stmt->execute();
		$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
	}

	if($cargo == 3){
		$stmt = $oConexao->prepare(
		'SELECT a.nome, a.celular1, lv.local, b.nome as bairro, c.id as idcidade, c.nome as cidade, r.nome as regional, lv.endereco
   		FROM delegado a
   		INNER JOIN localdelegadoitem lai ON lai.iddelegado = a.id
   		INNER JOIN localdelegado la ON la.id = lai.idlocaldelegado
   		INNER JOIN localvotacao lv ON la.idlocalvotacao = lv.id
   		INNER JOIN cidade c ON lv.idmunicipio = c.id
   		INNER JOIN bairro b ON b.id = lv.bairro
   		LEFT JOIN regional r ON b.regional_id = r.id
   		WHERE  lai.iddelegado = a.id AND a.id = :query group by lv.local'
		); 
		//$query = '%'.$params->nome.'%';
		$stmt->bindParam('query', $id);

		$stmt->execute();
		$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
	}

	if($cargo == 2){
		$stmt = $oConexao->prepare(
		'SELECT a.nome, a.celular1, lv.local, b.nome as bairro, c.id as idcidade, c.nome as cidade, r.nome as regional, lv.endereco
   		FROM coordenador a
   		INNER JOIN localcoordenadoritem lai ON lai.idcoordenador = a.id
   		INNER JOIN localcoordenador la ON la.id = lai.idlocalcoordenador
   		INNER JOIN localvotacao lv ON la.idlocalvotacao = lv.id
   		INNER JOIN cidade c ON lv.idmunicipio = c.id
   		INNER JOIN bairro b ON b.id = lv.bairro
   		LEFT JOIN regional r ON b.regional_id = r.id
   		WHERE  lai.idcoordenador = a.id AND a.id = :query group by lv.local'
		); 
		//$query = '%'.$params->nome.'%';
		$stmt->bindParam('query', $id);

		$stmt->execute();
		$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
	}

	if($cargo == 4){

		$stmt = $oConexao->prepare('
			SELECT a.nome, a.celular1, lv.local, lai.secao, b.nome as bairro, c.id as idcidade, c.nome as cidade, r.nome as regional, lv.endereco
   		FROM fiscal a
   		INNER JOIN localfiscalitem lai ON lai.idfiscal = a.id
   		INNER JOIN localfiscal la ON la.id = lai.idlocalfiscal
   		INNER JOIN localvotacao lv ON la.local = lv.local
   		INNER JOIN cidade c ON lv.idmunicipio = c.id
   		INNER JOIN bairro b ON b.id = lv.bairro
   		LEFT JOIN regional r ON b.regional_id = r.id
   		WHERE  lai.idfiscal = a.id AND a.id = :query group by lv.local
				');

			//$query = '%'.$params->nome.'%';
			$stmt->bindParam('query', $id);
			$stmt->execute();
			$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

	}
	echo json_encode($results);

}catch (PDOException $e){
	http_response_code(500);
	$response->error = 'Desculpa. Tivemos um problema, tente novamente mais tarde';
	echo json_encode($response);
}catch (Exception $e) {
	http_response_code($e->getCode());
	$response->error = $e->getMessage();
	echo json_encode($response);
}



?>