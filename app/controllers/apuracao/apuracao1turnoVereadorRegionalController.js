
app.controller('apuracao1turnoVereadorRegionalController', ['$rootScope', '$scope', 'cidadeService', 'apuracaoVereadorService', 'vereadorCandidatoService',
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

	$scope.loadVereador = function(){
		$scope.vereadorcandidato.cidade=16;
		vereadorCandidatoService.set($scope.vereadorcandidato);
		vereadorCandidatoService.getList();
	}

	$scope.filter = function(){
		$scope.vereadores=undefined;
		$scope.vereador.candidato = $scope.param.candidato;
		$scope.vereador.regional = $scope.param.regional;
		apuracaoVereadorService.set($scope.vereador);
		apuracaoVereadorService.getListVereadorRegional();

		$scope.vereadorcandidatos.forEach(function(index){
			if($scope.param.candidato==index.numerovotavel)
				$scope.param.vereador=index; 
		});
	}

	$scope.sumVotes = function(secao){
		var votes = 0;
		secao.forEach(function(index){
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
 