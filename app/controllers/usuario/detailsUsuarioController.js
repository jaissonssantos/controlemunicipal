app.controller('detailsUsuarioController', ['$rootScope', '$scope', '$uibModalInstance', '$location', 'usuario', 'usuarioService',
function($rootScope, $scope, $uibModalInstance, $location, usuario, usuarioService) {

	$scope.usuario = {
		id: usuario.id
	};
	$scope.results = {};

	$scope.$on("usuario", function(event, usuario){
		$scope.usuario = usuario;
	});

	$scope.$on("usuario:loading", function(event, status){
		$scope.results.loading = status;
	});

	$scope.load = function(){
		usuarioService.set($scope.usuario);
		usuarioService.load();
	}

	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');
	}

	$scope.edit = function(){
		$location.path('usuario/edit/'+$scope.usuario.id);
	}

}]);