app.controller('listAssociarAdvogadoController', ['$rootScope', '$scope', '$uibModal', 'associarAdvogadoService',
function($rootScope, $scope, $uibModal, associarAdvogadoService) {

	//javascript active item in menu
	$( document ).ready(function() {
		$('[data-slug="subnav-advogado"]').parent('li').addClass('active');
	});

	$scope.associaradvogados = $scope.associaradvogado = {};
	$scope.results = {};
	$scope.checkedItens = [];
	$scope.modalItem = "";

	$scope.totalItems 	= 0;
	$scope.currentPage 	= 1;
	$scope.numPerPage 	= 10;
	$scope.entryLimit 	= 5;

	$rootScope.$on('associaradvogados:message:success', function(event, message) {
		$rootScope.success = message;
	});

	$scope.$on("associaradvogados", function(event, associaradvogados){
		$scope.checkedItens = [];
		$scope.selectedAll = false;
		$scope.totalItems = associaradvogados.count.results;
		$scope.associaradvogados = associaradvogados;
	});

	$scope.$on("associaradvogados:loading", function(event, status){
		$scope.results.loading = status;
	});

	$scope.setTab = function(statusTab) {
		$scope.checkedItens = [];
		$scope.selectedAll = false;
		$scope.currentPage = 1;
		$scope.tab = statusTab;
		$scope.associaradvogado.offset = 0;
		$scope.associaradvogado.limit = $scope.numPerPage;
		$scope.associaradvogado.status = statusTab;
		associarAdvogadoService.set($scope.associaradvogado);
		associarAdvogadoService.getList();
	};

	$scope.search = function(){
		associarAdvogadoService.set($scope.associaradvogado);
		associarAdvogadoService.getList();
	};

	$scope.setStatus = function(status){
		associarAdvogadoService.setIds($scope.checkedItens);
		associarAdvogadoService.setStatus(status);
	};

	$scope.changePaginate = function(){
		$scope.associaradvogado.offset = ($scope.currentPage - 1) * $scope.numPerPage;
		$scope.associaradvogado.limit = $scope.numPerPage;
		associarAdvogadoService.getList();
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
		angular.forEach($scope.associaradvogados.results, function (item) {
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
	$scope.details = function(advogado){
		var modalInstance = $uibModal.open({
			templateUrl: 'views/associaradvogado/details.html',
			controller: 'detailsAssociarAdvogadoController',
			resolve: {
				advogado: function(){
					return advogado;
				}
			}
		});
	}

}]);