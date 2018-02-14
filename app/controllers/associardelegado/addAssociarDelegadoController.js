
app.controller('addAssociarDelegadoController', ['$rootScope', '$scope', '$routeParams', '$location', 'associarDelegadoService', 'locaisService', 'cidadeService', 'delegadoService', 
	function($rootScope, $scope, $routeParams, $location, associarDelegadoService, locaisService, cidadeService, delegadoService){

	/*variables*/	
	$scope.associar = {
		id: $routeParams.id
	};
	$scope.list = {
		delegados: []
	}
	$scope.results = {
		associados: {
			loading: false
		}
	};
	$scope.associados = $scope.associados = {};
	$scope.delegado = $scope.delegados = {};
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

	$rootScope.$on('associardelegado', function(event, associar) {
		$scope.associar = associar;
		if(!$scope.associar.action){
			if(associar.delegados!=undefined) $scope.list.delegados=associar.delegados;
			if(associar.local!=undefined) $scope.loadLocais();
		}
	});

	$rootScope.$on('delegado:name', function(event, delegados) {
		$scope.delegados = delegados;
	});

	$scope.$on("delegados:loading", function(event, status){
		$scope.results.loading = status;
	});

	$rootScope.$on('associado:delete', function(event, associados) {
		$scope.associados = associados;
	});

	$scope.$on("associados:loading", function(event, status){
		$scope.results.associados.loading = status;
	});

	$rootScope.$on('associardelegado:save', function(event, status) {
	    $scope.status = {
	      loading: (status == 'loading'),
	      success: (status == 'success'),
	      error: (status == 'error')
	    };
		if($scope.status.success){
			$location.path('/associar/delegado');
		}
  	});

  	$rootScope.$on('associardelegado:update', function(event, status) {
	    $scope.status = {
	      loading: (status == 'loading'),
	      success: (status == 'success'),
	      error: (status == 'error')
	    };
		if($scope.status.success){
			$location.path('/associar/delegado');
		}
  	});

  	$scope.addDelegado = function(delegado){
  		var exists = 0;
  		$scope.list.delegados.forEach(function(delegados){
  			if(delegados.id == delegado.id) exists = 1;
  		});
  		if(!exists){ 
			$scope.list.delegados.push(delegado);
		}
	};

	$scope.delDelegado = function(delegado){
		$scope.list.delegados.forEach(function(selected, index){
			if(selected.id == delegado.id){
				$scope.list.delegados.splice(index, 1);
				delegado.associar = $scope.associar.id;
				associarDelegadoService.deleteItem(delegado);
			}
		});
	}

  	/*--busca pelo nome do delegado--*/
	$scope.search = function(event){
		if($scope.delegado.nome != undefined && $scope.delegado.nome.length >= 3){
			if(event.keyCode!=40&&event.keyCode!=38&&event.keyCode!=37&&event.keyCode!=39&&event.keyCode!=13&&event.keyCode!=27){
				$scope.delegado.cidade = $scope.associar.cidade;
				delegadoService.set($scope.delegado);
				delegadoService.checkname();
			}
			//keyPress down
			if(event.keyCode==40 && ($scope.currentSearch+1)<= $scope.delegados.results.length){
				$scope.setCurrentSearch($scope.currentSearch+1);
			}
			//keyPress up
			if(event.keyCode==38 && ($scope.currentSearch-1) >= 1){
				$scope.setCurrentSearch($scope.currentSearch-1);
			}
			//KeyPress enter
			if(event.keyCode==13) {
				$scope.addDelegado($scope.delegados.results[$scope.currentSearch-1]);
				/*clear*/
				$scope.delegados.results = undefined;        
				$scope.delegado.nome = undefined;
			}
			//KeyPress esc
			if(event.keyCode==27){
				$scope.closeAutocomplete();
			}
		}else{
			$scope.delegados.results = undefined;
		}
	}

	$scope.exitAutocomplete = function(event){
		/*clear*/
		$scope.delegados.results = undefined;
	}

	$scope.closeAutocomplete = function(){
		/*clear*/
		$scope.delegados.results = undefined;        
		$scope.delegado.nome = undefined;
	}

	$scope.save = function() {
		/*set*/
		$scope.associar.delegados = $scope.list.delegados;
		associarDelegadoService.set($scope.associar);
		associarDelegadoService.save();
	};
	$scope.load = function() {
		associarDelegadoService.set($scope.associar);
		associarDelegadoService.load();
	};
	$scope.update = function() {
		/*set*/
		$scope.associar.action = 'update';
		$scope.associar.delegados = $scope.list.delegados;
		associarDelegadoService.set($scope.associar);
		associarDelegadoService.update();
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
