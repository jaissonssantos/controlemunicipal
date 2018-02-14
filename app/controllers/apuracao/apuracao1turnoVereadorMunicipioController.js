
app.controller('apuracao1turnoVereadorMunicipioController', ['$rootScope', '$scope', 'cidadeService', 'apuracaoVereadorService', 'vereadorCandidatoService',
		function($rootScope, $scope, cidadeService, apuracaoVereadorService, vereadorCandidatoService){

	$scope.cidades = $scope.cidade = {};
	$scope.vereadores = $scope.vereador = {};
	$scope.vereadorcandidatos = $scope.vereadorcandidato = {};
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
		if(cidade!=undefined)
			$scope.cidade.forEach(function(index){
				if(parseInt(index.id)==16)
					$scope.cidade.splice(index, 1);
			});
	});

	$scope.$on("vereadores", function(event, vereadores){
		$scope.vereadores = vereadores;
		if(vereadores.results!=undefined)
			$scope.sum(vereadores.results);
	});

	$scope.$on("vereadores:loading", function(event, status){
	    $scope.results.loading = status;
	});

	$scope.$on("vereadorcandidatos", function(event, vereadorcandidatos){
		$scope.vereadorcandidatos = vereadorcandidatos.results;
	});

	$scope.$on("vereadorcandidatos:loading", function(event, status){
	    $scope.results.vereadores_loading = status;
	});

	$scope.loadCidades = function(){
		cidadeService.getList();
	};

	$scope.loadCandidatos = function(){
		$scope.vereadorcandidato.cidade = $scope.param.cidade.id;
		vereadorCandidatoService.set($scope.vereadorcandidato);
		vereadorCandidatoService.getList();
	}

	$scope.filter = function(){
		$scope.vereadores=undefined;
		$scope.vereador.cidade = $scope.param.cidade.id;
		$scope.vereador.candidato = $scope.param.candidato;
		apuracaoVereadorService.set($scope.vereador);
		apuracaoVereadorService.getListVereadorMunicipio();
	}

	$scope.sumVotes = function(vereador){
		var votes = 0;
		vereador.forEach(function(index){
			votes+= parseInt(index.votos!=undefined?index.votos:0);
		});
		return votes;
	}

	$scope.sum = function(vereador){
		var votes = 0;
		if(vereador!=undefined){
			vereador.forEach(function(local){
				local.secoes.forEach(function(voto){
					votes+= parseInt(voto.votos!=undefined?voto.votos:0);
				});
			});
			$scope.results.sum = votes;
		}
	}

}]);
