app.controller('listCandidatoController', ['$uibModal', '$location', '$rootScope', '$scope', '$routeParams', 'candidatoService',
function($uibModal, $location, $rootScope, $scope, $routeParams, candidatoService) {

	$scope.candidatos = $scope.candidato = {};
	$scope.results = {};
	$scope.checkedItens = [];
	$scope.modalItem = "";

	$scope.totalItems 	= 0;
	$scope.currentPage 	= 1;
	$scope.numPerPage 	= 10;
	$scope.entryLimit 	= 5;

	$rootScope.$on('candidatos:message:success', function(event, message) {
		$rootScope.success = message;
	});

	$scope.$on("candidatos", function(event, candidatos){
		$scope.checkedItens = [];
		$scope.selectedAll = false;
		$scope.totalItems = candidatos.count.results;
		$scope.candidatos = candidatos;
	});

	$scope.$on("candidatos:loading", function(event, status){
		$scope.results.loading = status;
	});

	$scope.setTab = function(statusTab) {
		$scope.checkedItens = [];
		$scope.selectedAll = false;
		$scope.currentPage = 1;
		$scope.tab = statusTab;
		$scope.candidato.offset = 0;
		$scope.candidato.limit = $scope.numPerPage;
		$scope.candidato.status = statusTab;
		candidatoService.set($scope.candidato);
		candidatoService.getList();
	};

	$scope.search = function(){
		candidatoService.set($scope.candidato);
		candidatoService.getList();
	};

	$scope.setStatus = function(status){
		candidatoService.setIds($scope.checkedItens);
		candidatoService.setStatus(status);
	};

	$scope.changePaginate = function(){
		$scope.candidato.offset = ($scope.currentPage - 1) * $scope.numPerPage;
		$scope.candidato.limit = $scope.numPerPage;
		candidatoService.getList();
	};

	$scope.editcandidato = function(adv){
		console.log(adv);
			candidatoService.set(adv);
			candidatoService.load();
			console.log($scope.candidato);
			$location.path('/candidato/add');
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
		angular.forEach($scope.candidatos.results, function (item) {
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
	$scope.detalhes = function(candidato){
		var modalInstance = $uibModal.open({
			templateUrl: 'views/candidato/details.html',
			controller: function( $scope, $uibModalInstance, candidatoRS ){
				$scope.candidato = {};
				$scope.candidato = candidatoRS;
				$scope.cancel = function(){
					$uibModalInstance.dismiss('cancel');
				}
			},
			resolve: {
				candidatoRS: function(){
					return candidato;
				}
			}
		});
	}

	/* confirmação modal para excluir item */
	$scope.deleteconfirm = function(candidatodelete){
		var modalInstance = $uibModal.open({
			templateUrl: 'views/confirm.html',
			controller: function ($scope, $uibModalInstance, candidatos) {
				$scope.candidato = candidatos;
				$scope.modalItem =  "Deseja realmente excluir o candidato: "+$scope.candidato.nome+"?";
					      	
				$scope.ok = function () {
					$uibModalInstance.close($scope.candidato);
				};

				$scope.cancel = function () {
					$uibModalInstance.dismiss('cancel');
				};
			},
			resolve: {
				candidatos: function () {
				    return candidatodelete;
				}
			}
		});
		modalInstance.result.then(function (candidato) {
			candidatoService.set(candidato);
			candidatoService.delete();
			candidatoService.getList();
		}, function () {
		/* funcao ao cancelar ou fechar o modal */
		});

	};

}]);