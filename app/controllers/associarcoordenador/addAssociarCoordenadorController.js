
app.controller('addAssociarCoordenadorController', ['$rootScope', '$scope', '$routeParams', '$location', 'associarCoordenadorService', 'locaisService', 'cidadeService', 'coordenadorService', 
	function($rootScope, $scope, $routeParams, $location, associarCoordenadorService, locaisService, cidadeService, coordenadorService){

	/*variables*/	
	$scope.associar = {
		id: $routeParams.id
	};
	$scope.list = {
		coordenadores: []
	}
	$scope.results = {
		associados: {
			loading: false
		}
	};
	$scope.associados = $scope.associados = {};
	$scope.coordenador = $scope.coordenadores = {};
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

	$rootScope.$on('associarcoordenador', function(event, associar) {
		$scope.associar = associar;
		if(!$scope.associar.action){
			if(associar.coordenadores!=undefined) $scope.list.coordenadores=associar.coordenadores;
			if(associar.local!=undefined) $scope.loadLocais();
		}
	});

	$rootScope.$on('coordenador:name', function(event, coordenadores) {
		$scope.coordenadores = coordenadores;
	});

	$scope.$on("coordenadors:loading", function(event, status){
		$scope.results.loading = status;
	});

	$rootScope.$on('associado:delete', function(event, associados) {
		$scope.associados = associados;
	});

	$scope.$on("associados:loading", function(event, status){
		$scope.results.associados.loading = status;
	});

	$rootScope.$on('associarcoordenador:save', function(event, status) {
	    $scope.status = {
	      loading: (status == 'loading'),
	      success: (status == 'success'),
	      error: (status == 'error')
	    };
		if($scope.status.success){
			$location.path('/associar/coordenador');
		}
  	});

  	$rootScope.$on('associarcoordenador:update', function(event, status) {
	    $scope.status = {
	      loading: (status == 'loading'),
	      success: (status == 'success'),
	      error: (status == 'error')
	    };
		if($scope.status.success){
			$location.path('/associar/coordenador');
		}
  	});

  	$scope.addCoordenador = function(coordenador){
  		var exists = 0;
  		$scope.list.coordenadores.forEach(function(coordenadores){
  			if(coordenadores.id == coordenador.id) exists = 1;
  		});
  		if(!exists){ 
			$scope.list.coordenadores.push(coordenador);
		}
	};

	$scope.delCoordenador = function(coordenador){
		$scope.list.coordenadores.forEach(function(selected, index){
			if(selected.id == coordenador.id){
				$scope.list.coordenadores.splice(index, 1);
				coordenador.associar = $scope.associar.id;
				associarCoordenadorService.deleteItem(coordenador);
			}
		});
	}

  	/*--busca pelo nome do coordenador--*/
	$scope.search = function(event){
		if($scope.coordenador.nome != undefined && $scope.coordenador.nome.length >= 3){
			if(event.keyCode!=40&&event.keyCode!=38&&event.keyCode!=37&&event.keyCode!=39&&event.keyCode!=13&&event.keyCode!=27){
				$scope.coordenador.cidade = $scope.associar.cidade;
				coordenadorService.set($scope.coordenador);
				coordenadorService.checkname();
			}
			//keyPress down
			if(event.keyCode==40 && ($scope.currentSearch+1)<= $scope.coordenadores.results.length){
				$scope.setCurrentSearch($scope.currentSearch+1);
			}
			//keyPress up
			if(event.keyCode==38 && ($scope.currentSearch-1) >= 1){
				$scope.setCurrentSearch($scope.currentSearch-1);
			}
			//KeyPress enter
			if(event.keyCode==13) {
				$scope.addCoordenador($scope.coordenadores.results[$scope.currentSearch-1]);
				/*clear*/
				$scope.coordenadores.results = undefined;        
				$scope.coordenador.nome = undefined;
			}
			//KeyPress esc
			if(event.keyCode==27){
				$scope.closeAutocomplete();
			}
		}else{
			$scope.coordenadores.results = undefined;
		}
	}

	$scope.exitAutocomplete = function(event){
		/*clear*/
		$scope.coordenadores.results = undefined;
	}

	$scope.closeAutocomplete = function(){
		/*clear*/
		$scope.coordenadores.results = undefined;        
		$scope.coordenador.nome = undefined;
	}

	$scope.save = function() {
		/*set*/
		$scope.associar.coordenadores = $scope.list.coordenadores;
		associarCoordenadorService.set($scope.associar);
		associarCoordenadorService.save();
	};
	$scope.load = function() {
		associarCoordenadorService.set($scope.associar);
		associarCoordenadorService.load();
	};
	$scope.update = function() {
		/*set*/
		$scope.associar.action = 'update';
		$scope.associar.coordenadores = $scope.list.coordenadores;
		associarCoordenadorService.set($scope.associar);
		associarCoordenadorService.update();
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
