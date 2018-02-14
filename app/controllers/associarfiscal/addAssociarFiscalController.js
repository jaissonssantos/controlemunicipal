
app.controller('addAssociarFiscalController', ['$rootScope', '$scope', '$routeParams', '$location', '$uibModal', 'associarFiscalService', 'locaisService', 'cidadeService', 'fiscalService', 
	function($rootScope, $scope, $routeParams, $location, $uibModal, associarFiscalService, locaisService, cidadeService, fiscalService){

	/*variables*/	
	$scope.associar = {
		id: $routeParams.id,
		localEdit: undefined,
		fiscaisEdit: []
	};
	$scope.list = {
		fiscais: [],
		secoes: [],
		associados: false
	};
	$scope.results = {
		associados: {
			loading: false
		}
	};
	$scope.associados = $scope.associados = {};
	$scope.fiscal = $scope.fiscais = {};
	$scope.secao = $scope.secoes = {};
	$scope.cidade = $scope.cidades = {};
	$scope.local = $scope.locais = {};
	$scope.info = {
		message: undefined
	}
	$scope.currentSearch = 1;


	$rootScope.$on('cidade', function(event, cidade) {
		$scope.cidade = cidade;
	});

	$rootScope.$on('local', function(event, local) {
		$scope.local = local;
	});

	$rootScope.$on('locais', function(event, locais) {
		$scope.locais = locais;
		if($scope.associar.local!=undefined){
			if(locais!=undefined){
				$scope.associar.localEdit = $scope.associar.local;
				$scope.associar.fiscaisEdit = $scope.associar.fiscais;
				$scope.loadSecoesEdit();
			}
		}
	});

	$rootScope.$on('associarfiscal', function(event, associar) {
		$scope.associar = associar;
		if(!$scope.associar.action){
			if(associar.fiscais!=undefined) $scope.list.fiscais=associar.fiscais;
			if(associar.fiscais!=undefined) $scope.list.associados=true;
			if(associar.local!=undefined) $scope.loadLocais();
		}
	});

	$rootScope.$on('fiscal:name', function(event, fiscais) {
		$scope.fiscais = fiscais;
	});

	$scope.$on("fiscais:loading", function(event, status){
		$scope.results.loading = status;
	});

	$rootScope.$on('local:secao', function(event, secao) {
		$scope.list.secoes = secao.results;
		if(secao.results!=undefined){
			$scope.list.secoes.forEach(function(secao){
				secao.ativas = 0;
			});
			if($scope.associar.id!=undefined){
				var count = 0;
				$scope.list.secoes.forEach(function(secao){
					$scope.list.fiscais.forEach(function(fiscais){
			  			if(fiscais.secao == secao.secao) count++;
			  		});
			  		if(count) secao.ativas = secao.ativas+1;
			  		count=0;
				});
			}
			var associados = 0;
			$scope.list.secoes.forEach(function(secao){
				if(secao.ativas == 0) associados++;
			});
			if(!associados) 
				$scope.list.associados = true 
			else 
				$scope.list.associados = false;
		}
	});
	
	$rootScope.$on('associado:delete', function(event, associados) {
		$scope.associados = associados;
	});

	$scope.$on("associados:loading", function(event, status){
		$scope.results.associados.loading = status;
	});

	$rootScope.$on('associarfiscal:save', function(event, status) {
	    $scope.status = {
	      loading: (status == 'loading'),
	      success: (status == 'success'),
	      error: (status == 'error')
	    };
		if($scope.status.success){
			$location.path('/associar/fiscal');
		}
  	});

  	$rootScope.$on('associarfiscal:update', function(event, status) {
	    $scope.status = {
	      loading: (status == 'loading'),
	      success: (status == 'success'),
	      error: (status == 'error')
	    };
		if($scope.status.success){
			$location.path('/associar/fiscal');
		}
  	});

  	$scope.loadSecoes = function(){
  		/*clear list*/
		$scope.list.associados = false;
		$scope.list.secoes = [];
		$scope.list.fiscais = [];
		$scope.secao.secao = $scope.associar.local;
		$scope.secao.cidade = $scope.associar.cidade;
		locaisService.set($scope.secao);
		locaisService.getListSecao();
  	}

  	$scope.loadSecoesEdit = function(){
  		/*clear list*/
  		$scope.list.secoes = [];
  		if($scope.associar.local!=$scope.associar.localEdit)
  			$scope.list.fiscais = []
  		else
  			$scope.list.fiscais = $scope.associar.fiscaisEdit;
  		$scope.list.secoes = [];
  		$scope.secao.secao = $scope.associar.local;
		$scope.secao.cidade = $scope.associar.cidade;
		locaisService.set($scope.secao);
		locaisService.getListSecao();
  	}

  	$scope.addFiscal = function(fiscal){
  		var exists = 0;
  		var count = 0;
  		var associados = 0;
  		fiscal.secao = $scope.associar.secao;
  		$scope.list.fiscais.forEach(function(fiscais){
  			if(fiscais.secao == fiscal.secao) count++;
  			if(fiscais.id == fiscal.id) exists = 1;
  		});
  		if(!exists && count<2){
  			$scope.list.secoes.forEach(function(secao){
  				if(fiscal.secao == secao.secao) secao.ativas = secao.ativas+1;
  			});
			$scope.list.fiscais.push(fiscal);
		}
		$scope.list.secoes.forEach(function(secao){
			if(secao.ativas == 0) associados++;
		});
		if(!associados) $scope.list.associados = true;
	};

	$scope.delFiscal = function(fiscal){
		var associados = 0;
		$scope.list.fiscais.forEach(function(selected, index){
			if(selected.id == fiscal.id){
				$scope.list.fiscais.splice(index, 1);
				associarFiscalService.deleteItem(fiscal);
			}
		});
		$scope.list.secoes.forEach(function(secao){
			if(fiscal.secao == secao.secao) secao.ativas = (secao.ativas >= 0 && secao.ativas <=2) ? secao.ativas-1 : 0;
		});
		$scope.list.secoes.forEach(function(secao){
			if(secao.ativas == 0) associados++;
		});
		if(associados) $scope.list.associados = false;
		if($scope.list.fiscais.length==0 && $scope.associar.id) 
			$scope.delLocal();
	}

	$scope.delLocal = function(){
		$scope.info.message = "Todos os fiscais foram desvinculados do local de votação, favor faça uma nova vinculação";
		var modalInstance = $uibModal.open({
			templateUrl: 'views/info.html',
			controller: 'deleteAssociarFiscalController',
			backdrop: 'static',
  			keyboard: false,
			resolve: {
				info: function(){
					return $scope.info;
				},
				fiscal: function(){
					return $scope.associar;
				}
			}
		});
	}

  	/*--busca pelo nome do fiscal--*/
	$scope.search = function(event){
		if($scope.fiscal.nome != undefined && $scope.fiscal.nome.length >= 3){
			if(event.keyCode!=40&&event.keyCode!=38&&event.keyCode!=37&&event.keyCode!=39&&event.keyCode!=13&&event.keyCode!=27){
				$scope.fiscal.cidade = $scope.associar.cidade;
				fiscalService.set($scope.fiscal);
				fiscalService.checkname();
			}
			//keyPress down
			if(event.keyCode==40 && ($scope.currentSearch+1)<= $scope.fiscais.results.length){
				$scope.setCurrentSearch($scope.currentSearch+1);
			}
			//keyPress up
			if(event.keyCode==38 && ($scope.currentSearch-1) >= 1){
				$scope.setCurrentSearch($scope.currentSearch-1);
			}
			//KeyPress enter
			if(event.keyCode==13) {
				$scope.addFiscal($scope.fiscais.results[$scope.currentSearch-1]);
				/*clear*/
				$scope.fiscais.results = undefined;        
				$scope.fiscal.nome = undefined;
			}
			//KeyPress esc
			if(event.keyCode==27){
				$scope.closeAutocomplete();
			}
		}else{
			$scope.fiscais.results = undefined;
		}
	}

	$scope.exitAutocomplete = function(event){
		/*clear
		$scope.fiscais.results = undefined;*/
	}

	$scope.closeAutocomplete = function(){
		/*clear*/
		$scope.fiscais.results = undefined;        
		$scope.fiscal.nome = undefined;
	}

	$scope.save = function() {
		/*set*/
		$scope.associar.fiscais = $scope.list.fiscais;
		associarFiscalService.set($scope.associar);
		associarFiscalService.save();
	};
	$scope.load = function() {
		associarFiscalService.set($scope.associar);
		associarFiscalService.load();
	};
	$scope.update = function() {
		/*set*/
		$scope.associar.action = 'update';
		$scope.associar.fiscais = $scope.list.fiscais;
		associarFiscalService.set($scope.associar);
		associarFiscalService.update();
	};

	$scope.loadCidades = function(){
		cidadeService.getList();
	};
	$scope.loadLocais = function(){
		$scope.locais = undefined;
		/*set*/
		$scope.local.id = $scope.associar.cidade;
		locaisService.set($scope.local);
		locaisService.getListLocal();
	};

	/*--função de navegação dos resultados da busca--*/
    $scope.isCurrentSearch = function(index) {
		if(index === $scope.currentSearch) {
		    return true;
		}else{
		    return false;
		}
    }
    $scope.setCurrentSearch = function(index){
       $scope.currentSearch = index;
    }
    /*--fim da navegação---*/

}]);
