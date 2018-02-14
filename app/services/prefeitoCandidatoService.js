app.service('prefeitoCandidatoService', ['$rootScope', '$timeout', '$http', function($rootScope, $timeout, $http) {

  var self = this;

  this.set = function(candidatoprefeito) {
    self.candidatoprefeito = candidatoprefeito;
    $rootScope.$broadcast("candidatoprefeito", candidatoprefeito);
  };

  this.getList = function(){
    $rootScope.$broadcast("prefeitocandidatos:loading", true);
    $http.post('controller/prefeitocandidato/list', self.candidatoprefeito)
    .success(function(response){
      $rootScope.$broadcast("prefeitocandidatos:loading", false);
      $rootScope.$broadcast("prefeitocandidatos", response);
    })
    .error(function(response){
      $rootScope.$broadcast("prefeitocandidatos:loading", false);
      $rootScope.$broadcast("prefeitocandidatos", response);
    });
  };

}]);
