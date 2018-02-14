app.controller('detailsAssociarCoordenadorController', ['$rootScope', '$scope', '$uibModalInstance', '$location', 'coordenador', 'associarCoordenadorService',
function($rootScope, $scope, $uibModalInstance, $location, coordenador, associarCoordenadorService) {

	$scope.associarcoordenador = {
		id: coordenador.id
	};
	$scope.results = {};

	$scope.$on("associarcoordenador", function(event, associarcoordenador){
		$scope.associarcoordenador = associarcoordenador;
	});

	$scope.$on("associarcoordenadores:loading", function(event, status){
		$scope.results.loading = status;
	});

	$scope.load = function(){
		associarCoordenadorService.set($scope.associarcoordenador);
		associarCoordenadorService.load();
	}

	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');
	}

	$scope.edit = function(){
		$location.path('associar/coordenador/edit/'+coordenador.id);
	}

}]);