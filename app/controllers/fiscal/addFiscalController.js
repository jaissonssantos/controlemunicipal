
app.controller('addFiscalController', ['$routeParams', '$location', '$rootScope', '$scope', 'fiscalService', 'cidadeService', function($routeParams, $location, $rootScope, $scope, fiscalService, cidadeService){

	$scope.fiscal = {
		id: $routeParams.id,
		status: 1
	};


	$scope.cidade = $scope.cidades = {};

	$rootScope.$on('cidade', function(event, cidade) {
		$scope.cidade = cidade;
	});

	$rootScope.$on('fiscal', function(event, fiscal) {
		$scope.fiscal = fiscal;
	});

	$rootScope.$on('fiscal:save', function(event, status) {
    $scope.status = {
      loading: (status == 'loading'),
      success: (status == 'success'),
      error: (status == 'error')
    };

		if($scope.status.success){
			$location.path('/fiscal');
		}

  	});

  	$rootScope.$on('fiscal:update', function(event, status) {
    $scope.status = {
      loading: (status == 'loading'),
      success: (status == 'success'),
      error: (status == 'error')
    };

		if($scope.status.success){
			$location.path('/fiscal');
		}

  	});

	$scope.save = function() {
		fiscalService.set($scope.fiscal);
		fiscalService.save();
	};
	$scope.load = function() {
		fiscalService.set($scope.fiscal);
		fiscalService.load();
	};
	$scope.update = function() {
		fiscalService.set($scope.fiscal);
		fiscalService.update();
	};

	$scope.loadCidades = function(){
		cidadeService.getList();
	};

}]);
