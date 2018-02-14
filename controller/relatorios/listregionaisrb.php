<?php
//header("Content-Type: text/html; charset=UTF-8",true);
header('Content-type: application/json');
$oConexao = Conexao::getInstance();
$params = json_decode(file_get_contents('php://input'));
$response = new stdClass;

//return JSON
$cp = array();


$cidade = 16;
$cargo = $params->cargo;
$regional = $params->regional;

$x = " ";

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
			lv.id, lv.local, lv.endereco, b.nome as bairro, r.nome as regional, lv.idmunicipio
			FROM localvotacao lv, bairro b, regional r
			WHERE lv.bairro = b.id AND b.regional_id = r.id AND b.regional_id = :id AND lv.idmunicipio = 16 group by lv.local'
			);
	
			$stmt2->execute(array('id' => $row["id"]));
			$results2 = $stmt2->fetchAll(PDO::FETCH_ASSOC);
			$i = 0;
			foreach( $results2 as $row2 ){
				$cp['localidade'][$i]['idlocal'] = $row2["id"];
				$cp['localidade'][$i]['local'] = $row2["local"];
				$cp['localidade'][$i]['endereco'] = $row2["endereco"];
				$cp['localidade'][$i]['bairro'] = $row2["bairro"];
				$cp['localidade'][$i]['regional'] = $row2["regional"];
				//faz a verificação dos cargos e pega os respectivos

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
						$secoes2 .= ",(".$row22["secao"].")";
						//$secao['secao'] = $row2['secao'];
						
					}
					$secoes2 = str_replace("|,", "", $secoes2);
					$cp['localidade'][$i]['secoes'] = $secoes2;
				}


				//pega os advogados
				if($cargo == 1){
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
				}
				//pega os coordenadores
				if($cargo == 2){
					//pega os coordenadores
					$stmt4 = $oConexao->prepare(
						'SELECT a.id, a.nome, a.celular1, a.celular2 FROM coordenador a
						INNER JOIN localcoordenadoritem lai ON a.id = lai.idcoordenador
						INNER JOIN localcoordenador la ON lai.idlocalcoordenador = la.id
						WHERE la.idlocalvotacao = :idlocal'
					);
					$stmt4->execute(array('idlocal' => $row2['id']));
					$results4 = $stmt4->fetchAll(PDO::FETCH_ASSOC);
					if( count($results4) > 0 ){
						foreach( $results4 as $row4 ){
							$coordenador['id'] = $row4['id'];
							$coordenador['nome'] = $row4['nome'];
							$coordenador['celular1'] = $row4['celular1'];
							$coordenador['celular2'] = $row4['celular2'];
							$cp['localidade'][$i]['coordenadores'][] = $coordenador;
						}
					}else{
						$cp['localidade'][$i]['coordenadores'][] = "";	
					}
				}
				//pega os delegados
				if($cargo == 3){
					//pega os delegados
					$stmt5 = $oConexao->prepare(
						'SELECT a.id, a.nome, a.celular1, a.celular2 FROM delegado a
						INNER JOIN localdelegadoitem lai ON a.id = lai.iddelegado
						INNER JOIN localdelegado la ON lai.idlocaldelegado = la.id
						WHERE la.idlocalvotacao = :idlocal'
					);
					$stmt5->execute(array('idlocal' => $row2['id']));
					$results5 = $stmt5->fetchAll(PDO::FETCH_ASSOC);
					if( count($results5) > 0 ){
						foreach( $results5 as $row5 ){
							$delegado['id'] = $row5['id'];
							$delegado['nome'] = $row5['nome'];
							$delegado['celular1'] = $row5['celular1'];
							$delegado['celular2'] = $row5['celular2'];
							$cp['localidade'][$i]['delegados'][] = $delegado;
						}
					}else{
						$cp['localidade'][$i]['delegados'][] = "";	
					}
				}
				//pega os fiscais
				if($cargo == 4){
					//pega os advogados
					$stmt6 = $oConexao->prepare(
						'SELECT a.id, a.nome, a.celular1, a.celular2, lai.secao FROM fiscal a
						INNER JOIN localfiscalitem lai ON a.id = lai.idfiscal
						INNER JOIN localfiscal la ON lai.idlocalfiscal = la.id
						WHERE la.local= :idlocal order by lai.secao'
					);
					$stmt6->execute(array('idlocal' => $row2['local']));
					$results6 = $stmt6->fetchAll(PDO::FETCH_ASSOC);
					if( count($results6) > 0 ){
						foreach( $results6 as $row6 ){
							$fiscal['id'] = $row6['id'];
							$fiscal['nome'] = $row6['nome'];
							$fiscal['secao'] = $row6['secao'];
							$fiscal['celular1'] = $row6['celular1'];
							$fiscal['celular2'] = $row6['celular2'];
							$cp['localidade'][$i]['fiscais'][] = $fiscal;
						}
					}else{
						$cp['localidade'][$i]['fiscais'][] = "";	
					}
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


