app.service('vereadorCandidatoService', ['$rootScope', '$timeout', '$http', function($rootScope, $timeout, $http) {

  var self = this;

  this.set = function(candidatovereador) {
    self.candidatovereador = candidatovereador;
    $rootScope.$broadcast("candidatovereador", candidatovereador);
  };

  this.getList = function(){
    $rootScope.$broadcast("vereadorcandidatos:loading", true);
    $http.post('controller/vereadorcandidato/list', self.candidatovereador)
    .success(function(response){
      $rootScope.$broadcast("vereadorcandidatos:loading", false);
      $rootScope.$broadcast("vereadorcandidatos", response);
    })
    .error(function(response){
      $rootScope.$broadcast("vereadorcandidatos:loading", false);
      $rootScope.$broadcast("vereadorcandidatos", response);
    });
  };

}]);
