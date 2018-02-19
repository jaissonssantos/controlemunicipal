app.service('apuracaoDeputadoEstadualService', ['$rootScope', '$http', function($rootScope, $http) {

  var self = this;

  this.set = function(deputadoestadual) {
    self.deputadoestadual = deputadoestadual;
    $rootScope.$broadcast("deputadoestadual", deputadoestadual);
  };

  this.getListDeputadoEstadual2010_1turno = function(){
    $rootScope.$broadcast("deputadoestaduais:loading", true);
    $http.post('controller/apuracao/2010_1turnoDeputadoEstadual', self.deputadoestadual)
    .success(function(response){
      $rootScope.$broadcast("deputadoestaduais:loading", false);
      $rootScope.$broadcast("deputadoestaduais", response);
    })
    .error(function(response){
      $rootScope.$broadcast("deputadoestaduais:loading", false);
      $rootScope.$broadcast("deputadoestaduais", response);
    });
  };
  
  this.getListDeputadoEstadual2014_1turno = function(){
    $rootScope.$broadcast("deputadoestaduais:loading", true);
    $http.post('controller/apuracao/2014_1turnoDeputadoEstadual', self.deputadoestadual)
    .success(function(response){
      $rootScope.$broadcast("deputadoestaduais:loading", false);
      $rootScope.$broadcast("deputadoestaduais", response);
    })
    .error(function(response){
      $rootScope.$broadcast("deputadoestaduais:loading", false);
      $rootScope.$broadcast("deputadoestaduais", response);
    });
  };

}]);
