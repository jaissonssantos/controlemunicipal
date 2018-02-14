app.service('apuracaoZonaSecaoCargoService', ['$rootScope', '$http', function($rootScope, $http) {

  var self = this;

  this.set = function(resultado) {
    self.resultado = resultado;
    $rootScope.$broadcast("resultado", resultado);
  };

  this.getListZonaSecaoCargo = function(){
    $rootScope.$broadcast("resultados:loading", true);
    $http.post('controller/apuracao/1turnoZonaSecaoCargo', self.resultado)
    .success(function(response){
      $rootScope.$broadcast("resultados:loading", false);
      $rootScope.$broadcast("resultados", response);
    })
    .error(function(response){
      $rootScope.$broadcast("resultados:loading", false);
      $rootScope.$broadcast("resultados", response);
    });
  };

}]);
