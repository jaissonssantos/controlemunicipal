app.service('apuracaoGovernadoresService', ['$rootScope', '$http', function($rootScope, $http) {

  var self = this;

  this.set = function(governador) {
    self.governador = governador;
    $rootScope.$broadcast("governador", governador);
  };

  this.getListGovernador2014_1turno = function(){
    $rootScope.$broadcast("governadores:loading", true);
    $http.post('controller/apuracao/2014_1turnoGovernadores', self.governador)
    .success(function(response){
      $rootScope.$broadcast("governadores:loading", false);
      $rootScope.$broadcast("governadores", response);
    })
    .error(function(response){
      $rootScope.$broadcast("governadores:loading", false);
      $rootScope.$broadcast("governadores", response);
    });
  };

  this.getListGovernador2014_2turno = function(){
    $rootScope.$broadcast("governadores:loading", true);
    $http.post('controller/apuracao/2014_2turnoGovernadores', self.governador)
    .success(function(response){
      $rootScope.$broadcast("governadores:loading", false);
      $rootScope.$broadcast("governadores", response);
    })
    .error(function(response){
      $rootScope.$broadcast("governadores:loading", false);
      $rootScope.$broadcast("governadores", response);
    });
  };

}]);
