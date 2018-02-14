app.service('apuracaoVereadoresService', ['$rootScope', '$http', function($rootScope, $http) {

  var self = this;

  this.set = function(vereador) {
    self.vereador = vereador;
    $rootScope.$broadcast("vereador", vereador);
  };

  this.getListVereadores = function(){
    $rootScope.$broadcast("vereadores:loading", true);
    $http.post('controller/apuracao/1turnoVereadores', self.vereador)
    .success(function(response){
      $rootScope.$broadcast("vereadores:loading", false);
      $rootScope.$broadcast("vereadores", response);
    })
    .error(function(response){
      $rootScope.$broadcast("vereadores:loading", false);
      $rootScope.$broadcast("vereadores", response);
    });
  };

}]);
