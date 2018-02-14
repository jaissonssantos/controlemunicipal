<?php

//DEFINIR TIMEZONE PADRÃO
date_default_timezone_set("Brazil/East");

//OCULTAR OS WARNING DO PHP
//error_reporting(E_ALL ^ E_WARNING);
//ini_set("display_errors", 0 );

// DEFININDO OS DADOS DE ACESSO AO BANCO DE DADOS
define("DB",'mysql');
define("DB_HOST","localhost");
define("DB_NAME","controlemunicipal");
define("DB_USER","root");
define("DB_PASS","root");
define("SALT","L0tw6oTnB7"); //nunca mudar

// ADICIONAR CLASSE DE CONECAO
include_once("Conexao.class.php");

?>