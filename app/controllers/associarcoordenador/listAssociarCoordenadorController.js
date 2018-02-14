app.controller('listAssociarCoordenadorController', ['$rootScope', '$scope', '$uibModal', 'associarCoordenadorService',
function($rootScope, $scope, $uibModal, associarCoordenadorService) {

	//javascript active item in menu
	$( document ).ready(function() {
		$('[data-slug="subnav-advogado"]').parent('li').addClass('active');
	});

	$scope.associarcoordenadores = $scope.associarcoordenador = {};
	$scope.associarcoordenador.searchtype = 0;
	$scope.results = {};
	$scope.checkedItens = [];
	$scope.modalItem = "";

	$scope.totalItems 	= 0;
	$scope.currentPage 	= 1;
	$scope.numPerPage 	= 10;
	$scope.entryLimit 	= 5;

	$rootScope.$on('associarcoordenadores:message:success', function(event, message) {
		$rootScope.success = message;
	});

	$scope.$on("associarcoordenadores", function(event, associarcoordenadores){
		$scope.checkedItens = [];
		$scope.selectedAll = false;
		$scope.totalItems = associarcoordenadores.count.results;
		$scope.associarcoordenadores = associarcoordenadores;
	});

	$scope.$on("associarcoordenadores:loading", function(event, status){
		$scope.results.loading = status;
	});

	$scope.setTab = function(statusTab) {
		$scope.checkedItens = [];
		$scope.selectedAll = false;
		$scope.currentPage = 1;
		$scope.tab = statusTab;
		$scope.associarcoordenador.offset = 0;
		$scope.associarcoordenador.limit = $scope.numPerPage;
		$scope.associarcoordenador.status = statusTab;
		associarCoordenadorService.set($scope.associarcoordenador);
		associarCoordenadorService.getList();
	};

	$scope.search = function(){
		associarCoordenadorService.set($scope.associarcoordenador);
		associarCoordenadorService.getList();
	};

	$scope.setStatus = function(status){
		associarCoordenadorService.setIds($scope.checkedItens);
		associarCoordenadorService.setStatus(status);
	};

	$scope.changePaginate = function(){
		$scope.associarcoordenador.offset = ($scope.currentPage - 1) * $scope.numPerPage;
		$scope.associarcoordenador.limit = $scope.numPerPage;
		associarCoordenadorService.getList();
	};


	$scope.checkItem = function (item) {
		if(item.selected){
			$scope.checkedItens.push(item.id);
		}else{
			var index = $scope.checkedItens.indexOf(item.id);
			$scope.checkedItens.splice(index, 1);
		}
	};

	$scope.checkAll = function () {
		$scope.selectedAll = !$scope.selectedAll;
		angular.forEach($scope.associarcoordenadores.results, function (item) {
			item.selected = $scope.selectedAll;
			if(item.selected){
				$scope.checkedItens.push(item.id);
			}else{
				var index = $scope.checkedItens.indexOf(item.id);
				$scope.checkedItens.splice(index, 1);
			}
		});
	};

	//modal detais
	$scope.details = function(coordenador){
		var modalInstance = $uibModal.open({
			templateUrl: 'views/associarcoordenador/details.html',
			controller: 'detailsAssociarCoordenadorController',
			resolve: {
				coordenador: function(){
					return coordenador;
				}
			}
		});
	}

}]);