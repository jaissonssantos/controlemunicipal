
app.controller('relatorioVoluntariosController', ['$rootScope', '$scope', '$routeParams', '$location', 'relatorioService', 
	function($rootScope, $scope, $routeParams, $location, relatorioService){

	/*variables*/
	$scope.pessoas = {};
	$scope.cargo = undefined;	
	$scope.local = $scope.locais = {};
	$scope.search = undefined;
	$scope.currentSearch = 1;

	// Retira o autocomplete
	$scope.completing = false;

	$rootScope.$on('local', function(event, local) {
		$scope.local = local;
	});

	$rootScope.$on('locais', function(event, locais) {
		$scope.locais = locais;
	});

	$rootScope.$on('pessoas', function(event, pessoas) {
		$scope.pessoas = pessoas;
	});

	$scope.addPessoa = function(pessoa){
		relatorioService.getListLocais(pessoa.id, $scope.cargo);
		$scope.search = "";
		$scope.completing = false;
		$scope.pessoa = undefined;
		$scope.pessoas = undefined;
		$scope.locais = undefined;
	};

	$scope.limpa = function(){
		$scope.search = "";
		$scope.completing = false;
		$scope.pessoa = undefined;
		$scope.pessoas = undefined;
		$scope.locais = undefined;
	};

	$scope.pesquisar =  function(event){
		if($scope.search != undefined && $scope.search.length >= 3){
			if(event.keyCode!=40&&event.keyCode!=38&&event.keyCode!=37&&event.keyCode!=39&&event.keyCode!=13&&event.keyCode!=27){
				relatorioService.checkname($scope.cargo, $scope.search);
				// Coloca o autocomplemento
				$scope.completing = true;
			}
			//keyPress down
			if(event.keyCode==40 && ($scope.currentSearch+1)<= $scope.pessoas.length){
				$scope.setCurrentSearch($scope.currentSearch+1);
			}
			//keyPress up
			if(event.keyCode==38 && ($scope.currentSearch-1) >= 1){
				$scope.setCurrentSearch($scope.currentSearch-1);
			}
			//KeyPress enter
			if(event.keyCode==13) {
				$scope.addPessoa($scope.pessoas[$scope.currentSearch-1]);
				/*clear*/
				$scope.pessoas = undefined;        
				$scope.search = undefined;
			}
		}else{
			$scope.pessoas = undefined;
			$scope.completing = false;
			$scope.locais = undefined;
		}
		if(event.keyCode==27 || event.keyCode==8 ){
			$scope.search = "";
			$scope.pessoas = undefined;
			$scope.completing = false;
			$scope.locais = undefined;
		}
	};

	$scope.closeAutocomplete = function(){
		/*clear*/
		$scope.pessoas = undefined;        
		$scope.search = undefined;
	}

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
