<?php 
header('Content-type: application/json');
$response = new stdClass();

try{

	if(!isset($_SESSION['ang_cm_uid'])){
		throw new Exception('Verifique os dados preenchidos', 400);
    }

    //destruir a session
    session_unset($_SESSION['ang_cm_uid']);
	session_unset($_SESSION['ang_cm_name']);
	session_unset($_SESSION['ang_cm_email']);
	session_unset($_SESSION['ang_cm_profile']);
	session_unset($_SESSION['ang_cm_roles']);
	
	http_response_code(200);
	$response->success = true;

}catch (PDOException $e){
	http_response_code(500);
	$response->error = 'Desculpa. Tivemos um problema, tente novamente mais tarde';
}catch (Exception $e) {
	http_response_code($e->getCode());
	$response->error = $e->getMessage();
}

echo json_encode($response);

?>