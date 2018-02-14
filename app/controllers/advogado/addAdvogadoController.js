
app.controller('addAdvogadoController', ['$routeParams', '$location', '$rootScope', '$scope', 'advogadoService', 'regionalService', 'cidadeService', function($routeParams, $location, $rootScope, $scope, advogadoService, regionalService, cidadeService){

	$scope.advogado = {
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

	$rootScope.$on('advogado', function(event, advogado) {
		$scope.advogado = advogado;
	});

	$rootScope.$on('advogado:save', function(event, status) {
    $scope.status = {
      loading: (status == 'loading'),
      success: (status == 'success'),
      error: (status == 'error')
    };

		if($scope.status.success){
			$location.path('/advogado');
		}

  	});

  	$rootScope.$on('advogado:update', function(event, status) {
    $scope.status = {
      loading: (status == 'loading'),
      success: (status == 'success'),
      error: (status == 'error')
    };

		if($scope.status.success){
			$location.path('/advogado');
		}

  	});

	$scope.save = function() {
		advogadoService.set($scope.advogado);
		advogadoService.save();
	};
	$scope.load = function() {
		advogadoService.set($scope.advogado);
		advogadoService.load();
	};
	$scope.update = function() {
		advogadoService.set($scope.advogado);
		advogadoService.update();
	};

	$scope.loadCidades = function(){
		cidadeService.getList();
	};
	$scope.loadRegionais = function(){
		regionalService.getList();
	};

}]);
