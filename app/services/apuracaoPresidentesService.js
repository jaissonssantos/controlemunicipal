app.service('apuracaoPresidentesService', ['$rootScope', '$http', function($rootScope, $http) {

  var self = this;

  this.set = function(presidente) {
    self.presidente = presidente;
    $rootScope.$broadcast("presidente", presidente);
  };

  this.getListPresidente2014_1turno = function(){
    $rootScope.$broadcast("presidentes:loading", true);
    $http.post('controller/apuracao/2014_1turnoPresidentes', self.presidente)
    .success(function(response){
      $rootScope.$broadcast("presidentes:loading", false);
      $rootScope.$broadcast("presidentes", response);
    })
    .error(function(response){
      $rootScope.$broadcast("presidentes:loading", false);
      $rootScope.$broadcast("presidentes", response);
    });
  };

  this.getListPresidente2014_2turno = function(){
    $rootScope.$broadcast("presidentes:loading", true);
    $http.post('controller/apuracao/2014_2turnoPresidentes', self.presidente)
    .success(function(response){
      $rootScope.$broadcast("presidentes:loading", false);
      $rootScope.$broadcast("presidentes", response);
    })
    .error(function(response){
      $rootScope.$broadcast("presidentes:loading", false);
      $rootScope.$broadcast("presidentes", response);
    });
  };

}]);
