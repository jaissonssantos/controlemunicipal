app.controller('listCoordenadorController', ['$uibModal', '$location', '$rootScope', '$scope', '$routeParams', 'coordenadorService',
function($uibModal, $location, $rootScope, $scope, $routeParams, coordenadorService) {

	$scope.coordenadors = $scope.coordenador = {};
	$scope.results = {};
	$scope.checkedItens = [];
	$scope.modalItem = "";

	$scope.totalItems 	= 0;
	$scope.currentPage 	= 1;
	$scope.numPerPage 	= 10;
	$scope.entryLimit 	= 5;

	$rootScope.$on('coordenadors:message:success', function(event, message) {
		$rootScope.success = message;
	});

	$scope.$on("coordenadors", function(event, coordenadors){
		$scope.checkedItens = [];
		$scope.selectedAll = false;
		$scope.totalItems = coordenadors.count.results;
		$scope.coordenadors = coordenadors;
	});

	$scope.$on("coordenadors:loading", function(event, status){
		$scope.results.loading = status;
	});

	$scope.setTab = function(statusTab) {
		$scope.checkedItens = [];
		$scope.selectedAll = false;
		$scope.currentPage = 1;
		$scope.tab = statusTab;
		$scope.coordenador.offset = 0;
		$scope.coordenador.limit = $scope.numPerPage;
		$scope.coordenador.status = statusTab;
		coordenadorService.set($scope.coordenador);
		coordenadorService.getList();
	};

	$scope.search = function(){
		coordenadorService.set($scope.coordenador);
		coordenadorService.getList();
	};

	$scope.setStatus = function(status){
		coordenadorService.setIds($scope.checkedItens);
		coordenadorService.setStatus(status);
	};

	$scope.changePaginate = function(){
		$scope.coordenador.offset = ($scope.currentPage - 1) * $scope.numPerPage;
		$scope.coordenador.limit = $scope.numPerPage;
		coordenadorService.getList();
	};

	$scope.editCoordenador = function(adv){
		console.log(adv);
			coordenadorService.set(adv);
			coordenadorService.load();
			console.log($scope.coordenador);
			$location.path('/coordenador/add');
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
		angular.forEach($scope.coordenadors.results, function (item) {
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
	$scope.detalhes = function(coordenador){
		var modalInstance = $uibModal.open({
			templateUrl: 'views/coordenador/details.html',
			controller: function( $scope, $uibModalInstance, coordenadorRS ){
				$scope.coordenador = {};
				$scope.coordenador = coordenadorRS;
				$scope.cancel = function(){
					$uibModalInstance.dismiss('cancel');
				}
			},
			resolve: {
				coordenadorRS: function(){
					return coordenador;
				}
			}
		});
	}

	/* confirmação modal para excluir item */
	$scope.deleteconfirm = function(coodenadordelete){
		var modalInstance = $uibModal.open({
			templateUrl: 'views/confirm.html',
			controller: function ($scope, $uibModalInstance, coordenadors) {
				$scope.coordenador = coordenadors;
				$scope.modalItem =  "Deseja realmente excluir o coordenador: "+$scope.coordenador.nome+"?";
					      	
				$scope.ok = function () {
					$uibModalInstance.close($scope.coordenador);
				};

				$scope.cancel = function () {
					$uibModalInstance.dismiss('cancel');
				};
			},
			resolve: {
				coordenadors: function () {
				    return coodenadordelete;
				}
			}
		});
		modalInstance.result.then(function (coordenador) {
			coordenadorService.set(coordenador);
			coordenadorService.delete();
			coordenadorService.getList();
		}, function () {
		/* funcao ao cancelar ou fechar o modal */
		});

	};

}]);