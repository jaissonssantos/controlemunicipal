app.controller('listUsuarioController', ['$uibModal', '$location', '$rootScope', '$scope', '$routeParams', 'usuarioService',
function($uibModal, $location, $rootScope, $scope, $routeParams, usuarioService) {

	$scope.usuarios = $scope.usuario = {};
	$scope.results = {};
	$scope.checkedItens = [];
	$scope.modalItem = "";

	$scope.totalItems 	= 0;
	$scope.currentPage 	= 1;
	$scope.numPerPage 	= 10;
	$scope.entryLimit 	= 5;

	$rootScope.$on('usuarios:message:success', function(event, message) {
		$rootScope.success = message;
	});

	$rootScope.$on('usuarios:message:error', function(event, message) {
		$rootScope.error = message;
	});

	$scope.$on("usuarios", function(event, usuarios){
		$scope.checkedItens = [];
		$scope.selectedAll = false;
		$scope.totalItems = usuarios.count.results;
		$scope.usuarios = usuarios;
	});

	$scope.$on("usuarios:loading", function(event, status){
		$scope.results.loading = status;
	});

	$scope.setTab = function(statusTab) {
		$scope.checkedItens = [];
		$scope.selectedAll = false;
		$scope.currentPage = 1;
		$scope.tab = statusTab;
		$scope.usuario.offset = 0;
		$scope.usuario.limit = $scope.numPerPage;
		$scope.usuario.status = statusTab;
		usuarioService.set($scope.usuario);
		usuarioService.getList();
	};

	$scope.search = function(){
		usuarioService.set($scope.usuario);
		usuarioService.getList();
	};

	$scope.setStatus = function(status){
		usuarioService.setIds($scope.checkedItens);
		usuarioService.setStatus(status);
	};

	$scope.changePaginate = function(){
		$scope.usuario.offset = ($scope.currentPage - 1) * $scope.numPerPage;
		$scope.usuario.limit = $scope.numPerPage;
		usuarioService.getList();
	};

	$scope.editcandidato = function(adv){
		usuarioService.set(adv);
		usuarioService.load();
		console.log($scope.candidato);
		$location.path('/usuario/add');
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
		angular.forEach($scope.usuarios.results, function (item) {
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
	$scope.detalhes = function(usuario){
		var modalInstance = $uibModal.open({
			templateUrl: 'views/usuario/details.html',
			controller: 'detailsUsuarioController',
			resolve: {
				usuario: function(){
					return usuario;
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
			usuarioService.set(candidato);
			usuarioService.delete();
			usuarioService.getList();
		}, function () {
		/* funcao ao cancelar ou fechar o modal */
		});

	};

}]);