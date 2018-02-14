app.controller('relatorioRegionalRBController', ['$http', '$uibModal', '$location', '$rootScope', '$scope', '$routeParams', 'cidadeService', 'relatorioService',
function($http, $uibModal, $location, $rootScope, $scope, $routeParams, cidadeService, relatorioService) {

  $scope.regional = undefined;
  $scope.cargo = undefined;
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

  $scope.changeVoluntario = function(){
    $scope.locais = undefined;
  };

  $scope.gerar = function(){
    relatorioService.getListRegionaisRB($scope.regional, $scope.cargo);
  }

}]);