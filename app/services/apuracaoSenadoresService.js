app.service('apuracaoSenadoresService', ['$rootScope', '$http', function($rootScope, $http) {

  var self = this;

  this.set = function(senador) {
    self.senador = senador;
    $rootScope.$broadcast("senador", senador);
  };

  this.getListSenador2010_1turno = function(){
    $rootScope.$broadcast("senadores:loading", true);
    $http.post('controller/apuracao/2010_1turnoSenadores', self.senador)
    .success(function(response){
      $rootScope.$broadcast("senadores:loading", false);
      $rootScope.$broadcast("senadores", response);
    })
    .error(function(response){
      $rootScope.$broadcast("senadores:loading", false);
      $rootScope.$broadcast("senadores", response);
    });
  };
  
  this.getListSenador2014_1turno = function(){
    $rootScope.$broadcast("senadores:loading", true);
    $http.post('controller/apuracao/2014_1turnoSenadores', self.senador)
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
