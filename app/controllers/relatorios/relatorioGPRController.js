app.controller('relatorioGPRController', ['$http', '$uibModal', '$location', '$rootScope', '$scope', '$routeParams', 'relatorioService',
function($http, $uibModal, $location, $rootScope, $scope, $routeParams, relatorioService) {

  $scope.regional = undefined;
  $scope.cargo = undefined;
  $scope.locais = $scope.local = {};
  $scope.results = {};

  $scope.mostra = false;

  $scope.$on("locais", function(event, locais){
    $scope.locais = locais;
  });

  $scope.$on("locais:loading", function(event, status){
    $scope.results.loading = status;
  });

  $scope.changeVoluntario = function(){
    $scope.locais = undefined;
  };

  $scope.gerar = function(){
    relatorioService.getListGeralPorRegionaisRB($scope.regional);
    $scope.mostra = true;
  }

}]);