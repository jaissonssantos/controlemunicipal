app.controller('listAdvogadoController', ['$uibModal', '$location', '$rootScope', '$scope', '$routeParams', 'advogadoService',
function($uibModal, $location, $rootScope, $scope, $routeParams, advogadoService) {

	//javascript active item in menu
	$( document ).ready(function() {
		$('[data-slug="subnav-advogado"]').parent('li').addClass('active');
	});

	$scope.advogados = $scope.advogado = {};
	$scope.results = {};
	$scope.checkedItens = [];
	$scope.modalItem = "";

	$scope.totalItems 	= 0;
	$scope.currentPage 	= 1;
	$scope.numPerPage 	= 10;
	$scope.entryLimit 	= 5;

	$rootScope.$on('advogados:message:success', function(event, message) {
		$rootScope.success = message;
	});

	$scope.$on("advogados", function(event, advogados){
		$scope.checkedItens = [];
		$scope.selectedAll = false;
		$scope.totalItems = advogados.count.results;
		$scope.advogados = advogados;
	});

	$scope.$on("advogados:loading", function(event, status){
		$scope.results.loading = status;
	});

	$scope.setTab = function(statusTab) {
		$scope.checkedItens = [];
		$scope.selectedAll = false;
		$scope.currentPage = 1;
		$scope.tab = statusTab;
		$scope.advogado.offset = 0;
		$scope.advogado.limit = $scope.numPerPage;
		$scope.advogado.status = statusTab;
		advogadoService.set($scope.advogado);
		advogadoService.getList();
	};

	$scope.search = function(){
		advogadoService.set($scope.advogado);
		advogadoService.getList();
	};

	$scope.setStatus = function(status){
		advogadoService.setIds($scope.checkedItens);
		advogadoService.setStatus(status);
	};

	$scope.changePaginate = function(){
		$scope.advogado.offset = ($scope.currentPage - 1) * $scope.numPerPage;
		$scope.advogado.limit = $scope.numPerPage;
		advogadoService.getList();
	};

	$scope.editAdvogado = function(adv){
		advogadoService.set(adv);
		advogadoService.load();
		$location.path('/advogado/add');
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
		angular.forEach($scope.advogados.results, function (item) {
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
	$scope.detalhes = function(advogado){
		var modalInstance = $uibModal.open({
			templateUrl: 'views/advogado/details.html',
			controller: function( $scope, $uibModalInstance, advogadoRS ){
				$scope.advogado = {};
				$scope.advogado = advogadoRS;
				$scope.cancel = function(){
					$uibModalInstance.dismiss('cancel');
				}
			},
			resolve: {
				advogadoRS: function(){
					return advogado;
				}
			}
		});
	}

	/* confirmação modal para excluir item */
	$scope.deleteconfirm = function(advogadodelete){
		var modalInstance = $uibModal.open({
			templateUrl: 'views/confirm.html',
			controller: function ($scope, $uibModalInstance, advogados) {
				$scope.advogado = advogados;
				$scope.modalItem =  "Deseja realmente excluir o advogado: "+$scope.advogado.nome+"?";
					      	
				$scope.ok = function () {
					$uibModalInstance.close($scope.advogado);
				};

				$scope.cancel = function () {
					$uibModalInstance.dismiss('cancel');
				};
			},
			resolve: {
				advogados: function () {
				    return advogadodelete;
				}
			}
		});
		modalInstance.result.then(function (advogado) {
			advogadoService.set(advogado);
			advogadoService.delete();
			advogadoService.getList();
		}, function () {
		/* funcao ao cancelar ou fechar o modal */
		});

	};

}]);