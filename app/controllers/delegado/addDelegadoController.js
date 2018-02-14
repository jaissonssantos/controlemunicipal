
app.controller('addDelegadoController', ['$routeParams', '$location', '$rootScope', '$scope', 'delegadoService', 'cidadeService', 'regionalService', function($routeParams, $location, $rootScope, $scope, delegadoService, cidadeService, regionalService){

	$scope.delegado = {
		id: $routeParams.id,
		status:1
	};

	$scope.regional = $scope.regionais = {};

	$rootScope.$on('regional', function(event, regional) {
		$scope.regional = regional;
	});


	$scope.cidade = $scope.cidades = {};

	$rootScope.$on('cidade', function(event, cidade) {
		$scope.cidade = cidade;
	});

	$rootScope.$on('delegado', function(event, delegado) {
		$scope.delegado = delegado;
	});

	$rootScope.$on('delegado:save', function(event, status) {
    $scope.status = {
      loading: (status == 'loading'),
      success: (status == 'success'),
      error: (status == 'error')
    };

		if($scope.status.success){
			$location.path('/delegado');
		}

  	});

  	$rootScope.$on('delegado:update', function(event, status) {
    $scope.status = {
      loading: (status == 'loading'),
      success: (status == 'success'),
      error: (status == 'error')
    };

		if($scope.status.success){
			$location.path('/delegado');
		}

  	});

	$scope.save = function() {
		delegadoService.set($scope.delegado);
		delegadoService.save();
	};
	$scope.load = function() {
		delegadoService.set($scope.delegado);
		delegadoService.load();
	};
	$scope.update = function() {
		delegadoService.set($scope.delegado);
		delegadoService.update();
	};

	$scope.loadCidades = function(){
		cidadeService.getList();
	};

	$scope.loadRegionais = function(){
		regionalService.getList();
	};

}]);
