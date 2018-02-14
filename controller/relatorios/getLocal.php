<?php
//header("Content-Type: text/html; charset=UTF-8",true);
header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;

//return JSON
$cp = array();
$nome = $params->nome;
$municipio = $params->municipio;
try{

	//pega os locais da regional especifica
	$stmt = $oConexao->prepare(
	'SELECT
	lv.id, lv.local, lv.endereco, b.nome as bairro, lv.idmunicipio, r.nome as regional
	FROM localvotacao lv, bairro b, regional r
	WHERE lv.bairro = b.id AND b.regional_id = r.id AND lv.idmunicipio = :municipio AND lv.local = :local group by lv.local order by lv.local'
	);
	$stmt->bindParam('municipio', $municipio);
	$stmt->bindParam('local', $nome);
	$stmt->execute();
	$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
	$i=0;
	foreach( $results as $row ){
		$cp['localidade'][$i]['idlocal'] = $row["id"];
		$cp['localidade'][$i]['local'] = $row["local"];
		$cp['localidade'][$i]['endereco'] = $row["endereco"];
		$cp['localidade'][$i]['bairro'] = $row["bairro"];
		$cp['localidade'][$i]['regional'] = $row["regional"];
		//pega os advogados
		$stmt2 = $oConexao->prepare(
			'SELECT a.id, a.nome, a.celular1, a.celular2, lai.secao FROM fiscal a
			INNER JOIN localfiscalitem lai ON a.id = lai.idfiscal
			INNER JOIN localfiscal la ON lai.idlocalfiscal = la.id
			WHERE la.local = :idlocal order by lai.secao'
		);
		$stmt2->bindParam('idlocal', $row["local"]);
		$stmt2->execute();
		$results2 = $stmt2->fetchAll(PDO::FETCH_ASSOC);
		if( count($results2) > 0 ){
			foreach( $results2 as $row2 ){
				$fiscal['id'] = $row2['id'];
				$fiscal['nome'] = $row2['nome'];
				$fiscal['secao'] = $row2['secao'];
				$fiscal['celular1'] = $row2['celular1'];
				$fiscal['celular2'] = $row2['celular2'];
				$cp['localidade'][$i]['fiscais'][] = $fiscal;
			}
		}else{
			$cp['localidade'][$i]['fiscais'][] = "";	
		}

		//pega as secoes do local
		$stmt3 = $oConexao->prepare(
			'SELECT
			secao
			FROM localvotacao
			WHERE local = :local AND idmunicipio = :municipio'
		);
		$stmt3->bindParam('local', $row["local"]);
		$stmt3->bindParam('municipio', $municipio);
		$stmt3->execute();
		$results3 = $stmt3->fetchAll(PDO::FETCH_ASSOC);
		foreach( $results3 as $row3 ){
			$secao['secao'] = $row3['secao'];
			$cp['localidade'][$i]['secoes'][] = $secao;
		}

		//pega os advogados
			$stmt4 = $oConexao->prepare(
				'SELECT a.id, a.nome, a.celular1, a.celular2, a.oab FROM advogado a
				INNER JOIN localadvogadoitem lai ON a.id = lai.idadvogado
				INNER JOIN localadvogado la ON lai.idlocaladvogado = la.id
				WHERE la.idlocalvotacao = :idlocal and la.idcidade = :municipio'
			);
			$stmt4->bindParam('idlocal', $row['id']);
			$stmt4->bindParam('municipio', $municipio);
			$stmt4->execute();
			$results4 = $stmt4->fetchAll(PDO::FETCH_ASSOC);
			if( count($results4) > 0 ){
				foreach( $results4 as $row4 ){
					$advogado['id'] = $row4['id'];
					$advogado['nome'] = $row4['nome'];
					$advogado['oab'] = $row4['oab'];
					$advogado['celular1'] = $row4['celular1'];
					$advogado['celular2'] = $row4['celular2'];
					$cp['localidade'][$i]['advogados'][] = $advogado;
				}
			}else{
				$cp['localidade'][$i]['advogados'][] = "";	
			}

			//pega os coordenadores
			$stmt5 = $oConexao->prepare(
				'SELECT a.id, a.nome, a.celular1, a.celular2 FROM coordenador a
				INNER JOIN localcoordenadoritem lai ON a.id = lai.idcoordenador
				INNER JOIN localcoordenador la ON lai.idlocalcoordenador = la.id
				WHERE la.idlocalvotacao = :idlocal and la.idcidade = :municipio'
			);
			$stmt5->bindParam('idlocal', $row['id']);
			$stmt5->bindParam('municipio', $municipio);
			$stmt5->execute();
			$results5 = $stmt5->fetchAll(PDO::FETCH_ASSOC);
			if( count($results5) > 0 ){
				foreach( $results5 as $row5 ){
					//$cp['coordenadores'] .= "| ".$row4["nome"]." - ".$row4['celular1']." | ";
					$coord['id'] = $row5['id'];
					$coord['nome'] = $row5['nome'];
					$coord['celular1'] = $row5['celular1'];
					$coord['celular2'] = $row5['celular2'];
					$cp['localidade'][$i]['coordenadores'][] = $coord;
					//$cp['idadvogado'] .= ", ".$row2['secao'];
				}
			}else{
				$cp['localidade'][$i]['coordenadores'][] = "";	
			}

			//pega os coordenadores
			$stmt6 = $oConexao->prepare(
				'SELECT a.id, a.nome, a.celular1, a.celular2 FROM delegado a
				INNER JOIN localdelegadoitem lai ON a.id = lai.iddelegado
				INNER JOIN localdelegado la ON lai.idlocaldelegado = la.id
				WHERE la.idlocalvotacao = :idlocal'
			);
			$stmt6->execute(array('idlocal' => $row['id']));
			$results6 = $stmt6->fetchAll(PDO::FETCH_ASSOC);
			if( count($results6) > 0 ){
				foreach( $results6 as $row6 ){
					//$cp['delegados'] .= "| ".$row3["nome"]." - ".$row3['celular1']." | ";
					//$cp['idadvogado'] .= ", ".$row2['secao'];
					$coord['id'] = $row6['id'];
					$coord['nome'] = $row6['nome'];
					$coord['celular1'] = $row6['celular1'];
					$coord['celular2'] = $row6['celular2'];
					$cp['localidade'][$i]['delegados'][] = $coord;
				}
			}else{
				$cp['localidade'][$i]['delegados'][] = "";	
			}
			

		$i++;
	}

	echo json_encode($cp);

}catch (PDOException $e){
	http_response_code(500);
	$response->error = 'Desculpa. Tivemos um problema, tente novamente mais tarde';
	echo json_encode($response);
}catch (Exception $e) {
	http_response_code($e->getCode());
	$response->error = $e->getMessage();
	echo json_encode($response);
}