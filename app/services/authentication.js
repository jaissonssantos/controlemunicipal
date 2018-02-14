'use strict';

app
	.factory('authenticationSrv', [ '$http', '$location', 'sessionSrv' , function( $http, $location, sessionSrv ){

		return {

			login: function( data, scope ){
				/* enable loading and submitting before authentication */
				scope.isloading 	= true;
				scope.submitting	= true;
				/* send data to authentication login */
				$http.post('controller/authentication/login', data)
				.success(function( data ){
					if( data.email ){
						sessionSrv.set('ang_secc_uid', data.idusuario);
						sessionSrv.set('ang_secc_email', data.email);
						sessionSrv.set('ang_secc_profile', data.perfil);
						$location.path('/dashboard');
						
					}else if( data.credentials ){
						scope.msgcredentials = 'Favor verifique os dados, credenciais informada está incorreta.';
						/* clear model usuarioLogin */
						scope.usuarioLogin.email 	= null;
						scope.usuarioLogin.password = null;
						/* enable message error authentication */
						scope.msgErrorAuthentication = true;
					}
					/* disabled loading and submitting after authentication */
					scope.isloading 	= false;
					scope.submitting 	= false;
				})
				.error(function( error ){
					console.log( error );
				});
			},

			logout: function(){
				sessionSrv.destroy('ang_secc_uid');
				sessionSrv.destroy('ang_secc_email');
				sessionSrv.destroy('ang_secc_profile');
				$location.path('/login');
			},

			isLogged: function(){
 				var $checkSessionLogin = $http.post('controller/authentication/checksessionlogin');
 				return $checkSessionLogin;
			},

			rolesPermission: function(){
				var $getRolesPermission = $http.post('controller/authentication/rolespermissionlogin');
				return $getRolesPermission;
			}
			
		}

	}]);