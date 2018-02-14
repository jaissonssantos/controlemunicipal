app.service('senadorCandidatoService', ['$rootScope', '$timeout', '$http', function($rootScope, $timeout, $http) {

  var self = this;

  this.set = function(senador) {
    self.senador = senador;
    $rootScope.$broadcast("senador", senador);
  };

  this.getList = function(){
    $rootScope.$broadcast("senadores:loading", true);
    $http.post('controller/senadorcandidato/list', self.senador)
    .success(function(response){
      $rootScope.$broadcast("senadores:loading", false);
      $rootScope.$broadcast("senadores", response);
    })
    .error(function(response){
      $rootScope.$broadcast("senadores:loading", false);
      $rootScope.$broadcast("senadores", response);
    });
  };

}]);
