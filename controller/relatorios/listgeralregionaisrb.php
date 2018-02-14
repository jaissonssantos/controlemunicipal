<?php
//header("Content-Type: text/html; charset=UTF-8",true);
header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;

//return JSON
$cp = array();


$cidade = 16;
$regional = $params->regional;

$x = " ";


$qtdlocais = 0;
$qtdsecoes = 0;
$qtdeleitores = 0;
$qtdfiscais = 0;
$qtdadvogados = 0;
$qtdcoordenadores = 0;
$qtddelegados = 0;

//mysql_set_charset('utf8');

try {
	
	if($regional == 1){ $x = " WHERE id = 1 "; }
	if($regional == 2){ $x = " WHERE id = 2 "; }
	if($regional == 3){ $x = " WHERE id = 3 "; }
	if($regional == 4){ $x = " WHERE id = 4 "; }
	if($regional == 5){ $x = " WHERE id = 5 "; }
	if($regional == 6){ $x = " WHERE id = 6 "; }
	if($regional == 7){ $x = " WHERE id = 7 "; }
	if($regional == 8){ $x = " WHERE id = 8 "; }
	if($regional == 9){ $x = " WHERE id = 9 "; }
	if($regional == 10){ $x = " WHERE id = 10 "; }
	if($regional == 11){ $x = " WHERE id = 11 "; }

	//pega as regionais
		$stmt = $oConexao->prepare(
		'SELECT
			*
		FROM regional'
		.$x.
		'GROUP BY nome'
		);
		$stmt->execute();
		$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
		foreach( $results as $row ){
			//pega os locais da regional especifica
			$stmt2 = $oConexao->prepare(
			'SELECT
			lv.id, lv.local, lv.endereco, b.nome as bairro, r.nome as regional, lv.idmunicipio, sum(lv.eleitorado) as total
			FROM localvotacao lv, bairro b, regional r
			WHERE lv.bairro = b.id AND b.regional_id = r.id AND b.regional_id = :id AND 
			lv.idmunicipio = 16 group by lv.local'
			);
	
			$stmt2->execute(array('id' => $row["id"]));
			$results2 = $stmt2->fetchAll(PDO::FETCH_ASSOC);
			$i = 0;
			foreach( $results2 as $row2 ){
				//soma qtdeleitores
				$qtdeleitores += $row2["total"];

				$cp['localidade'][$i]['idlocal'] = $row2["id"];
				$cp['localidade'][$i]['local'] = $row2["local"];
				$cp['localidade'][$i]['endereco'] = $row2["endereco"];
				$cp['localidade'][$i]['bairro'] = $row2["bairro"];
				$cp['localidade'][$i]['regional'] = $row2["regional"];
				//faz a verificação dos cargos e pega os respectivos

				//conta os locais
				$qtdlocais++;

				//pega as secoes do local
				$stmt22 = $oConexao->prepare(
				'SELECT
				secao
				FROM localvotacao
				WHERE local = :local and idmunicipio = :idmunicipio'
				);
				//$stmt22->execute(array('local' => $row2["local"]));
				$stmt22->bindValue('local', $row2["local"]);
				$stmt22->bindValue('idmunicipio', $row2["idmunicipio"]);
				$stmt22->execute();
				$results22 = $stmt22->fetchAll(PDO::FETCH_ASSOC);
				$secoes2 = "|";
				if( $results22 ){
					foreach( $results22 as $row22 ){
						//conta a qtd de secoes
						$qtdsecoes++;
						$secoes2 .= ",(".$row22["secao"].")";
						//$secao['secao'] = $row2['secao'];
					}
					$secoes2 = str_replace("|,", "", $secoes2);
					$cp['localidade'][$i]['secoes'] = $secoes2;
				}

				//pega os advogados
				$stmt3 = $oConexao->prepare(
					'SELECT a.id, a.nome, a.celular1, a.celular2, a.oab FROM advogado a
					INNER JOIN localadvogadoitem lai ON a.id = lai.idadvogado
					INNER JOIN localadvogado la ON lai.idlocaladvogado = la.id
					WHERE la.idlocalvotacao = :idlocal'
				);
				$stmt3->execute(array('idlocal' => $row2['id']));
				$results3 = $stmt3->fetchAll(PDO::FETCH_ASSOC);
				if( count($results3) > 0 ){
					foreach( $results3 as $row3 ){
						//conta os advogados
						$qtdadvogados++;

						$advogado['id'] = $row3['id'];
						$advogado['nome'] = $row3['nome'];
						$advogado['oab'] = $row3['oab'];
						$advogado['celular1'] = $row3['celular1'];
						$advogado['celular2'] = $row3['celular2'];
						$cp['localidade'][$i]['advogados'][] = $advogado;
					}
				}else{
					$cp['localidade'][$i]['advogados'][] = "";	
				}

				//pega os advogados
				$stmt7 = $oConexao->prepare(
					'SELECT a.id, a.nome, a.celular1, a.celular2, lai.secao FROM fiscal a
					INNER JOIN localfiscalitem lai ON a.id = lai.idfiscal
					INNER JOIN localfiscal la ON lai.idlocalfiscal = la.id
					WHERE la.local = :idlocal order by lai.secao'
				);
				$stmt7->bindParam('idlocal', $row2["local"]);
				$stmt7->execute();
				$results7 = $stmt7->fetchAll(PDO::FETCH_ASSOC);
				if( count($results7) > 0 ){
					foreach( $results7 as $row7 ){
						//conta fiscais
						$qtdfiscais++;

						$fiscal['id'] = $row7['id'];
						$fiscal['nome'] = $row7['nome'];
						$fiscal['secao'] = $row7['secao'];
						$fiscal['celular1'] = $row7['celular1'];
						$fiscal['celular2'] = $row7['celular2'];
						$cp['localidade'][$i]['fiscais'][] = $fiscal;
					}
				}else{
					$cp['localidade'][$i]['fiscais'][] = "";	
				}

				//pega os coordenadores
				$stmt5 = $oConexao->prepare(
					'SELECT a.id, a.nome, a.celular1, a.celular2 FROM coordenador a
					INNER JOIN localcoordenadoritem lai ON a.id = lai.idcoordenador
					INNER JOIN localcoordenador la ON lai.idlocalcoordenador = la.id
					WHERE la.idlocalvotacao = :idlocal'// and la.idcidade = :municipio'
				);
				$stmt5->bindParam('idlocal', $row2['id']);
				//$stmt5->bindParam('municipio', $row2['idmunicipio']);
				$stmt5->execute();
				$results5 = $stmt5->fetchAll(PDO::FETCH_ASSOC);
				if( count($results5) > 0 ){
					foreach( $results5 as $row5 ){
						//conta coordenadores
						$qtdcoordenadores++;
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
				$i++;
				
			}

			//pega os coordenadores
				$stmt6 = $oConexao->prepare(
					'select f.nome, f.celular1, f.celular2 from delegado f, localdelegadoitem lai, localdelegado la, localvotacao lv, bairro b where
			lai.idlocaldelegado = la.id AND
			lai.iddelegado = f.id AND 
			la.idlocalvotacao = lv.id AND 
			lv.bairro = b.id AND 
			b.regional_id = :id
			group by lai.iddelegado'
				);
				$stmt6->execute(array('id' => $row['id']));
				$results6 = $stmt6->fetchAll(PDO::FETCH_ASSOC);
				if( count($results6) > 0 ){
					foreach( $results6 as $row6 ){
						//conta delegados
						$qtddelegados++;
						//$cp['delegados'] .= "| ".$row3["nome"]." - ".$row3['celular1']." | ";
						//$cp['idadvogado'] .= ", ".$row2['secao'];
						$coord['id'] = $row6['id'];
						$coord['nome'] = $row6['nome'];
						$coord['celular1'] = $row6['celular1'];
						$coord['celular2'] = $row6['celular2'];
						$cp['localidade'][0]['delegados'][] = $coord;
					}
				}else{
					$cp['localidade'][0]['delegados'][] = "";	
				}

			//pega a qtd de advogados da regional
			$stmt8 = $oConexao->prepare(
			'select count(f.nome) as qtd from advogado f, localadvogadoitem lai, localadvogado la, localvotacao lv, bairro b where
			lai.idlocaladvogado = la.id AND
			lai.idadvogado = f.id AND 
			la.idlocalvotacao = lv.id AND 
			lv.bairro = b.id AND 
			b.regional_id = :id 
			group by lai.idadvogado'
			);
			$stmt8->execute(array('id' => $row['id']));
			//$results8 = $stmt8->fetchAll(PDO::FETCH_ASSOC);
			//echo $results8[0]["qtd"];
			$cp['localidade'][0]['qtdadvogados'] = $stmt8->rowCount();

			//pega a qtd de coordenadores da regional
			$stmt9 = $oConexao->prepare(
			'select count(f.nome) as qtd from coordenador f, localcoordenadoritem lai, localcoordenador la, localvotacao lv, bairro b where
			lai.idlocalcoordenador = la.id AND
			lai.idcoordenador = f.id AND 
			la.idlocalvotacao = lv.id AND 
			lv.bairro = b.id AND 
			b.regional_id = :id 
			group by lai.idcoordenador'
			);
			$stmt9->execute(array('id' => $row['id']));
			//$results9 = $stmt9->fetchAll(PDO::FETCH_ASSOC);
			$cp['localidade'][0]['qtdcoordenadores'] = $stmt9->rowCount();

			//pega a qtd de delegados da regional
			$stmt10 = $oConexao->prepare(
			'select count(f.nome) as qtd from delegado f, localdelegadoitem lai, localdelegado la, localvotacao lv, bairro b where
			lai.idlocaldelegado = la.id AND
			lai.iddelegado = f.id AND 
			la.idlocalvotacao = lv.id AND 
			lv.bairro = b.id AND 
			b.regional_id = :id 
			group by lai.iddelegado'
			);
			$stmt10->execute(array('id' => $row['id']));
		///	$results10 = $stmt10->fetchAll(PDO::FETCH_ASSOC);
			//echo $stmt10->rowCount();
			$cp['localidade'][0]['qtddelegados'] = $stmt10->rowCount();	
		}

	$cp['localidade'][0]['qtdlocais'] = $qtdlocais;
	$cp['localidade'][0]['qtdsecoes'] = $qtdsecoes;
	$cp['localidade'][0]['qtdeleitores'] = $qtdeleitores;
	$cp['localidade'][0]['qtdfiscais'] = $qtdfiscais;
	//$cp['localidade'][0]['qtdadvogados'] = $qtdadvogados;
	//$cp['localidade'][0]['qtdcoordenadores'] = $qtdcoordenadores;
	//$cp['localidade'][0]['qtddelegados'] = $qtddelegados;

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


