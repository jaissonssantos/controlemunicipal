
app.controller('apuracao1turnoVereadorSecaoController', ['$rootScope', '$scope', 'cidadeService', 'apuracaoVereadorService', 'zonaService', 'secaoService',
		function($rootScope, $scope, cidadeService, apuracaoVereadorService, zonaService, secaoService){

	$scope.cidades = $scope.cidade = {};
	$scope.vereadores = $scope.vereador = {};
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

	$scope.$on("vereadores", function(event, vereadores){
		$scope.vereadores = vereadores;
	});

	$scope.$on("vereadores:loading", function(event, status){
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
		$scope.vereador.cidade = $scope.param.cidade;
		$scope.vereador.zona = $scope.param.zona;
		$scope.vereador.secao = $scope.param.secao;
		apuracaoVereadorService.set($scope.vereador);
		apuracaoVereadorService.getListVereadorSecao();
	}

	$scope.sumVotes = function(secao){
		var votes = 0;
		secao.forEach(function(index){
			votes+= parseInt(index.votos!=undefined?index.votos:0);
		});
		return votes;
	}

}]);
 