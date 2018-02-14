<?php
header ('Content-type: text/html; charset=utf-8');
include("../conn/config.php");
$oConexao = Conexao::getInstance();


function retira_acentos( $texto ) {
  $array1 = array(   "á", "à", "â", "ã", "ä", "é", "è", "ê", "ë", "í", "ì", "î", "ï", "ó", "ò", "ô", "õ", "ö", "ú", "ù", "û", "ü", "ç" 
                     , "Á", "À", "Â", "Ã", "Ä", "É", "È", "Ê", "Ë", "Í", "Ì", "Î", "Ï", "Ó", "Ò", "Ô", "Õ", "Ö", "Ú", "Ù", "Û", "Ü", "Ç" ); 
  $array2 = array(   "a", "a", "a", "a", "a", "e", "e", "e", "e", "i", "i", "i", "i", "o", "o", "o", "o", "o", "u", "u", "u", "u", "c" 
                     , "A", "A", "A", "A", "A", "E", "E", "E", "E", "I", "I", "I", "I", "O", "O", "O", "O", "O", "U", "U", "U", "U", "C" ); 
  return str_replace( $array1, $array2, $texto ); 
}

if ( !empty( $_FILES ) ) {

	try{
		$idaditivo = $_GET["idaditivo"];
	    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
	    $nome = $_FILES[ 'file' ][ 'name' ];
	    $extensao = strtolower(end(explode('.', $_FILES[ 'file' ][ 'name' ])));
	    $nomearquivo = md5(uniqid(time())).".".$extensao;
	    //$uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
	    $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . $nomearquivo;

	     if(move_uploaded_file( $tempPath, $uploadPath )){

	     	//echo $idcontrato." - ".$nome." - ".$nomearquivo;

	    	$stmt = $oConexao->prepare("INSERT INTO arquivos_aditivo (idaditivo, nome, arquivo) VALUES (:idaditivo, :nome, :arquivo)");
	    	$stmt->bindParam('idaditivo', $idaditivo);
	    	$stmt->bindParam('nome', $nome);
	    	$stmt->bindParam('arquivo', $nomearquivo);
	    	$stmt->execute();
			$oConexao = null;

	    	$answer = array( 'answer' => 'File transfer completed' );
	    	$json = json_encode( $answer );
	    }else{
	    	$answer = array( 'answer' => 'error' );
	    	$json = json_encode( $answer );
	    }
	    echo $json;
	}catch (PDOException $e){
		$oConexao->rollBack();
    	echo '{"error":{"text":'. $e->errorInfo[0] .'}}'; 
		die();
	}

} else {

    echo 'No files';

}
?>