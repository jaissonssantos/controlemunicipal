app.service('apuracaoDeputadoFederalService', ['$rootScope', '$http', function($rootScope, $http) {

  var self = this;

  this.set = function(deputadofederal) {
    self.deputadofederal = deputadofederal;
    $rootScope.$broadcast("deputadofederal", deputadofederal);
  };

  this.getListDeputadoFederal2014_1turno = function(){
    $rootScope.$broadcast("deputadofederais:loading", true);
    $http.post('controller/apuracao/2014_1turnoDeputadoFederal', self.deputadofederal)
    .success(function(response){
      $rootScope.$broadcast("deputadofederais:loading", false);
      $rootScope.$broadcast("deputadofederais", response);
    })
    .error(function(response){
      $rootScope.$broadcast("deputadofederais:loading", false);
      $rootScope.$broadcast("deputadofederais", response);
    });
  };

}]);
