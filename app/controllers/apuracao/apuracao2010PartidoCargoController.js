app.controller('apuracao2010PartidoCargoController', ['$rootScope', '$scope', 'cidadeService', 'partidoService', 'apuracao2010Service',
		function($rootScope, $scope, cidadeService, partidoService, apuracao2010Service){

    $scope.cidade = $scope.cidades = {};
    $scope.partido = $scope.partidos = {};
    $scope.field = $scope.fields = {};
	$scope.resultado = $scope.resultados = {};
	$scope.results = {};
	$scope.param = {};

	$rootScope.$on('cidade', function(event, cidade) {
		$scope.cidade = cidade;
    });
    
    $rootScope.$on('partido', function(event, partidos) {
		$scope.partidos = partidos;
    });
    
    $scope.$on("partidos:loading", function(event, status){
	    $scope.results.partido_loading = status;
	});

	$scope.$on("resultados", function(event, resultados){
		$scope.resultados = resultados;
	});

	$scope.$on("resultados:loading", function(event, status){
	    $scope.results.loading = status;
	});

	$scope.loadCidades = function(){
		cidadeService.getList();
    };
    
    $scope.loadPartidos = function(){
		$scope.partido.cargo = $scope.param.cargo;
		$scope.partido.turno = $scope.param.turno;
		$scope.partido.ano = 2010;
        partidoService.set($scope.partido);
		partidoService.getList2014PartidoCandidato();
	};

	$scope.filter = function(){
		$scope.field.cidade = $scope.param.cidade;
        $scope.field.partido = $scope.param.partido;
        $scope.field.cargo = $scope.param.cargo;
		apuracao2010Service.set($scope.field);
		apuracao2010Service.getListPartidoCargo();
	}

}]);
