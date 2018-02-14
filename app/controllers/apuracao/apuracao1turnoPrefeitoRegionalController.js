
app.controller('apuracao1turnoPrefeitoRegionalController', ['$rootScope', '$scope', 'cidadeService', 'apuracaoPrefeitosService',
		function($rootScope, $scope, cidadeService, apuracaoPrefeitosService){

	$scope.cidades = $scope.cidade = {};
	$scope.prefeitos = $scope.prefeito = {};
	$scope.results = {
		sum: undefined
	};
	$scope.param = {
		cidade: {
			id: undefined
		}
	};

	$scope.$on("prefeitos", function(event, prefeitos){
		$scope.prefeitos = prefeitos;
		if(prefeitos.results!=undefined)
			$scope.sum(prefeitos.results);
	});

	$scope.$on("prefeitos:loading", function(event, status){
	    $scope.results.loading = status;
	});

	$scope.filter = function(){
		$scope.prefeitos=undefined;
		$scope.prefeito.candidato = $scope.param.candidato;
		$scope.prefeito.regional = $scope.param.regional;
		apuracaoPrefeitosService.set($scope.prefeito);
		apuracaoPrefeitosService.getListPrefeitosRegional();
	}

	$scope.sumVotes = function(secao){
		var votes = 0;
		secao.forEach(function(index){
			votes+= parseInt(index.votos!=undefined?index.votos:0);
		});
		return votes;
	}

	$scope.sum = function(prefeito){
		var votes = 0;
		if(prefeito!=undefined){
			prefeito.forEach(function(local){
				local.secoes.forEach(function(voto){
					votes+= parseInt(voto.votos!=undefined?voto.votos:0);
				});
			});
			$scope.results.sum = votes;
		}
	}

}]);
 