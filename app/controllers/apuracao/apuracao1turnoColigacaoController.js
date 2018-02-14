
app.controller('apuracao1turnoColigacaoController', ['$rootScope', '$scope', 'cidadeService', 'apuracaoColigacaoService',
		function($rootScope, $scope, cidadeService, apuracaoColigacaoService){

	$scope.cidades = $scope.cidade = {};
	$scope.prefeitos = $scope.prefeito = {};
	$scope.results = {};
	$scope.resultados = "";
	$scope.param = {
		cidade: {
			id: undefined
		}
	};

	$rootScope.$on('cidade', function(event, cidade) {
		$scope.cidade = cidade;
	});

	$scope.$on("prefeitos", function(event, prefeitos){
		$scope.prefeitos = prefeitos;
		$scope.resultados = prefeitos;
	});

	$scope.$on("prefeitos:loading", function(event, status){
	    $scope.results.loading = status;
	});

	$scope.loadCidades = function(){
		cidadeService.getList();
	};

	$scope.filter = function(){
		apuracaoColigacaoService.getList($scope.param.cidade.id);
		//console.log($scope.prefeitos);
		//$scope.resultados = $scope.prefeitos;
	}

}]);
