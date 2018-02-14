<?php 

  //exibir erros no PHP, caso exista.
error_reporting(E_ALL);
ini_set('display_errors', 'Off');

if (!function_exists('http_response_code'))
{
    function http_response_code($newcode = NULL)
    {
        static $code = 200;
        if($newcode !== NULL)
        {
            header('X-PHP-Response-Code: '.$newcode, true, $newcode);
            if(!headers_sent())
                $code = $newcode;
        }
        return $code;
    }
}

if(!function_exists("array_column")){
    function array_column($array,$column_name){
        return array_map(function($element) use($column_name){return $element[$column_name];}, $array);
    }
}


header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: *");

// date_default_timezone_set( 'America/Sao_Paulo' ); //Brasilia
date_default_timezone_set( 'America/Rio_Branco' ); //Acre, Rio branco

ob_start();
session_start();

//ADICIONAR A CONEXAO E URL AMIGAVEL
include_once "../conn/Url.php";
include_once "../conn/config.php";

//FUNCOES
include_once "../conn/functions.php";

//INSTANCIA A CONEXAO
$oConexao = Conexao::getInstance();

$folder                 = Url::getURL( 0 );
$file                   = Url::getURL( 1 );
$params                 = Url::getURL( 2 );

if( $folder != NULL && file_exists( $folder.".php" ) ){
  include_once $folder.".php";
  exit();
}else if( $file != NULL && file_exists( $folder.'/'.$file.".php" ) ){
  include_once $folder.'/'.$file.".php";
  exit();
}

?>