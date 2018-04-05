app.controller('apuracao2014CargoSecaoController', ['$rootScope', '$scope', 'cidadeService', 'zonaService', 'secaoService','apuracao2014Service',
		function($rootScope, $scope, cidadeService, zonaService, secaoService, apuracao2014Service){

	$scope.cidade = $scope.cidades = {};
	$scope.zona = $scope.zonas = {};
	$scope.secao = $scope.secoes = {};
	$scope.field = $scope.fields = {};
	$scope.resultado = $scope.resultados = {};
	$scope.results = {
		sum: undefined
	};
	$scope.param = {};

	$rootScope.$on('cidade', function(event, cidade) {
		$scope.cidade = cidade;
	});

	$scope.$on("resultados", function(event, resultados){
		$scope.resultados = resultados;
	});

	$scope.$on("resultados:loading", function(event, status){
	    $scope.results.loading = status;
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

	$scope.loadCidades = function(){
		cidadeService.getList();
	};

	$scope.loadZonas = function(){
		$scope.zona.cidade = $scope.param.cidade;
		$scope.zona.ano = 2014;
		zonaService.set($scope.zona);
		zonaService.getList();
	};

	$scope.loadSecoes = function(){
		$scope.secao.cidade = $scope.param.cidade;
		$scope.secao.zona = $scope.param.zona;
		$scope.secao.ano = 2014;
		secaoService.set($scope.secao);
		secaoService.getList();	
	}

	$scope.filter = function(){
		$scope.fields=undefined;
		$scope.field.cidade = $scope.param.cidade;
		$scope.field.cargo = $scope.param.cargo;
		$scope.field.turno = $scope.param.turno;
		$scope.field.zona = $scope.param.zona;
		$scope.field.secao = $scope.param.secao;
		apuracao2014Service.set($scope.field);
		apuracao2014Service.getListCargoSecao();
	}

	$scope.sumVotes = function(secao){
		var votes = 0;
		secao.forEach(function(index){
			votes+= parseInt(index.votos);
		});
		return votes;
	}

}]);
