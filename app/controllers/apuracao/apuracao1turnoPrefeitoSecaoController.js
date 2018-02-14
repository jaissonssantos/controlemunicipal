
app.controller('apuracao1turnoPrefeitoSecaoController', ['$rootScope', '$scope', 'cidadeService', 'apuracaoPrefeitosService', 'zonaService', 'secaoService',
		function($rootScope, $scope, cidadeService, apuracaoPrefeitosService, zonaService, secaoService){

	$scope.cidades = $scope.cidade = {};
	$scope.prefeitos = $scope.prefeito = {};
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

	$scope.$on("prefeitos", function(event, prefeitos){
		$scope.prefeitos = prefeitos;
	});

	$scope.$on("prefeitos:loading", function(event, status){
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
		$scope.prefeito.cidade = $scope.param.cidade;
		$scope.prefeito.zona = $scope.param.zona;
		$scope.prefeito.secao = $scope.param.secao;
		apuracaoPrefeitosService.set($scope.prefeito);
		apuracaoPrefeitosService.getListPrefeitosLocalvotacaoSecao();
	}

	$scope.sumVotes = function(secao){
		var votes = 0;
		secao.forEach(function(index){
			votes+= parseInt(index.votos);
		});
		return votes;
	}

}]);
 