'use strict';

app
	.controller('templateController',
		[ '$rootScope', '$scope', 'sessaoFactory', 'autenticarService', 'usuarioService', '$location', '$window', '$uibModal',
			function($rootScope, $scope, sessaoFactory, autenticarService, usuarioService, $location, $window, $uibModal){

				$scope.user = $scope.users = {};
				$scope.usuario = $scope.usuarios = {};
				$scope.count = {};
				$scope.authenticated = {};
				$scope.regional = false;
				$scope.interior = false;

				$rootScope.$on('usuario:count', function(event, count) {
					$scope.count = count;
				});

				$rootScope.$on('user:logout', function(event, status) {
				    $scope.status = {
				      loading: (status == 'loading'),
				      success: (status == 'success'),
				      error: (status == 'error')
				    };
					if($scope.status.success){
						$location.path('/login');
					}
			  	});

				$scope.load = function(){
					var exists = 0;
					var exists_interior=0;
					$scope.authenticated.user = $window.JSON.parse(sessaoFactory.get('ang_cm_user'))
					$scope.authenticated.user.cidade.forEach(function(cidade){
						if(cidade.cidade==16) exists = 1;
						if(cidade.cidade!=16) exists_interior++;
					});
					if(exists==1) $scope.regional = true;
					if(exists_interior!=0) $scope.interior = true;
				}

				$scope.count = function(){
					usuarioService.count();
				}

			  	$scope.logout = function(){
			  		sessaoFactory.destroy('ang_cm_user');
					autenticarService.logout();
				}

				//modal change password
				$scope.passwordchange = function(){
					var modalInstance = $uibModal.open({
						templateUrl: 'views/usuario/passwordchange.html',
						controller: 'passwordChangeUsuarioController',
						resolve: {
							usuario: function(){
								return $scope.authenticated.user;
							}
						}
					});
				}



	}]);