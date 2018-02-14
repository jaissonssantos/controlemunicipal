app.service('governadorCandidatoService', ['$rootScope', '$timeout', '$http', function($rootScope, $timeout, $http) {

  var self = this;

  this.set = function(governador) {
    self.governador = governador;
    $rootScope.$broadcast("governador", governador);
  };

  this.getList = function(){
    $rootScope.$broadcast("governadores:loading", true);
    $http.post('controller/governadorcandidato/list', self.governador)
    .success(function(response){
      $rootScope.$broadcast("governadores:loading", false);
      $rootScope.$broadcast("governadores", response);
    })
    .error(function(response){
      $rootScope.$broadcast("governadores:loading", false);
      $rootScope.$broadcast("governadores", response);
    });
  };

}]);
