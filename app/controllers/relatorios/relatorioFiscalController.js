app.controller('relatorioFiscalController', ['$http', '$uibModal', '$location', '$rootScope', '$scope', '$routeParams', 'cidadeService', 'relatorioService',
function($http, $uibModal, $location, $rootScope, $scope, $routeParams, cidadeService, relatorioService) {

	$scope.cidade = $scope.cidades = {};
  $scope.locais = $scope.local = {};
  $scope.results = {};
  $scope.cid = undefined;
  $scope.municipio = undefined;

	$rootScope.$on('cidade', function(event, cidade) {
		$scope.cidade = cidade;
	});

  $rootScope.$on('municipio', function(event, municipio) {
    $scope.municipio = municipio;
  });

  $scope.$on("locais", function(event, locais){
    $scope.locais = locais;
  });

  $scope.$on("locais:loading", function(event, status){
    $scope.results.loading = status;
  });

	$scope.loadCidades = function(){
		cidadeService.getList();
	};

  $scope.setCidade = function(i){
    cidadeService.pegaCidade($scope.cid);
    relatorioService.set($scope.cid);
    relatorioService.getListFiscais();
  }

}]);