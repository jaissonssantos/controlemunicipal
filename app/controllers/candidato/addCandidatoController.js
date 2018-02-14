
app.controller('addCandidatoController', ['$routeParams', '$location', '$rootScope', '$scope', 'candidatoService', 'cidadeService', 'partidoService', function($routeParams, $location, $rootScope, $scope, candidatoService, cidadeService, partidoService){

	$scope.candidato = {
		id: $routeParams.id,
		status:1
	};


	$scope.cidade = $scope.cidades = {};

	$rootScope.$on('cidade', function(event, cidade) {
		$scope.cidade = cidade;
	});

	$scope.partido = $scope.partidos = {};

	$rootScope.$on('partido', function(event, partido) {
		$scope.partido = partido;
	});

	$rootScope.$on('candidato', function(event, candidato) {
		$scope.candidato = candidato;
	});

	$rootScope.$on('candidato:save', function(event, status) {
    $scope.status = {
      loading: (status == 'loading'),
      success: (status == 'success'),
      error: (status == 'error')
    };

		if($scope.status.success){
			$location.path('/candidato');
		}

  	});

  	$rootScope.$on('candidato:update', function(event, status) {
    $scope.status = {
      loading: (status == 'loading'),
      success: (status == 'success'),
      error: (status == 'error')
    };

		if($scope.status.success){
			$location.path('/candidato');
		}

  	});

	$scope.save = function() {
		candidatoService.set($scope.candidato);
		candidatoService.save();
	};
	$scope.load = function() {
		candidatoService.set($scope.candidato);
		candidatoService.load();
	};
	$scope.update = function() {
		candidatoService.set($scope.candidato);
		candidatoService.update();
	};

	$scope.loadCidades = function(){
		cidadeService.getList();
	};

	$scope.loadPartidos = function(){
		partidoService.getList();
	};

}]);
