
app.controller('placarEleicaoController', ['$rootScope', '$scope', 'cidadeService', 'apuracaoVereadoresService', 'apuracaoPrefeitosService', 'apuracaoQuantitativoService', 'apuracaoGovernadoresService', 'apuracaoPresidentesService', 'apuracaoSenadoresService', 'apuracaoDeputadoFederalService', 'apuracaoDeputadoEstadualService', '$location',
		function($rootScope, $scope, cidadeService, apuracaoVereadoresService ,apuracaoPrefeitosService, apuracaoQuantitativoService, apuracaoGovernadoresService, apuracaoPresidentesService, apuracaoSenadoresService, apuracaoDeputadoFederalService, apuracaoDeputadoEstadualService, $location){

	$scope.cidades = $scope.cidade = {};
	$scope.candidate = $scope.candidates = {};
	$scope.presidente = $scope.presidentes = {};
	$scope.governador = $scope.governadores = {};
	$scope.senador = {};
	$scope.senadores = {
		count: {},
		results: {}
	};
	$scope.dep_federal = {};
	$scope.dep_federais = {
		count: {},
		results: {}
	};
	$scope.dep_estadual = {};
	$scope.dep_estaduais = {
		count: {},
		results: {}
	};
	$scope.prefeito = $scope.prefeitos = {};
	$scope.vereador = $scope.vereadores = {};
	$scope.quantitativo = $scope.quantitativos = {};
	$scope.results = {};
	$scope.tab = 1;
	$scope.pvv = 0;
	$scope.param = {
		cidade: {
			id: undefined
		},
		ano: 2016,
		turno: 1
	};

	$rootScope.$on('cidade', function(event, cidade) {
		$scope.cidade = cidade;
		var exists = 0;
		var url = $location.path();
		if(cidade!=undefined && $scope.param.ano == 2016){
			cidade.forEach(function(cidade){
				if(cidade.id==16){ 
					$scope.param.cidade.id=cidade.id;
					exists++;
				}
			});
		}else if($scope.param.ano == 2014 || $scope.param.ano == 2010){
			$scope.param.cidade.id = '99';
			$scope.param.cidade.nome = 'AC';
		}
		if(exists && url=='/dashboard') $scope.filter();	
	});

	$scope.$on("governadores", function(event, governadores){
		$scope.governadores = governadores;
	});

	$scope.$on("governadores:loading", function(event, status){
	    $scope.results.governador_loading = status;
	});

	$scope.$on("presidentes", function(event, presidentes){
		switch(parseInt($scope.tab)){
			case 1:
				$scope.candidates = presidentes;
				$scope.presidentes = presidentes; 
				//set total tab item
				$scope.senadores.count.results = presidentes.count.results_senador;
				$scope.dep_federais.count.results = presidentes.count.results_depfederal;
				$scope.dep_estaduais.count.results = presidentes.count.results_depestadual;
			break;
		}
	});

	$scope.$on("presidentes:loading", function(event, status){
	    $scope.results.presidente_loading = status;
	});

	$scope.$on("senadores", function(event, senadores){
		switch(parseInt($scope.tab)){
			case 2:
				$scope.candidates = undefined;
				$scope.candidates = senadores;
				$scope.senadores = senadores; 
			break;
		}
	});

	$scope.$on("senadores:loading", function(event, status){
	    $scope.results.senadores_loading = status;
	});

	$scope.$on("deputadofederais", function(event, deputadofederais){
		switch(parseInt($scope.tab)){
			case 3:
				$scope.candidates = undefined;
				$scope.candidates = deputadofederais;
				$scope.dep_federais = deputadofederais; 
			break;
		}
	});

	$scope.$on("deputadofederais:loading", function(event, status){
	    $scope.results.dep_federais_loading = status;
	});

	$scope.$on("deputadoestaduais", function(event, deputadoestaduais){
		switch(parseInt($scope.tab)){
			case 4:
				$scope.candidates = undefined;
				$scope.candidates = deputadoestaduais;
				$scope.dep_estaduais = deputadoestaduais; 
			break;
		}
	});

	$scope.$on("deputadoestaduais:loading", function(event, status){
	    $scope.results.dep_estaduais_loading = status;
	});
	
	$scope.$on("prefeitos", function(event, prefeitos){
		$scope.prefeitos = prefeitos;
	});

	$scope.$on("quantitativos", function(event, quantitativos){
		$scope.quantitativos = quantitativos;
		switch(parseInt($scope.param.ano)){
			case 2010:
				$scope.pvv = $scope.quantitativos.results.governadores[0].nominais;
			break;
			case 2014:
				$scope.pvv = $scope.quantitativos.results.governadores[0].nominais;
			break;
			case 2016:
				$scope.pvv = $scope.quantitativos.results.prefeitos[0].nominais;
			break;
		}
	});

	$scope.$on("vereadores", function(event, vereadores){
		$scope.totalItemsVereadores = vereadores.count.results;
		$scope.totalVotosVereadores = vereadores.count.votes;
		$scope.vereadores = vereadores;
	});

	$scope.$on("vereadores:loading", function(event, status){
	    $scope.results.loading = status;
	});

	$scope.loadAno = function(){
		switch(parseInt($scope.param.ano)){
			case 2010:
				$scope.param.cidade.id = '99';
				$scope.param.cidade.nome = 'AC';
				$scope.quantitativos = undefined;
			break;
			case 2014:
				$scope.param.cidade.id = '99';
				$scope.param.cidade.nome = 'AC';
				$scope.quantitativos = undefined;
			break;
			case 2016:
				$scope.param.cidade.id = '16';
				$scope.param.cidade.nome = 'Rio Branco';
			break;
		}
	};

	$scope.loadCidades = function(){
		cidadeService.getList();
	};

	$scope.setListCidade = function(){
		$scope.prefeitos = undefined;
		$scope.vereadores = undefined;
		$scope.quantitativos = undefined;
		if($scope.param.cidade.id == '99'){
			$scope.param.cidade.id = '99';
			$scope.param.cidade.nome = 'AC';
		}
	}

	$scope.setTab = function(statusTab) {
		$scope.tab = statusTab;
		switch(parseInt($scope.param.ano)){
			case 2010:
				//clear 
				$scope.candidates = undefined;
				switch(parseInt(statusTab)){
					case 1:
						$scope.presidentes = undefined;
						$scope.presidente.status = statusTab;
						$scope.presidente.turno = $scope.param.turno;
						apuracaoPresidentesService.set($scope.presidente);
						if(parseInt($scope.param.turno) == 1){
							apuracaoPresidentesService.getListPresidente2010_1turno();
						}else{
							apuracaoPresidentesService.getListPresidente2010_2turno();
						}
					break;
					case 2:
						$scope.senadores = undefined;
						$scope.senador.status = statusTab;
						$scope.senador.turno = $scope.param.turno;
						$scope.senador.cidade = $scope.param.cidade.nome;
						apuracaoSenadoresService.set($scope.senador);
						apuracaoSenadoresService.getListSenador2010_1turno();
					break;
					case 3:
						$scope.dep_federais = undefined;
						$scope.dep_federal.status = statusTab;
						$scope.dep_federal.turno = $scope.param.turno;
						$scope.dep_federal.cidade = $scope.param.cidade.nome;
						apuracaoDeputadoFederalService.set($scope.dep_federal);
						apuracaoDeputadoFederalService.getListDeputadoFederal2010_1turno();
					break;
					case 4:
						$scope.dep_estaduais = undefined;
						$scope.dep_estadual.status = statusTab;
						$scope.dep_estadual.turno = $scope.param.turno;
						$scope.dep_estadual.turno = $scope.param.cidade.nome;
						apuracaoDeputadoEstadualService.set($scope.dep_estadual);
						apuracaoDeputadoEstadualService.getListDeputadoEstadual2010_1turno();
					break;
				}
			break;
			case 2014:
				//clear 
				$scope.candidates = undefined;
				switch(parseInt(statusTab)){
					case 1:
						$scope.presidentes = undefined;
						$scope.presidente.status = statusTab;
						$scope.presidente.turno = $scope.param.turno;
						apuracaoPresidentesService.set($scope.presidente);
						if(parseInt($scope.param.turno) == 1){
							apuracaoPresidentesService.getListPresidente2014_1turno();
						}else{
							apuracaoPresidentesService.getListPresidente2014_2turno();
						}
					break;
					case 2:
						$scope.senadores = undefined;
						$scope.senador.status = statusTab;
						$scope.senador.turno = $scope.param.turno;
						$scope.senador.cidade = $scope.param.cidade.nome;
						apuracaoSenadoresService.set($scope.senador);
						apuracaoSenadoresService.getListSenador2014_1turno();
					break;
					case 3:
						$scope.dep_federais = undefined;
						$scope.dep_federal.status = statusTab;
						$scope.dep_federal.turno = $scope.param.turno;
						$scope.dep_federal.cidade = $scope.param.cidade.nome;
						apuracaoDeputadoFederalService.set($scope.dep_federal);
						apuracaoDeputadoFederalService.getListDeputadoFederal2014_1turno();
					break;
					case 4:
						$scope.dep_estaduais = undefined;
						$scope.dep_estadual.status = statusTab;
						$scope.dep_estadual.turno = $scope.param.turno;
						$scope.dep_estadual.turno = $scope.param.cidade.nome;
						apuracaoDeputadoEstadualService.set($scope.dep_estadual);
						apuracaoDeputadoEstadualService.getListDeputadoEstadual2014_1turno();
					break;
				}
			break;
			case 2016:
				$scope.vereadores = undefined;
				$scope.vereador.status = statusTab;
				apuracaoVereadoresService.set($scope.vereador);
				apuracaoVereadoresService.getListVereadores();		
			break;
		}
	}

	$scope.filter = function(){
		$scope.cidade.forEach(function(cidade){
			if(parseInt(cidade.id) == parseInt($scope.param.cidade.id))
				$scope.param.cidade = {
					id: cidade.id,
					nome: cidade.nome
				};
		});

		switch(parseInt($scope.param.ano)){
			case 2010:
				//clear itens
				$scope.candidates = undefined;
				switch(parseInt($scope.param.turno)){
					case 1:
						$scope.vereador.status = $scope.tab;
						$scope.presidente.cidade = $scope.param.cidade.nome;
						$scope.governador.cidade = $scope.param.cidade.nome;
				
						apuracaoPresidentesService.set($scope.presidente);
						apuracaoPresidentesService.getListPresidente2010_1turno();

						apuracaoGovernadoresService.set($scope.governador);
						apuracaoGovernadoresService.getListGovernador2010_1turno();
						apuracaoQuantitativoService.getList2010_1turno();

						//set tab
						$scope.setTab($scope.tab);
					break;
					case 2:
						$scope.vereador.status = $scope.tab;
						$scope.presidente.cidade = $scope.param.cidade.nome;
						$scope.governador.cidade = $scope.param.cidade.nome;
				
						apuracaoPresidentesService.set($scope.presidente);
						apuracaoPresidentesService.getListPresidente2010_2turno();
						//set tab
						$scope.setTab($scope.tab);
					break;
				}
			break;
			case 2014:
				//clear itens
				$scope.candidates = undefined;
				switch(parseInt($scope.param.turno)){
					case 1:
						$scope.vereador.status = $scope.tab;
						$scope.presidente.cidade = $scope.param.cidade.nome;
						$scope.governador.cidade = $scope.param.cidade.nome;
				
						apuracaoPresidentesService.set($scope.presidente);
						apuracaoPresidentesService.getListPresidente2014_1turno();

						apuracaoGovernadoresService.set($scope.governador);
						apuracaoGovernadoresService.getListGovernador2014_1turno();
						apuracaoQuantitativoService.getList2014_1turno();

						//set tab
						$scope.setTab($scope.tab);
					break;
					case 2:
						$scope.vereador.status = $scope.tab;
						$scope.presidente.cidade = $scope.param.cidade.nome;
						$scope.governador.cidade = $scope.param.cidade.nome;
				
						apuracaoPresidentesService.set($scope.presidente);
						apuracaoPresidentesService.getListPresidente2014_2turno();

						apuracaoGovernadoresService.set($scope.governador);
						apuracaoGovernadoresService.getListGovernador2014_2turno();
						apuracaoQuantitativoService.getList2014_1turno();

						//set tab
						$scope.setTab($scope.tab);
					break;
				}
			break;
			case 2016:
				$scope.vereador.status = $scope.tab;
				$scope.vereador.cidade = $scope.param.cidade.nome;
				$scope.prefeito.cidade = $scope.param.cidade.nome;
				$scope.quantitativo.cidade = $scope.param.cidade.nome;
		
				apuracaoVereadoresService.set($scope.vereador);
				apuracaoVereadoresService.getListVereadores();
				apuracaoPrefeitosService.set($scope.prefeito);
				apuracaoPrefeitosService.getListPrefeitos();
				apuracaoQuantitativoService.set($scope.quantitativo);
				apuracaoQuantitativoService.getList2016_1turno();
			break;
		}
	}

	$scope.roundedPercentage = function(votes, totalvotes){
	   var result = (votes/totalvotes)*100;
	   return result.toFixed(2);
	}

	$scope.sum = function(value1, value2){
		var result = (parseInt(value1)+parseInt(value2));
		return result;
	}

}]);
