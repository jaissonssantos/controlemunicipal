app.controller('detailsAssociarDelegadoController', ['$rootScope', '$scope', '$uibModalInstance', '$location', 'delegado', 'associarDelegadoService',
function($rootScope, $scope, $uibModalInstance, $location, delegado, associarDelegadoService) {

	$scope.associardelegado = {
		id: delegado.id
	};
	$scope.results = {};

	$scope.$on("associardelegado", function(event, associardelegado){
		$scope.associardelegado = associardelegado;
	});

	$scope.$on("associaradvogados:loading", function(event, status){
		$scope.results.loading = status;
	});

	$scope.load = function(){
		associarDelegadoService.set($scope.associardelegado);
		associarDelegadoService.load();
	}

	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');
	}

	$scope.edit = function(){
		$location.path('associar/delegado/edit/'+delegado.id);
	}

}]);