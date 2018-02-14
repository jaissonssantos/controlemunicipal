
app.controller('addAssociarAdvogadoController', ['$rootScope', '$scope', '$routeParams', '$location', 'associarAdvogadoService', 'locaisService', 'cidadeService', 'advogadoService', 
	function($rootScope, $scope, $routeParams, $location, associarAdvogadoService, locaisService, cidadeService, advogadoService){

	/*variables*/	
	$scope.associar = {
		id: $routeParams.id
	};
	$scope.list = {
		advogados: []
	}
	$scope.results = {
		associados: {
			loading: false
		}
	};
	$scope.associados = $scope.associados = {};
	$scope.advogado = $scope.advogados = {};
	$scope.cidade = $scope.cidades = {};
	$scope.local = $scope.locais = {};
	$scope.currentSearch = 1;


	$rootScope.$on('cidade', function(event, cidade) {
		$scope.cidade = cidade;
	});

	$rootScope.$on('local', function(event, local) {
		$scope.local = local;
	});

	$rootScope.$on('locais', function(event, locais) {
		$scope.locais = locais;
	});

	$rootScope.$on('associaradvogado', function(event, associar) {
		$scope.associar = associar;
		if(!$scope.associar.action){
			if(associar.advogados!=undefined) $scope.list.advogados=associar.advogados;
			if(associar.local!=undefined) $scope.loadLocais();
		}
	});

	$rootScope.$on('advogado:name', function(event, advogados) {
		$scope.advogados = advogados;
	});

	$scope.$on("advogados:loading", function(event, status){
		$scope.results.loading = status;
	});

	$rootScope.$on('associado:delete', function(event, associados) {
		$scope.associados = associados;
	});

	$scope.$on("associados:loading", function(event, status){
		$scope.results.associados.loading = status;
	});

	$rootScope.$on('associaradvogado:save', function(event, status) {
	    $scope.status = {
	      loading: (status == 'loading'),
	      success: (status == 'success'),
	      error: (status == 'error')
	    };
		if($scope.status.success){
			$location.path('/associar/advogado');
		}
  	});

  	$rootScope.$on('associaradvogado:update', function(event, status) {
	    $scope.status = {
	      loading: (status == 'loading'),
	      success: (status == 'success'),
	      error: (status == 'error')
	    };
		if($scope.status.success){
			$location.path('/associar/advogado');
		}
  	});

  	$scope.addAdvogado = function(advogado){
  		var exists = 0;
  		$scope.list.advogados.forEach(function(advogados){
  			if(advogados.id == advogado.id) exists = 1;
  		});
  		if(!exists){ 
			$scope.list.advogados.push(advogado);
		}
	};

	$scope.delAdvogado = function(advogado){
		$scope.list.advogados.forEach(function(selected, index){
			if(selected.id == advogado.id){
				$scope.list.advogados.splice(index, 1);
				advogado.associar = $scope.associar.id;
				associarAdvogadoService.deleteItem(advogado);
			}
		});
	}

  	/*--busca pelo nome do advogado--*/
	$scope.search = function(event){
		if($scope.advogado.nome != undefined && $scope.advogado.nome.length >= 3){
			if(event.keyCode!=40&&event.keyCode!=38&&event.keyCode!=37&&event.keyCode!=39&&event.keyCode!=13&&event.keyCode!=27){
				$scope.advogado.cidade = $scope.associar.cidade;
				advogadoService.set($scope.advogado);
				advogadoService.checkname();
			}
			//keyPress down
			if(event.keyCode==40 && ($scope.currentSearch+1)<= $scope.advogados.results.length){
				$scope.setCurrentSearch($scope.currentSearch+1);
			}
			//keyPress up
			if(event.keyCode==38 && ($scope.currentSearch-1) >= 1){
				$scope.setCurrentSearch($scope.currentSearch-1);
			}
			//KeyPress enter
			if(event.keyCode==13) {
				$scope.addAdvogado($scope.advogados.results[$scope.currentSearch-1]);
				/*clear*/
				$scope.advogados.results = undefined;        
				$scope.advogado.nome = undefined;
			}
			//KeyPress esc
			if(event.keyCode==27){
				$scope.closeAutocomplete();
			}
		}else{
			$scope.advogados.results = undefined;
		}
	}

	$scope.exitAutocomplete = function(event){
		/*clear*/
		$scope.advogados.results = undefined;
	}

	$scope.closeAutocomplete = function(){
		/*clear*/
		$scope.advogados.results = undefined;        
		$scope.advogado.nome = undefined;
	}

	$scope.save = function() {
		/*set*/
		$scope.associar.advogados = $scope.list.advogados;
		associarAdvogadoService.set($scope.associar);
		associarAdvogadoService.save();
	};
	$scope.load = function() {
		associarAdvogadoService.set($scope.associar);
		associarAdvogadoService.load();
	};
	$scope.update = function() {
		/*set*/
		$scope.associar.action = 'update';
		$scope.associar.advogados = $scope.list.advogados;
		associarAdvogadoService.set($scope.associar);
		associarAdvogadoService.update();
	};

	$scope.loadCidades = function(){
		cidadeService.getList();
	};
	$scope.loadLocais = function(){
		/*set*/
		$scope.local.id = $scope.associar.cidade;
		locaisService.set($scope.local);
		locaisService.getList();
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
