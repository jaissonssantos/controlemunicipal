<?php
//header("Content-Type: text/html; charset=UTF-8",true);
header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;

//return JSON
$cp = array();
//mysql_set_charset('utf8');
try {
	$stmt = $oConexao->prepare(
		'SELECT
			lv.id, lv.local, lv.coordenadas, sum(eleitorado) as qtdvotos, lv.endereco, b.nome as bairro, c.nome as cidade, c.id as idcidade
		FROM localvotacao lv, bairro b, cidade c
		WHERE lv.bairro = b.id AND lv.idmunicipio = c.id AND lv.idmunicipio = :id group by lv.local'
	);
	
	$stmt->execute(array('id' => $params->id));
	$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
	//http_response_code(200);
	//$response = $results;
	$i = 0;
	if( $results ){
		foreach( $results as $row ){
			$cp['localidade'][$i]['idlocal'] = $row["id"];
			$cp['localidade'][$i]['local'] = $row["local"];
			$cp['localidade'][$i]['coordenadas'] = $row["coordenadas"];
			$coord = explode(", ", $row["coordenadas"]);
			$cp['localidade'][$i]['lat'] = $coord[0];
			$cp['localidade'][$i]['lng'] = $coord[1];
			$cp['localidade'][$i]['coords'] = $coord[0].",".$coord[1];
			$cp['localidade'][$i]['qtdvotos'] = $row["qtdvotos"];
			$cp['localidade'][$i]['endereco'] = $row["endereco"];
			$cp['localidade'][$i]['bairro'] = $row["bairro"];
			$cp['localidade'][$i]['cidade'] = $row["cidade"];
			$cp['localidade'][$i]['idcidade'] = $row["idcidade"];

			//pega as secoes do local
			$stmt2 = $oConexao->prepare(
				'SELECT
				secao
				FROM localvotacao
				WHERE local = :local AND idmunicipio = :idmunicipio'
			);
			$stmt2->bindValue("local", $row["local"]);
			$stmt2->bindValue("idmunicipio", $row["idcidade"]);
			$stmt2->execute();
			$results2 = $stmt2->fetchAll(PDO::FETCH_ASSOC);

			if( $results2 ){
				foreach( $results2 as $row2 ){
					$secao['secao'] = $row2['secao'];
					$cp['localidade'][$i]['secoes'][] = $secao;
				}
			}

			
			//pega os advogados
			$stmt3 = $oConexao->prepare(
				'SELECT a.id, a.nome, a.celular1, a.celular2 FROM advogado a
				INNER JOIN localadvogadoitem lai ON a.id = lai.idadvogado
				INNER JOIN localadvogado la ON lai.idlocaladvogado = la.id
				WHERE la.idlocalvotacao = :idlocal'
			);
			$stmt3->execute(array('idlocal' => $row['id']));
			$results3 = $stmt3->fetchAll(PDO::FETCH_ASSOC);
			if( count($results3) > 0 ){
				foreach( $results3 as $row3 ){
					$advogado['id'] = $row3['id'];
					$advogado['nome'] = $row3['nome'];
					$advogado['celular1'] = $row3['celular1'];
					$advogado['celular2'] = $row3['celular2'];
					$cp['localidade'][$i]['advogados'][] = $advogado;
				}
			}else{
				$cp['localidade'][$i]['advogados'][] = "";	
			}

			//pega os coordenadores
			$stmt4 = $oConexao->prepare(
				'SELECT a.id, a.nome, a.celular1, a.celular2 FROM coordenador a
				INNER JOIN localcoordenadoritem lai ON a.id = lai.idcoordenador
				INNER JOIN localcoordenador la ON lai.idlocalcoordenador = la.id
				WHERE la.idlocalvotacao = :idlocal'
			);
			$stmt4->execute(array('idlocal' => $row['id']));
			$results4 = $stmt4->fetchAll(PDO::FETCH_ASSOC);
			if( count($results4) > 0 ){
				foreach( $results4 as $row4 ){
					//$cp['coordenadores'] .= "| ".$row4["nome"]." - ".$row4['celular1']." | ";
					$coord['id'] = $row4['id'];
					$coord['nome'] = $row4['nome'];
					$coord['celular1'] = $row4['celular1'];
					$coord['celular2'] = $row4['celular2'];
					$cp['localidade'][$i]['coordenadores'][] = $coord;
					//$cp['idadvogado'] .= ", ".$row2['secao'];
				}
			}else{
				$cp['localidade'][$i]['coordenadores'][] = "";	
			}

			//pega os coordenadores
			$stmt5 = $oConexao->prepare(
				'SELECT a.id, a.nome, a.celular1, a.celular2 FROM delegado a
				INNER JOIN localdelegadoitem lai ON a.id = lai.iddelegado
				INNER JOIN localdelegado la ON lai.idlocaldelegado = la.id
				WHERE la.idlocalvotacao = :idlocal'
			);
			$stmt5->execute(array('idlocal' => $row['id']));
			$results5 = $stmt5->fetchAll(PDO::FETCH_ASSOC);
			if( count($results5) > 0 ){
				foreach( $results5 as $row5 ){
					//$cp['delegados'] .= "| ".$row3["nome"]." - ".$row3['celular1']." | ";
					//$cp['idadvogado'] .= ", ".$row2['secao'];
					$coord['id'] = $row5['id'];
					$coord['nome'] = $row5['nome'];
					$coord['celular1'] = $row5['celular1'];
					$coord['celular2'] = $row5['celular2'];
					$cp['localidade'][$i]['delegados'][] = $coord;
				}
			}else{
				$cp['localidade'][$i]['delegados'][] = "";	
			}

			//pega os coordenadores
			$stmt5 = $oConexao->prepare(
				'SELECT a.id, a.nome, a.celular1, a.celular2, lai.secao FROM fiscal a
				INNER JOIN localfiscalitem lai ON a.id = lai.idfiscal
				INNER JOIN localfiscal la ON lai.idlocalfiscal = la.id
				WHERE la.local = :local'
			);
			$stmt5->execute(array('local' => $row['local']));
			$results5 = $stmt5->fetchAll(PDO::FETCH_ASSOC);
			if( count($results5) > 0 ){
				foreach( $results5 as $row5 ){
					//$cp['delegados'] .= "| ".$row3["nome"]." - ".$row3['celular1']." | ";
					//$cp['idadvogado'] .= ", ".$row2['secao'];
					$coord['id'] = $row5['id'];
					$coord['nome'] = $row5['nome'];
					$coord['secao'] = $row5['secao'];
					$coord['celular1'] = $row5['celular1'];
					$coord['celular2'] = $row5['celular2'];
					$cp['localidade'][$i]['fiscais'][] = $coord;
				}
			}else{
				$cp['localidade'][$i]['fiscais'][] = "";	
			}
		
			$i++;
		}
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


