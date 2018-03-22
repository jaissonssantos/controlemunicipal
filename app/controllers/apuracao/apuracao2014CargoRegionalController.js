
app.controller('apuracao2014CargoRegionalController', ['$rootScope', '$scope', 'cidadeService', 'apuracao2014Service',
		function($rootScope, $scope, cidadeService, apuracao2014Service){

	$scope.cidade = $scope.cidades = {};
	$scope.candidato = $scope.candidatos = {};
	$scope.field = $scope.fields = {};
	$scope.resultado = $scope.resultados = {};
	$scope.results = {
		sum: undefined
	};
	$scope.param = {};

	$scope.$on("resultados", function(event, resultados){
		$scope.resultados = resultados;
	});

	$scope.$on("resultados:loading", function(event, status){
	    $scope.results.loading = status;
	});


	$scope.filter = function(){
		$scope.fields=undefined;
		$scope.field.turno = $scope.param.turno;
		$scope.field.cargo = $scope.param.cargo;
		$scope.field.candidato = $scope.param.candidato;
		$scope.field.regional = $scope.param.regional;
		apuracao2014Service.set($scope.field);
		apuracao2014Service.getListCargoRegional();
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
 