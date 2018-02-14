
app.controller('addCoordenadorController', ['$routeParams', '$location', '$rootScope', '$scope', 'coordenadorService', 'regionalService', 'cidadeService', function($routeParams, $location, $rootScope, $scope, coordenadorService, regionalService, cidadeService){

	$scope.coordenador = {
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

	$rootScope.$on('coordenador', function(event, coordenador) {
		$scope.coordenador = coordenador;
	});

	$rootScope.$on('coordenador:save', function(event, status) {
    $scope.status = {
      loading: (status == 'loading'),
      success: (status == 'success'),
      error: (status == 'error')
    };

		if($scope.status.success){
			$location.path('/coordenador');
		}

  	});

  	$rootScope.$on('coordenador:update', function(event, status) {
    $scope.status = {
      loading: (status == 'loading'),
      success: (status == 'success'),
      error: (status == 'error')
    };

		if($scope.status.success){
			$location.path('/coordenador');
		}

  	});

	$scope.save = function() {
		coordenadorService.set($scope.coordenador);
		coordenadorService.save();
	};
	$scope.load = function() {
		coordenadorService.set($scope.coordenador);
		coordenadorService.load();
	};
	$scope.update = function() {
		coordenadorService.set($scope.coordenador);
		coordenadorService.update();
	};

	$scope.loadCidades = function(){
		cidadeService.getList();
	};
	$scope.loadRegionais = function(){
		regionalService.getList();
	};

}]);
