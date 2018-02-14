app.controller('listDelegadoController', ['$uibModal', '$location', '$rootScope', '$scope', '$routeParams', 'delegadoService',
function($uibModal, $location, $rootScope, $scope, $routeParams, delegadoService) {

	$scope.delegados = $scope.delegado = {};
	$scope.results = {};
	$scope.checkedItens = [];
	$scope.modalItem = "";

	$scope.totalItems 	= 0;
	$scope.currentPage 	= 1;
	$scope.numPerPage 	= 10;
	$scope.entryLimit 	= 5;

	$rootScope.$on('delegados:message:success', function(event, message) {
		$rootScope.success = message;
	});

	$scope.$on("delegados", function(event, delegados){
		$scope.checkedItens = [];
		$scope.selectedAll = false;
		$scope.totalItems = delegados.count.results;
		$scope.delegados = delegados;
	});

	$scope.$on("delegados:loading", function(event, status){
		$scope.results.loading = status;
	});

	$scope.setTab = function(statusTab) {
		$scope.checkedItens = [];
		$scope.selectedAll = false;
		$scope.currentPage = 1;
		$scope.tab = statusTab;
		$scope.delegado.offset = 0;
		$scope.delegado.limit = $scope.numPerPage;
		$scope.delegado.status = statusTab;
		delegadoService.set($scope.delegado);
		delegadoService.getList();
	};

	$scope.search = function(){
		delegadoService.set($scope.delegado);
		delegadoService.getList();
	};

	$scope.setStatus = function(status){
		delegadoService.setIds($scope.checkedItens);
		delegadoService.setStatus(status);
	};

	$scope.changePaginate = function(){
		$scope.delegado.offset = ($scope.currentPage - 1) * $scope.numPerPage;
		$scope.delegado.limit = $scope.numPerPage;
		delegadoService.getList();
	};

	$scope.editdelegado = function(adv){
		console.log(adv);
			delegadoService.set(adv);
			delegadoService.load();
			console.log($scope.delegado);
			$location.path('/delegado/add');
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
		angular.forEach($scope.delegados.results, function (item) {
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
	$scope.detalhes = function(delegado){
		var modalInstance = $uibModal.open({
			templateUrl: 'views/delegado/details.html',
			controller: function( $scope, $uibModalInstance, delegadoRS ){
				$scope.delegado = {};
				$scope.delegado = delegadoRS;
				$scope.cancel = function(){
					$uibModalInstance.dismiss('cancel');
				}
			},
			resolve: {
				delegadoRS: function(){
					return delegado;
				}
			}
		});
	}

	/* confirmação modal para excluir item */
	$scope.deleteconfirm = function(delegadodelete){
		var modalInstance = $uibModal.open({
			templateUrl: 'views/confirm.html',
			controller: function ($scope, $uibModalInstance, delegados) {
				$scope.delegado = delegados;
				$scope.modalItem =  "Deseja realmente excluir o delegado: "+$scope.delegado.nome+"?";
					      	
				$scope.ok = function () {
					$uibModalInstance.close($scope.delegado);
				};

				$scope.cancel = function () {
					$uibModalInstance.dismiss('cancel');
				};
			},
			resolve: {
				delegados: function () {
				    return delegadodelete;
				}
			}
		});
		modalInstance.result.then(function (delegado) {
			delegadoService.set(delegado);
			delegadoService.delete();
			delegadoService.getList();
		}, function () {
		/* funcao ao cancelar ou fechar o modal */
		});

	};

}]);