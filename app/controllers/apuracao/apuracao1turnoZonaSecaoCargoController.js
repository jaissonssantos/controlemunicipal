
app.controller('apuracao1turnoZonaSecaoCargoController', ['$rootScope', '$scope', 'cidadeService', 'apuracaoZonaSecaoCargoService', 'zonaService', 'secaoService',
		function($rootScope, $scope, cidadeService, apuracaoZonaSecaoCargoService, zonaService, secaoService){

	$scope.cidades = $scope.cidade = {};
	$scope.resultados = $scope.resultado = {};
	$scope.prefeitocandidatos = $scope.prefeitocandidato = {};
	$scope.zonas = $scope.zona = {};
	$scope.secoes = $scope.secao = {};
	$scope.results = {
		locais_loading: false
	};
	$scope.param = {
		cidade: {
			id: undefined
		}
	};

	$rootScope.$on('cidade', function(event, cidade) {
		$scope.cidade = cidade;
	});

	$rootScope.$on('zonas', function(event, zonas) {
		$scope.zonas = zonas;
	});

	$scope.$on("zonas:loading", function(event, status){
	    $scope.results.zonas_loading = status;
	});

	$scope.$on("secoes", function(event, secoes){
		$scope.secoes = secoes;
	});

	$scope.$on("secoes:loading", function(event, status){
	    $scope.results.secoes_loading = status;
	});

	$scope.$on("resultados", function(event, resultados){
		$scope.resultados = resultados;
	});

	$scope.$on("resultado:loading", function(event, status){
	    $scope.results.loading = status;
	});

	$scope.loadCidades = function(){
		cidadeService.getList();
	};

	$scope.loadZonas = function(){
		$scope.zona.cidade = $scope.param.cidade;
		zonaService.set($scope.zona);
		zonaService.getList();
	};

	$scope.loadSecoes = function(){
		$scope.secao.cidade = $scope.param.cidade;
		$scope.secao.zona = $scope.param.zona;
		secaoService.set($scope.secao);
		secaoService.getList();	
	}

	$scope.filter = function(){
		$scope.resultado.cargo = $scope.param.cargo;
		$scope.resultado.cidade = $scope.param.cidade;
		$scope.resultado.zona = $scope.param.zona;
		$scope.resultado.secao = $scope.param.secao;
		apuracaoZonaSecaoCargoService.set($scope.resultado);
		apuracaoZonaSecaoCargoService.getListZonaSecaoCargo();
	}

	$scope.sumVotes = function(secao){
		var votes = 0;
		secao.forEach(function(index){
			votes+= parseInt(index.votos!=undefined?index.votos:0);
		});
		return votes;
	}

}]);
 