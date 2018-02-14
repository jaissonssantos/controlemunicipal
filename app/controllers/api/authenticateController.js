'use strict';

app
	.controller('authenticateController',
		['$rootScope', '$scope', 'autenticarService', 'sessaoFactory', '$location', '$window',
			function($rootScope, $scope, autenticarService, sessaoFactory, $location, $window){

				$scope.user = $scope.users = {};

				$rootScope.$on('users:message:error', function(event, message) {
					$rootScope.error = message;
				});

				$rootScope.$on('user', function(event, user) {
					if(!user.error){
						sessaoFactory.set('ang_cm_user', $window.JSON.stringify(user));
					}
				});

				$rootScope.$on('user:authenticate', function(event, status) {
				    $scope.status = {
				      loading: (status == 'loading'),
				      success: (status == 'success'),
				      error: (status == 'error')
				    };
					if($scope.status.success){
						$location.path('/dashboard');
					}
			  	});

				$scope.authenticate = function(){
					autenticarService.set($scope.user);
					autenticarService.authenticate();
				}

			}
		]
	);