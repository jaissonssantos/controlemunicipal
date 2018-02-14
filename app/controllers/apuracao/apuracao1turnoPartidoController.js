
app.controller('apuracao1turnoPartidoController', ['$rootScope', '$scope', 'cidadeService', 'apuracaoPartidoService',
		function($rootScope, $scope, cidadeService, apuracaoPartidoService){

	$scope.cidades = $scope.cidade = {};
	$scope.resultados = $scope.resultado = {};
	$scope.results = {};
	$scope.param = {
		cidade: {
			id: undefined
		}
	};

	$rootScope.$on('cidade', function(event, cidade) {
		$scope.cidade = cidade;
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

	$scope.filter = function(){
		$scope.resultado.cidade = $scope.param.cidade;
		$scope.resultado.partido = $scope.param.partido;
		apuracaoPartidoService.set($scope.resultado);
		apuracaoPartidoService.getListPartidoMunicipio();
	}

}]);
