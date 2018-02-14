app.service('deputadoCandidatoService', ['$rootScope', '$timeout', '$http', function($rootScope, $timeout, $http) {

  var self = this;

  this.set = function(deputado) {
    self.deputado = deputado;
    $rootScope.$broadcast("deputado", deputado);
  };

  this.getList = function(){
    $rootScope.$broadcast("deputados:loading", true);
    $http.post('controller/deputadocandidato/list', self.deputado)
    .success(function(response){
      $rootScope.$broadcast("deputados:loading", false);
      $rootScope.$broadcast("deputados", response);
    })
    .error(function(response){
      $rootScope.$broadcast("deputados:loading", false);
      $rootScope.$broadcast("deputados", response);
    });
  };

}]);
