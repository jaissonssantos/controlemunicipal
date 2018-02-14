<?php 
header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;

$uid = $_SESSION['ang_cm_uid'];

$nome = $params->nome;
$cargo = $params->cargo;


//echo $cargo;

//return JSON
$cp = array();
try{
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

	if($cargo == 1){
		$stmt = $oConexao->prepare(
		'SELECT a.id, a.nome, a.celular1, lv.local, b.nome as bairro, c.nome as cidade
   		FROM advogado a, localadvogadoitem lai, localadvogado la, localvotacao lv, cidade c, bairro b
   		WHERE la.id = lai.idlocaladvogado AND lai.idadvogado = a.id AND 
   		la.idlocalvotacao = lv.id AND lv.idmunicipio = c.id AND b.id = lv.bairro AND a.nome LIKE :query AND lv.idmunicipio in ('.$ids.') group by a.nome limit 0,10'
		); 
		$query = '%'.$params->nome.'%';
		$stmt->bindParam('query', $query);

		$stmt->execute();
		$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
	}

	if($cargo == 3){
		$stmt = $oConexao->prepare(
		'SELECT a.id, a.nome, a.celular1, lv.local, b.nome as bairro, c.nome as cidade
   		FROM delegado a, localdelegadoitem lai, localdelegado la, localvotacao lv, cidade c, bairro b
   		WHERE la.id = lai.idlocaldelegado AND lai.iddelegado = a.id AND 
   		la.idlocalvotacao = lv.id AND lv.idmunicipio = c.id AND b.id = lv.bairro AND a.nome LIKE :query AND lv.idmunicipio in ('.$ids.') group by a.nome limit 0,10'
		); 
		$query = '%'.$params->nome.'%';
		$stmt->bindParam('query', $query);

		$stmt->execute();
		$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
	}

	if($cargo == 2){
		$stmt = $oConexao->prepare(
		'SELECT a.id, a.nome, a.celular1, lv.local, b.nome as bairro, c.nome as cidade
   		FROM coordenador a, localcoordenadoritem lai, localcoordenador la, localvotacao lv, cidade c, bairro b
   		WHERE la.id = lai.idlocalcoordenador AND lai.idcoordenador = a.id AND 
   		la.idlocalvotacao = lv.id AND lv.idmunicipio = c.id AND b.id = lv.bairro AND a.nome LIKE :query AND lv.idmunicipio in ('.$ids.') group by a.nome limit 0,10'
		); 
		$query = '%'.$params->nome.'%';
		$stmt->bindParam('query', $query);

		$stmt->execute();
		$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
	}

	if($cargo == 4){

		$stmt = $oConexao->prepare(
		'SELECT a.id, a.nome, a.celular1, la.local, lai.secao
   		FROM fiscal a, localfiscalitem lai, localfiscal la
   		WHERE la.id = lai.idlocalfiscal AND lai.idfiscal = a.id  AND a.nome LIKE :query AND la.idcidade in ('.$ids.') group by a.nome limit 0,10'
		); 
		$query = '%'.$nome.'%';
		$stmt->bindParam('query', $query);

		$stmt->execute();
		$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
		/*$i=0;
		foreach( $results as $row ){
			$cp['pessoa'][$i]['id'] = $row["id"];
			$cp['pessoa'][$i]['nome'] = $row["nome"];
			$cp['pessoa'][$i]['celular'] = $row["celular1"];
			$cp['pessoa'][$i]['secao'] = $row["secao"];

			/*$stmt2 = $oConexao->prepare('
				SELECT lv.local, lv.endereco, b.nome as bairro, r.nome as regional
				 FROM localfiscal lf, localfiscalitem lai, localvotacao lv, bairro b, regional r
				 WHERE lf.id = lai.idlocalfiscal AND lf.local = lv.local AND lv.bairro = b.id AND 
				 b.regional_id = r.id AND lv.local = :local
				');

			//$query = '%'.$params->nome.'%';
			$stmt2->bindParam('local', $row['local']);
			$results2 = $stmt2->fetchAll(PDO::FETCH_ASSOC);
			foreach( $results2 as $row2 ){
				$local['local'] = $row2['local'];
				$local['endereco'] = $row2['endereco'];
				$local['bairro'] = $row2['bairro'];
				$local['regional'] = $row2['regional'];
				$cp['pessoa'][$i]['locais'][] = $local;
			}*/
			//$i++;
		//}

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