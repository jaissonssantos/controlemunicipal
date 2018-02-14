app.service('apuracaoVereadorService', ['$rootScope', '$http', function($rootScope, $http) {

  var self = this;

  this.set = function(vereador) {
    self.vereador = vereador;
    $rootScope.$broadcast("vereador", vereador);
  };

  this.getListVereadorMunicipio = function(){
    $rootScope.$broadcast("vereadores:loading", true);
    $http.post('controller/apuracao/1turnoVereadorMunicipio', self.vereador)
    .success(function(response){
      $rootScope.$broadcast("vereadores:loading", false);
      $rootScope.$broadcast("vereadores", response);
    })
    .error(function(response){
      $rootScope.$broadcast("vereadores:loading", false);
      $rootScope.$broadcast("vereadores", response);
    });
  };

  this.getListVereadorRegional = function(){
    $rootScope.$broadcast("vereadores:loading", true);
    $http.post('controller/apuracao/1turnoVereadorRegional', self.vereador)
    .success(function(response){
      $rootScope.$broadcast("vereadores:loading", false);
      $rootScope.$broadcast("vereadores", response);
    })
    .error(function(response){
      $rootScope.$broadcast("vereadores:loading", false);
      $rootScope.$broadcast("vereadores", response);
    });
  };

  this.getListVereadorSecao = function(){
    $rootScope.$broadcast("vereadores:loading", true);
    $http.post('controller/apuracao/1turnoVereadorSecao', self.vereador)
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
