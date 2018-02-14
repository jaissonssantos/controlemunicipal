app.controller('passwordChangeUsuarioController', ['$rootScope', '$scope', '$uibModalInstance', '$location', 'usuario', 'usuarioService',
function($rootScope, $scope, $uibModalInstance, $location, usuario, usuarioService) {

	$scope.usuario = {
		id: usuario.id
	};
	$scope.results = {};

	$rootScope.$on('usuarios:message:success', function(event, message) {
		$rootScope.success = message;
	});

	$rootScope.$on('usuarios:message:error', function(event, message) {
		$rootScope.error = message;
	});

	$rootScope.$on('usuario', function(event, usuario) {
		$scope.usuario = usuario;
	});

	$scope.$on("usuario:password", function(event, status){
		$scope.status = {
	      loading: (status == 'loading'),
	      success: (status == 'success'),
	      error: (status == 'error')
	    };
	    if($scope.status.success){
	    	$scope.usuario.senha = undefined;
	    	$scope.usuario.confirmarsenha = undefined;
	    }
	});

	$scope.$on("usuario:loading", function(event, status){
		$scope.results.loading = status;
	});

	$scope.load = function() {
		usuarioService.set($scope.usuario);
		usuarioService.load();
	};

	$scope.updatePassword = function(){
		usuarioService.set($scope.usuario);
		usuarioService.password();
	};

	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');
	}


}]);