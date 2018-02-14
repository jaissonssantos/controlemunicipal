app.controller('detailsAssociarFiscalController', ['$rootScope', '$scope', '$uibModalInstance', '$location', 'fiscal', 'associarFiscalService',
function($rootScope, $scope, $uibModalInstance, $location, fiscal, associarFiscalService) {

	$scope.associarfiscal = {
		id: fiscal.id
	};
	$scope.results = {};

	$scope.$on("associarfiscal", function(event, associarfiscal){
		$scope.associarfiscal = associarfiscal;
	});

	$scope.$on("associarfiscais:loading", function(event, status){
		$scope.results.loading = status;
	});

	$scope.load = function(){
		associarFiscalService.set($scope.associarfiscal);
		associarFiscalService.load();
	}

	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');
	}

	$scope.edit = function(){
		$location.path('associar/fiscal/edit/'+fiscal.id);
	}

}]);