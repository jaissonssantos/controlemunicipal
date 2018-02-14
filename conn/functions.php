<?php
function formata_data_en_US( $data ) {
  if( $data == '' ) return ''; 
  $day = $data{0}.$data{1};
  $month = $data{2}.$data{3};
  $year = $data{4}.$data{5}.$data{6}.$data{7};
  $d = $year.'-'.$month.'-'.$day;
  return $d;
}
function formata_data( $data ) {
	if( $data == '' ) return ''; 
  $d = explode('/', $data);
  return $d[2] . '-' .$d[1] . '-' . $d[0];
}
function data_volta( $data ) {
	if( $data == '' || $data == '0000-00-00') return '';
  $d = explode('-', $data);
  return $d[2] . '/' .$d[1] . '/' . $d[0];
}
function hora( $hora ) { //Deixa a hora 20:00
  $h = explode(':', $hora);
  return $h[0] . ':' . $h[1];
}
function getSemana($dia, $completo = 0) {
  switch($dia) {
    case 1: 
      $r = 'SEG'; $comp = 'Segunda-feira'; break;
    case 2: 
      $r = 'TER'; $comp = 'Terça-feira'; break;
    case 3: 
      $r = 'QUA'; $comp = 'Quarta-feira'; break;
    case 4: 
      $r = 'QUI'; $comp = 'Quinta-feira'; break;
    case 5: 
      $r = 'SEX'; $comp = 'Sexta-feira'; break;
    case 6: 
      $r = 'SAB'; $comp = 'Sábado'; break;
    case 7: 
      $r = 'DOM'; $comp = 'Domingo'; break;  
  }
  if ( $completo == 1 )
    return $comp;
  else 
    return $r;
}
function getSemana2($dia, $completo = 0) {
  switch($dia) {
    case 1: 
      $r = 'Seg'; $comp = 'Segunda-feira'; break;
    case 2: 
      $r = 'Ter'; $comp = 'Terça-feira'; break;
    case 3: 
      $r = 'Qua'; $comp = 'Quarta-feira'; break;
    case 4: 
      $r = 'Qui'; $comp = 'Quinta-feira'; break;
    case 5: 
      $r = 'Sex'; $comp = 'Sexta-feira'; break;
    case 6: 
      $r = 'Sab'; $comp = 'Sábado'; break;
    case 7: 
      $r = 'Dom'; $comp = 'Domingo'; break;  
  }
  if ( $completo == 1 )
    return $comp;
  else 
    return $r;
}

function getDiaSemana($dia, $completo = 0) {
  switch($dia) {
    case 1: 
      $r = 'Dom'; $comp = 'Domingo'; break;  
    case 2: 
      $r = 'Seg'; $comp = 'Segunda-feira'; break;
    case 3: 
      $r = 'Ter'; $comp = 'Terça-feira'; break;
    case 4: 
      $r = 'Qua'; $comp = 'Quarta-feira'; break;
    case 5: 
      $r = 'Qui'; $comp = 'Quinta-feira'; break;
    case 6: 
      $r = 'Sex'; $comp = 'Sexta-feira'; break;
    case 7: 
      $r = 'Sab'; $comp = 'Sábado'; break;
  }
  if ( $completo == 1 )
    return $comp;
  else 
    return $r;
}

function diasemana($data){  // Traz o dia da semana para qualquer data informada
  $tmp = explode("-", $data);

  $diasemana = date("w", mktime(0,0,0,$tmp[1],$tmp[2],$tmp[0]) );
  switch($diasemana){  
        case"0": 
          $diasemana = 1;//"Domingo";     
          break;  
        case"1": 
          $diasemana = 2;//"Segunda-Feira"; 
          break;  
        case"2": 
          $diasemana = 3;//"Terça-Feira";   
          break;  
        case"3": 
          $diasemana = 4;//"Quarta-Feira";  
          break;  
        case"4": 
          $diasemana = 5;//"Quinta-Feira";  
        break;  
        case"5": 
          $diasemana = 6;//"---ta-Feira";   
        break;  
        case"6": 
          $diasemana = 7;//"Sábado";   
          break;  
  }
  return $diasemana;
}

function hoje( $data ) {
  $dt = explode( '/', $data );
  return getSemana( date("N", mktime(0, 0, 0, $dt[1], $dt[0], intval($dt[2]) ) ), 1 );
}
function timeDiff($firstTime,$lastTime)
{
  $firstTime=strtotime($firstTime);
  $lastTime=strtotime($lastTime);
  $timeDiff=$lastTime-$firstTime;
  return $timeDiff;
}
function separa_hora($hora, $op) { //$op = minutos = 1; hora = 0
  $hr = explode(':', $hora);
  return $hr[$op];
}
function dataExtenso($dt) {
  $da = explode( '/', $dt );
  return $da[0] . ' de ' . getMes( $da[1] ) . ' de ' . $da[2];
}
function dataExtensoTimeline($dt) {
  $da = explode( '/', $dt );
  $diasemana = date("w", mktime(0,0,0,$da[1],$da[0],$da[2]) );
  return getSemana2($diasemana, 0) . '  ' . getMes2( $da[1] ) . '  ' . $da[0]. ' '. $da[2];
}
function getMes($m) {
  switch ($m){
  	case 1: $mes = "Janeiro"; break;
  	case 2: $mes = "Fevereiro"; break;
  	case 3: $mes = "Março"; break;
  	case 4: $mes = "Abril"; break;
  	case 5: $mes = "Maio"; break;
  	case 6: $mes = "Junho"; break;
  	case 7: $mes = "Julho"; break;
  	case 8: $mes = "Agosto"; break;
  	case 9: $mes = "Setembro"; break;
  	case 10: $mes = "Outubro"; break;
  	case 11: $mes = "Novembro"; break;
  	case 12: $mes = "Dezembro"; break;
  }
  return $mes;
}
function getMes2($m) {
  switch ($m){
    case 1: $mes = "Jan"; break;
    case 2: $mes = "Fev"; break;
    case 3: $mes = "Mar"; break;
    case 4: $mes = "Abr"; break;
    case 5: $mes = "Mai"; break;
    case 6: $mes = "Jun"; break;
    case 7: $mes = "Jul"; break;
    case 8: $mes = "Ago"; break;
    case 9: $mes = "Set"; break;
    case 10: $mes = "Out"; break;
    case 11: $mes = "Nov"; break;
    case 12: $mes = "Dez"; break;
  }
  return $mes;
}

function colocaAcentoMaiusculo( $texto ) {
  $array1 = array(   "á", "à", "â", "ã", "ä", "é", "è", "ê", "ë", "í", "ì", "î", "ï", "ó", "ò", "ô", "õ", "ö", "ú", "ù", "û", "ü", "ç"); 
                       
  $array2 = array(   "Á", "À", "Â", "Ã", "Ä", "É", "È", "Ê", "Ë", "Í", "Ì", "Î", "Ï", "Ó", "Ò", "Ô", "Õ", "Ö", "Ú", "Ù", "Û", "Ü", "Ç" ); 
  return str_replace( $array1, $array2, $texto ); 
}

function retira_acentos( $texto ) {
  $array1 = array(   "á", "à", "â", "ã", "ä", "é", "è", "ê", "ë", "í", "ì", "î", "ï", "ó", "ò", "ô", "õ", "ö", "ú", "ù", "û", "ü", "ç" 
                     , "Á", "À", "Â", "Ã", "Ä", "É", "È", "Ê", "Ë", "Í", "Ì", "Î", "Ï", "Ó", "Ò", "Ô", "Õ", "Ö", "Ú", "Ù", "Û", "Ü", "Ç" ); 
  $array2 = array(   "a", "a", "a", "a", "a", "e", "e", "e", "e", "i", "i", "i", "i", "o", "o", "o", "o", "o", "u", "u", "u", "u", "c" 
                     , "A", "A", "A", "A", "A", "E", "E", "E", "E", "I", "I", "I", "I", "O", "O", "O", "O", "O", "U", "U", "U", "U", "C" ); 
  return str_replace( $array1, $array2, $texto ); 
}
// Cria uma função que retorna o timestamp de uma data no formato DD/MM/AAAA
function geraTimestamp($data) {
$partes = explode('/', $data);
return mktime(0, 0, 0, $partes[1], $partes[0], $partes[2]);
}

function calculaDiferencaDatas($data_inicial, $data_final){
// Usa a função criada e pega o timestamp das duas datas:
$time_inicial = geraTimestamp($data_inicial);
$time_final = geraTimestamp($data_final);

// Calcula a diferença de segundos entre as duas datas:
$diferenca = $time_final - $time_inicial; // 19522800 segundos

// Calcula a diferença de dias
$dias = (int)floor( $diferenca / (60 * 60 * 24)); // 225 dias

// Exibe uma mensagem de resultado:
//echo "A diferença entre as datas ".$data_inicial." e ".$data_final." é de <strong>".$dias."</strong> dias";
  return $dias;
}

function h2m($hora) {
  $tmp = explode(":", $hora);
  return ($tmp[1]+($tmp[0]*60));
}

function m2h($mins) {
    // Se os minutos estiverem negativos
    if ($mins < 0)
        $min = abs($mins);
    else
        $min = $mins;

    // Arredonda a hora
    $h = floor($min / 60);
    $m = ($min - ($h * 60)) / 100;
    $horas = $h + $m;

    // Matemática da quinta série
    // Detalhe: Aqui também pode se usar o abs()
    if ($mins < 0)
        $horas *= -1;

    // Separa a hora dos minutos
    $sep = explode('.', $horas);
    $h = $sep[0];
    if (empty($sep[1]))
        $sep[1] = 00;

    $m = $sep[1];

    // Aqui um pequeno artifício pra colocar um zero no final
    if (strlen($m) < 2)
        $m = $m . 0;

    return sprintf('%02d:%02d', $h, $m);
}


/**
* retorno de hash
*
* @param $hash (string): valor para gerar o hash
* @param $cost (integer)  custo de processamento
* 
* @author Jaisson Santos <jaissonssantos@gmail.com>
* @return String
*/ 
function generatehash($cost = 1) {
  for($i = 0; $i <= $cost; $i++){
    $hash .= uniqid(null , true);
  }
  $hash = str_replace('.', '-', $hash);
  return $hash;
}


function envia_email($email, $assunto, $msg, $emaile, $nome_email) {
  // Inclui o arquivo class.phpmailer.php localizado na pasta phpmailer 
  // Inicia a classe PHPMailer
  $mail = new PHPMailer();
  // Define os dados do servidor e tipo de conexão 
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  /////////////   ********     NUNCA MUDAR ISSO     **********    //////////
  $mail->IsSMTP(); // Define que a mensagem será SMTP
  // $mail->SMTPDebug  = 1;
  $mail->Host = "mail.agendae.net"; // Endereço do servidor SMTP
  $mail->SMTPAuth = true; // Usa autenticação SMTP? (opcional)
  $mail->SMTPSecure = "tls";
  $mail->SMTP_PORT = "587";
  $mail->Username = "contato@agendae.net"; // Usuário do servidor SMTP
  $mail->Password = "kt@123"; // Senha do servidor SMTP
  $mail->Mailer = "smtp";
  
  // Define o remetente
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  $mail->From = $emaile;
  $mail->FromName = $nome_email; // Seu nome
  
  // Define os destinatário(s)
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  $mail->addReplyTo('', '');
  $mail->AddAddress($email);
  $mail->AddBCC($emaile);
  
  // Define os dados técnicos da Mensagem
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  $mail->IsHTML(true); // Define que o e-mail será enviado como HTML
  $mail->CharSet = 'utf-8'; // Charset da mensagem (opcional)
  
  // Define a mensagem (Texto e Assunto)
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  $mail->Subject = $assunto; // Assunto da mensagem
  // $mail->Body = '<b>TESTE DE ENVIO</b>';
  $mail->Body = '<table cellspacing="0" cellpadding="0" border="0" style="max-width:600px"><tbody><tr><td><table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#4184F3" style="min-width:332px;max-width:600px;border:1px solid #e0e0e0;border-bottom:0;border-top-left-radius:3px;border-top-right-radius:3px"><tbody><tr><td height="72px" colspan="3"></td></tr><tr><td width="32px"></td><td style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:24px;color:#ffffff;line-height:1.25">Contato Specialites</td><td width="32px"></td></tr><tr><td height="18px" colspan="3"></td></tr></tbody></table></td></tr><tr><td><table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#FAFAFA" style="min-width:332px;max-width:600px;border:1px solid #f0f0f0;border-bottom:1px solid #c0c0c0;border-top:0;border-bottom-left-radius:3px;border-bottom-right-radius:3px"><tbody><tr height="16px"><td width="32px" rowspan="3"></td><td></td><td width="32px" rowspan="3"></td></tr><tr><td><table cellspacing="0" cellpadding="0" border="0" style="min-width:300px"><tbody><tr><td style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:13px;color:#202020;line-height:1.5">Oi, '.$nome_email.'</td></tr><tr><td style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:13px;color:#202020;line-height:1.5">'.$msg.'</td></tr><tr height="32px"></tr><tr><td style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:13px;color:#202020;line-height:1.5">Atenciosamente, <br>Specialites - Clínica Odontológica e Médica</td></tr><tr height="16px"></tr></tbody></table></td></tr><tr height="32px"></tr></tbody></table></td></tr><tr height="16"></tr><tr><td style="max-width:600px;font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:10px;color:#bcbcbc;line-height:1.5">Este comunicado de serviço foi enviado via formulário de contato através do site specialitesac.com.br - e-mail enviado '.date("d/m/Y").' <br><div style="direction:ltr;text-align:left">&copy; 2015 Specialites Clínica Odontológica e Médica., Av. Quintino bocaiúva, 1643 , Bosque Rio Branco/AC, CEP: 68909-400, Brasil</div></td></tr></tbody></table>';
  $mail->AltBody = "e-mail enviada em ".date('d/m/Y h:i');
  
  // Define os anexos (opcional)
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  //$mail->AddAttachment("c:/temp/documento.pdf", "novo_nome.pdf");  // Insere um anexo
  
  // Envia o e-mail
  $enviado = $mail->Send();
  
  // Limpa os destinatários e os anexos
  $mail->ClearAddresses();
  $mail->ClearAllRecipients();
  $mail->ClearAttachments();
  
  // Exibe uma mensagem de resultado
  if ($enviado) {
    return true;
  } else {
    return false;
  }
}

?>