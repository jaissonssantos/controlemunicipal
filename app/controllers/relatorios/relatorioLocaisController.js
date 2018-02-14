app.controller('relatorioLocaisController', ['$http', '$uibModal', '$location', '$rootScope', '$scope', '$routeParams', 'cidadeService', 'relatorioService', 'locaisService',
function($http, $uibModal, $location, $rootScope, $scope, $routeParams, cidadeService, relatorioService, locaisService) {

  $scope.regional = "";
  $scope.cargo = "";
	$scope.cidade = $scope.cidades = {};
  $scope.locais = {};
  $scope.local = undefined;
  $scope.localC = {};
  $scope.locvotacao = {};
  $scope.results = {};
  $scope.cid = [];
  $scope.mostra = false;
  $scope.municipio = undefined;
  $scope.qtdadv = 0;
  $scope.qtdcoo = 0;
  $scope.qtddel = 0;
  $scope.qtdfis = 0;

	$rootScope.$on('cidade', function(event, cidade) {
		$scope.cidade = cidade;
	});

  $rootScope.$on('municipio', function(event, municipio) {
    $scope.municipio = municipio;
  });

  $scope.$on("locais", function(event, locais){
    $scope.locais = locais;
  });

  $scope.$on("localC", function(event, localC){
    $scope.localC = localC;
  });

  $scope.$on("localC:loading", function(event, status){
    $scope.results.loading = status;
  });

	$scope.loadCidades = function(){
    $scope.mostra = false;
		cidadeService.getList();
	};

  $scope.loadLocais = function(){
    $scope.mostra = false;
    relatorioService.getLocais($scope.municipio.id);
  };

  $scope.pegaLocal = function(local){
    $scope.localC = local;
  }

  $scope.gerar = function(){
    $scope.mostra = true;
    relatorioService.getLocal($scope.local.local, $scope.local.idmunicipio);
    $scope.pegaLocal($scope.localC);
  }

}]);