app.controller('listAssociarFiscalController', ['$rootScope', '$scope', '$uibModal', 'associarFiscalService',
function($rootScope, $scope, $uibModal, associarFiscalService) {

	//javascript active item in menu
	$( document ).ready(function() {
		$('[data-slug="subnav-advogado"]').parent('li').addClass('active');
	});

	$scope.associarfiscais = $scope.associarfiscal = {};
	$scope.associarfiscal.searchtype = 0;
	$scope.results = {};
	$scope.checkedItens = [];
	$scope.modalItem = "";

	$scope.totalItems 	= 0;
	$scope.currentPage 	= 1;
	$scope.numPerPage 	= 10;
	$scope.entryLimit 	= 5;

	$rootScope.$on('associarfiscais:message:success', function(event, message) {
		$rootScope.success = message;
	});

	$scope.$on("associarfiscais", function(event, associarfiscais){
		$scope.checkedItens = [];
		$scope.selectedAll = false;
		$scope.totalItems = associarfiscais.count.results;
		$scope.associarfiscais = associarfiscais;
	});

	$scope.$on("associarfiscais:loading", function(event, status){
		$scope.results.loading = status;
	});

	$scope.setTab = function(statusTab) {
		$scope.checkedItens = [];
		$scope.selectedAll = false;
		$scope.currentPage = 1;
		$scope.tab = statusTab;
		$scope.associarfiscal.offset = 0;
		$scope.associarfiscal.limit = $scope.numPerPage;
		$scope.associarfiscal.status = statusTab;
		associarFiscalService.set($scope.associarfiscal);
		associarFiscalService.getList();
	};

	$scope.search = function(){
		associarFiscalService.set($scope.associarfiscal);
		associarFiscalService.getList();
	};

	$scope.setStatus = function(status){
		associarFiscalService.setIds($scope.checkedItens);
		associarFiscalService.setStatus(status);
	};

	$scope.changePaginate = function(){
		$scope.associarfiscal.offset = ($scope.currentPage - 1) * $scope.numPerPage;
		$scope.associarfiscal.limit = $scope.numPerPage;
		associarFiscalService.getList();
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
		angular.forEach($scope.associarfiscais.results, function (item) {
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
	$scope.details = function(fiscal){
		var modalInstance = $uibModal.open({
			templateUrl: 'views/associarfiscal/details.html',
			controller: 'detailsAssociarFiscalController',
			resolve: {
				fiscal: function(){
					return fiscal;
				}
			}
		});
	}

}]);