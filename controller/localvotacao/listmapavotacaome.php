<?php
ini_set('display_errors',1);
ini_set('display_startup_erros',1);
error_reporting(E_ALL);

ini_set("max_execution_time", 300);

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
		WHERE lv.bairro = b.id AND lv.idmunicipio = c.id AND lv.idmunicipio = 16 group by lv.local'
	);
	
	$stmt->execute();
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
				secao, zona
				FROM localvotacao
				WHERE local = :local AND idmunicipio = :idmunicipio'
			);
			$stmt2->bindValue("local", $row["local"]);
			$stmt2->bindValue("idmunicipio", $row["idcidade"]);
			$stmt2->execute();
			$results2 = $stmt2->fetchAll(PDO::FETCH_ASSOC);

			if( $results2 ){
				$votosMG = 0;
				$votosEG = 0;
				//print_r($results2);
				foreach( $results2 as $row2 ){
					$secao['secao'] = $row2['secao'];
					$sec = explode(", ", $row2['secao']);

					for($z = 0; $z < count($sec); $z++ ){

						//pega os votos da secao do marcus alexandre
						$stmtM = $oConexao->prepare("SELECT sum(qtdvotos) as votos
							FROM apuracao1turno	WHERE municipio = 'RIO BRANCO' AND cargo = 'PREFEITO' 
							AND partido = 'PT' 
							AND numerovotavel = 13 
							AND secao in (:secao) 
							AND zona = :zona");
						$stmtM->bindValue("secao", $sec[$z]);
						$stmtM->bindValue("zona", $row2["zona"]);
						$stmtM->execute();
						$resultsM = $stmtM->fetchAll(PDO::FETCH_ASSOC);
						foreach( $resultsM as $rowM ){
							$secao['votosM'] = $rowM['votos'];
							$votosMG += $rowM['votos'];
						}

						//pega os votos da secao da eliane
						$stmtE = $oConexao->prepare("SELECT sum(qtdvotos) as votos
							FROM apuracao1turno	WHERE municipio = 'RIO BRANCO' AND cargo = 'PREFEITO' 
							AND partido in ('PMDB', 'PR', 'REDE') 
							AND numerovotavel in (15, 22, 18) 
							AND secao in (:secao) 
							AND zona = :zona");
						$stmtE->bindValue("secao", $sec[$z]);
						$stmtE->bindValue("zona", $row2["zona"]);
						$stmtE->execute();
						$resultsE = $stmtE->fetchAll(PDO::FETCH_ASSOC);
						foreach( $resultsE as $rowE ){
							$secao['votosE'] = $rowE['votos'];
							$votosEG += $rowE['votos'];
						}
					}//fimdofor
					
					$cp['localidade'][$i]['secoes'][] = $secao;
				}
				if($votosMG > $votosEG){
					$cp['localidade'][$i]['icon'][] = "ic_vermelho.png";
				}else if($votosMG == $votosEG){
					$cp['localidade'][$i]['icon'][] = "ic_amar.png";
				}else{
					$cp['localidade'][$i]['icon'][] = "ic_azul.png";
				}
				$cp['localidade'][$i]['votosMG'][] = $votosMG;
				$cp['localidade'][$i]['votosEG'][] = $votosEG;
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


