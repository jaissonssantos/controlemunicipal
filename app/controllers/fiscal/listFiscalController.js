app.controller('listFiscalController', ['$uibModal', '$location', '$rootScope', '$scope', '$routeParams', 'fiscalService',
function($uibModal, $location, $rootScope, $scope, $routeParams, fiscalService) {

	$scope.fiscals = $scope.fiscal = {};
	$scope.results = {};
	$scope.checkedItens = [];
	$scope.modalItem = "";

	$scope.totalItems 	= 0;
	$scope.currentPage 	= 1;
	$scope.numPerPage 	= 10;
	$scope.entryLimit 	= 5;

	$rootScope.$on('fiscals:message:success', function(event, message) {
		$rootScope.success = message;
	});

	$scope.$on("fiscals", function(event, fiscals){
		$scope.checkedItens = [];
		$scope.selectedAll = false;
		$scope.totalItems = fiscals.count.results;
		$scope.fiscals = fiscals;
	});

	$scope.$on("fiscals:loading", function(event, status){
		$scope.results.loading = status;
	});

	$scope.setTab = function(statusTab) {
		$scope.checkedItens = [];
		$scope.selectedAll = false;
		$scope.currentPage = 1;
		$scope.tab = statusTab;
		$scope.fiscal.offset = 0;
		$scope.fiscal.limit = $scope.numPerPage;
		$scope.fiscal.status = statusTab;
		fiscalService.set($scope.fiscal);
		fiscalService.getList();
	};

	$scope.search = function(){
		fiscalService.set($scope.fiscal);
		fiscalService.getList();
	};

	$scope.setStatus = function(status){
		fiscalService.setIds($scope.checkedItens);
		fiscalService.setStatus(status);
	};

	$scope.changePaginate = function(){
		$scope.fiscal.offset = ($scope.currentPage - 1) * $scope.numPerPage;
		$scope.fiscal.limit = $scope.numPerPage;
		fiscalService.getList();
	};

	$scope.editfiscal = function(adv){
		console.log(adv);
			fiscalService.set(adv);
			fiscalService.load();
			console.log($scope.fiscal);
			$location.path('/fiscal/add');
		}

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
		angular.forEach($scope.fiscals.results, function (item) {
			item.selected = $scope.selectedAll;
			if(item.selected){
				$scope.checkedItens.push(item.id);
			}else{
				var index = $scope.checkedItens.indexOf(item.id);
				$scope.checkedItens.splice(index, 1);
			}
		});
	};

	//modal detahes
	$scope.detalhes = function(fiscal){
		var modalInstance = $uibModal.open({
			templateUrl: 'views/fiscal/details.html',
			controller: function( $scope, $uibModalInstance, fiscalRS ){
				$scope.fiscal = {};
				$scope.fiscal = fiscalRS;
				$scope.cancel = function(){
					$uibModalInstance.dismiss('cancel');
				}
			},
			resolve: {
				fiscalRS: function(){
					return fiscal;
				}
			}
		});
	}

	/* confirmação modal para excluir item */
	$scope.deleteconfirm = function(fiscaldelete){
		var modalInstance = $uibModal.open({
			templateUrl: 'views/confirm.html',
			controller: function ($scope, $uibModalInstance, fiscals) {
				$scope.fiscal = fiscals;
				$scope.modalItem =  "Deseja realmente excluir o fiscal: "+$scope.fiscal.nome+"?";
					      	
				$scope.ok = function () {
					$uibModalInstance.close($scope.fiscal);
				};

				$scope.cancel = function () {
					$uibModalInstance.dismiss('cancel');
				};
			},
			resolve: {
				fiscals: function () {
				    return fiscaldelete;
				}
			}
		});
		modalInstance.result.then(function (fiscal) {
			fiscalService.set(fiscal);
			fiscalService.delete();
			fiscalService.getList();
		}, function () {
		/* funcao ao cancelar ou fechar o modal */
		});

	};

}]);