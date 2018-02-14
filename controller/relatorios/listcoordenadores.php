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
			lv.id, lv.local, lv.endereco, b.nome as bairro, lv.idmunicipio
		FROM localvotacao lv, bairro b
		WHERE lv.bairro = b.id AND lv.idmunicipio = :id group by lv.local'
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
			$cp['localidade'][$i]['bairro'] = $row["bairro"];
			$cp['localidade'][$i]['endereco'] = $row["endereco"];

			//pega as secoes do local
			$stmt22 = $oConexao->prepare(
				'SELECT
				secao
				FROM localvotacao
				WHERE local = :local and idmunicipio = :idmunicipio'
			);
			//$stmt22->execute(array('local' => $row2["local"]));
			$stmt22->bindValue('local', $row["local"]);
			$stmt22->bindValue('idmunicipio', $row["idmunicipio"]);
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
			$stmt3 = $oConexao->prepare(
				'SELECT a.id, a.nome, a.celular1, a.celular2 FROM coordenador a
				INNER JOIN localcoordenadoritem lai ON a.id = lai.idcoordenador
				INNER JOIN localcoordenador la ON lai.idlocalcoordenador = la.id
				WHERE la.idlocalvotacao = :idlocal'
			);
			$stmt3->execute(array('idlocal' => $row['id']));
			$results3 = $stmt3->fetchAll(PDO::FETCH_ASSOC);
			if( count($results3) > 0 ){
				foreach( $results3 as $row3 ){
					$coordenador['id'] = $row3['id'];
					$coordenador['nome'] = $row3['nome'];
					$coordenador['celular1'] = $row3['celular1'];
					$coordenador['celular2'] = $row3['celular2'];
					$cp['localidade'][$i]['coordenadores'][] = $coordenador;
				}
			}else{
				$cp['localidade'][$i]['coordenadores'][] = "";	
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


