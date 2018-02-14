app.service('apuracaoQuantitativoService', ['$rootScope', '$http', function($rootScope, $http) {

  var self = this;

  this.set = function(quantitativo) {
    self.quantitativo = quantitativo;
    $rootScope.$broadcast("quantitativo", quantitativo);
  };

  this.getList2016_1turno = function(){
    $rootScope.$broadcast("quantitativos:loading", true);
    $http.post('controller/apuracao/1turnoQuantitativo', self.quantitativo)
    .success(function(response){
      $rootScope.$broadcast("quantitativos:loading", false);
      $rootScope.$broadcast("quantitativos", response);
    })
    .error(function(response){
      $rootScope.$broadcast("quantitativos:loading", false);
      $rootScope.$broadcast("quantitativos", response);
    });
  };

  this.getList2014_1turno = function(){
    $rootScope.$broadcast("quantitativos:loading", true);
    $http.post('controller/apuracao/2014_1turnoQuantitativo', self.quantitativo)
    .success(function(response){
      $rootScope.$broadcast("quantitativos:loading", false);
      $rootScope.$broadcast("quantitativos", response);
    })
    .error(function(response){
      $rootScope.$broadcast("quantitativos:loading", false);
      $rootScope.$broadcast("quantitativos", response);
    });
  };

}]);
