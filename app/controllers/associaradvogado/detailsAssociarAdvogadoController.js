app.controller('detailsAssociarAdvogadoController', ['$rootScope', '$scope', '$uibModalInstance', '$location', 'advogado', 'associarAdvogadoService',
function($rootScope, $scope, $uibModalInstance, $location, advogado, associarAdvogadoService) {

	$scope.associaradvogado = {
		id: advogado.id
	};
	$scope.results = {};

	$scope.$on("associaradvogado", function(event, associaradvogado){
		$scope.associaradvogado = associaradvogado;
	});

	$scope.$on("associaradvogados:loading", function(event, status){
		$scope.results.loading = status;
	});

	$scope.load = function(){
		associarAdvogadoService.set($scope.associaradvogado);
		associarAdvogadoService.load();
	}

	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');
	}

	$scope.edit = function(){
		$location.path('associar/advogado/edit/'+advogado.id);
	}

}]);