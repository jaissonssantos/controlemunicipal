
app.controller('apuracao1turnoPrefeitoMunicipioController', ['$rootScope', '$scope', 'cidadeService', 'apuracaoPrefeitosService', 'prefeitoCandidatoService',
		function($rootScope, $scope, cidadeService, apuracaoPrefeitosService, prefeitoCandidatoService){

	$scope.cidades = $scope.cidade = {};
	$scope.prefeitos = $scope.prefeito = {};
	$scope.prefeitocandidato = $scope.prefeitocandidatos = {};
	$scope.results = {
		sum: undefined
	};
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
		if(prefeitos.results!=undefined)
			$scope.sum(prefeitos.results);
	});

	$scope.$on("prefeitos:loading", function(event, status){
	    $scope.results.loading = status;
	});

	$scope.$on("prefeitocandidatos", function(event, prefeitocandidatos){
		$scope.prefeitocandidatos = prefeitocandidatos.results;
	});

	$scope.$on("prefeitocandidatos:loading", function(event, status){
	    $scope.results.prefeito_loading = status;
	});

	$scope.loadCidades = function(){
		cidadeService.getList();
	};

	$scope.loadCandidatos = function(){
		$scope.prefeitocandidato.cidade = $scope.param.cidade.id;
		prefeitoCandidatoService.set($scope.prefeitocandidato);
		prefeitoCandidatoService.getList();
	}

	$scope.filter = function(){
		$scope.prefeitos=undefined;
		$scope.prefeito.cidade = $scope.param.cidade.id;
		$scope.prefeito.candidato = $scope.param.candidato;
		apuracaoPrefeitosService.set($scope.prefeito);
		apuracaoPrefeitosService.getListPrefeitosMunicipio();
	}

	$scope.sumVotes = function(prefeito){
		var votes = 0;
		prefeito.forEach(function(index){
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
