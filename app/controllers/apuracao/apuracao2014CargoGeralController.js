app.controller('apuracao2014CargoGeralController', ['$rootScope', '$scope', 'cidadeService', 'apuracao2014Service', 'governadorCandidatoService','presidenteCandidatoService', 'senadorCandidatoService', 'deputadoCandidatoService',
		function($rootScope, $scope, cidadeService, apuracao2014Service ,governadorCandidatoService, presidenteCandidatoService, senadorCandidatoService, deputadoCandidatoService){

	$scope.cidade = $scope.cidades = {};
	$scope.candidato = $scope.candidatos = {};
	$scope.presidente = $scope.presidentes = {};
	$scope.governador = $scope.governadores = {};
	$scope.senador = $scope.senadores = {};
	$scope.deputado = $scope.deputados = {};
	$scope.field = $scope.fields = {};
	$scope.resultado = $scope.resultados = {};
	$scope.results = {
		sum: undefined
	};
	$scope.param = {
		rural: true,
		urbana: true
	};

	$rootScope.$on('cidade', function(event, cidade) {
		$scope.cidade = cidade;
	});

	$scope.$on("resultados", function(event, resultados){
		$scope.resultados = resultados;
		if(resultados.results!=undefined)
			$scope.sum(resultados.results);
	});

	$scope.$on("resultados:loading", function(event, status){
	    $scope.results.loading = status;
	});

	$scope.$on("presidentes", function(event, presidentes){
		$scope.candidatos = presidentes.results;
	});

	$scope.$on("presidentes:loading", function(event, status){
	    $scope.results.presidente_loading = status;
	});

	$scope.$on("governadores", function(event, governadores){
		$scope.candidatos = governadores.results;
	});

	$scope.$on("governadores:loading", function(event, status){
	    $scope.results.governador_loading = status;
	});

	$scope.$on("senadores", function(event, senadores){
		$scope.candidatos = senadores.results;
	});

	$scope.$on("senadores:loading", function(event, status){
	    $scope.results.senador_loading = status;
	});

	$scope.$on("deputados", function(event, deputados){
		$scope.candidatos = deputados.results;
	});

	$scope.$on("deputados:loading", function(event, status){
	    $scope.results.deputado_loading = status;
	});

	$scope.loadCidades = function(){
		cidadeService.getList();
	};

	$scope.loadCargos = function(){
		$scope.param.cargo = 'PRESIDENTE';
		$scope.presidente.cidade = $scope.param.cidade;
		presidenteCandidatoService.set($scope.presidente);
		presidenteCandidatoService.getList();
	};

	$scope.loadCandidatos = function(){
		switch($scope.param.cargo){
			case 'PRESIDENTE':
				$scope.presidente.cidade = $scope.param.cidade;
				$scope.presidente.turno = $scope.param.turno;
				presidenteCandidatoService.set($scope.presidente);
				presidenteCandidatoService.getList();
			break;
			case 'GOVERNADOR':
				$scope.governador.cidade = $scope.param.cidade;
				$scope.governador.turno = $scope.param.turno;
				governadorCandidatoService.set($scope.governador);
				governadorCandidatoService.getList();
			break;
			case 'SENADOR':
				$scope.senador.cidade = $scope.param.cidade;
				senadorCandidatoService.set($scope.senador);
				senadorCandidatoService.getList();
			break;
			case 'DEPUTADO ESTADUAL':
				$scope.deputado.cidade = $scope.param.cidade;
				$scope.deputado.cargo = $scope.param.cargo;
				deputadoCandidatoService.set($scope.deputado);
				deputadoCandidatoService.getList();
			break;
			case 'DEPUTADO FEDERAL':
				$scope.deputado.cidade = $scope.param.cidade;
				$scope.deputado.cargo = $scope.param.cargo;
				deputadoCandidatoService.set($scope.deputado);
				deputadoCandidatoService.getList();
			break;
		}
	}

	$scope.filter = function(){
		$scope.fields=undefined;
		$scope.field.cidade = $scope.param.cidade;
		$scope.field.candidato = $scope.param.candidato;
		$scope.field.cargo = $scope.param.cargo;
		$scope.field.turno = $scope.param.turno;
		if($scope.param.rural && $scope.param.urbana){
			$scope.field.bairro = 'all';
		}else if($scope.param.rural){
			$scope.field.bairro = 'ZONA RURAL';
		}else if($scope.param.urbana){
			$scope.field.bairro = 'ZONA URBANA';
		}else{
			$scope.field.bairro = 'all';
		}
		apuracao2014Service.set($scope.field);
		apuracao2014Service.getListCargoGeral();
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
