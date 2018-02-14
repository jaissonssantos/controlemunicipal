app.controller('listAssociarDelegadoController', ['$rootScope', '$scope', '$uibModal', 'associarDelegadoService',
function($rootScope, $scope, $uibModal, associarDelegadoService) {

	//javascript active item in menu
	$( document ).ready(function() {
		$('[data-slug="subnav-advogado"]').parent('li').addClass('active');
	});

	$scope.associardelegados = $scope.associardelegado = {};
	$scope.associardelegado.searchtype = 0;
	$scope.results = {};
	$scope.checkedItens = [];
	$scope.modalItem = "";

	$scope.totalItems 	= 0;
	$scope.currentPage 	= 1;
	$scope.numPerPage 	= 10;
	$scope.entryLimit 	= 5;

	$rootScope.$on('associardelegados:message:success', function(event, message) {
		$rootScope.success = message;
	});

	$scope.$on("associardelegados", function(event, associardelegados){
		$scope.checkedItens = [];
		$scope.selectedAll = false;
		$scope.totalItems = associardelegados.count.results;
		$scope.associardelegados = associardelegados;
	});

	$scope.$on("associardelegados:loading", function(event, status){
		$scope.results.loading = status;
	});

	$scope.setTab = function(statusTab) {
		$scope.checkedItens = [];
		$scope.selectedAll = false;
		$scope.currentPage = 1;
		$scope.tab = statusTab;
		$scope.associardelegado.offset = 0;
		$scope.associardelegado.limit = $scope.numPerPage;
		$scope.associardelegado.status = statusTab;
		associarDelegadoService.set($scope.associardelegado);
		associarDelegadoService.getList();
	};

	$scope.search = function(){
		associarDelegadoService.set($scope.associardelegado);
		associarDelegadoService.getList();
	};

	$scope.setStatus = function(status){
		associarDelegadoService.setIds($scope.checkedItens);
		associarDelegadoService.setStatus(status);
	};

	$scope.changePaginate = function(){
		$scope.associardelegado.offset = ($scope.currentPage - 1) * $scope.numPerPage;
		$scope.associardelegado.limit = $scope.numPerPage;
		associarDelegadoService.getList();
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
		angular.forEach($scope.associardelegados.results, function (item) {
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
	$scope.details = function(delegado){
		var modalInstance = $uibModal.open({
			templateUrl: 'views/associardelegado/details.html',
			controller: 'detailsAssociarDelegadoController',
			resolve: {
				delegado: function(){
					return delegado;
				}
			}
		});
	}

}]);