app.service('apuracao2014Service', ['$rootScope', '$http', function($rootScope, $http) {

  var self = this;

  this.set = function(field) {
    self.field = field;
    $rootScope.$broadcast("field", field);
  };

  this.getListCargoGeral = function(){
    $rootScope.$broadcast("resultados:loading", true);
    $http.post('controller/apuracao/2014CargoGeral', self.field)
    .success(function(response){
      $rootScope.$broadcast("resultados:loading", false);
      $rootScope.$broadcast("resultados", response);
    })
    .error(function(response){
      $rootScope.$broadcast("resultados:loading", false);
      $rootScope.$broadcast("resultados", response);
    });
  };

  this.getListCargoSecao = function(){
    $rootScope.$broadcast("resultados:loading", true);
    $http.post('controller/apuracao/2014CargoSecao', self.field)
    .success(function(response){
      $rootScope.$broadcast("resultados:loading", false);
      $rootScope.$broadcast("resultados", response);
    })
    .error(function(response){
      $rootScope.$broadcast("resultados:loading", false);
      $rootScope.$broadcast("resultados", response);
    });
  };

  this.getListPartido = function(){
    $rootScope.$broadcast("resultados:loading", true);
    $http.post('controller/apuracao/2014Partido', self.field)
    .success(function(response){
      $rootScope.$broadcast("resultados:loading", false);
      $rootScope.$broadcast("resultados", response);
    })
    .error(function(response){
      $rootScope.$broadcast("resultados:loading", false);
      $rootScope.$broadcast("resultados", response);
    });
  };

  this.getListPartidoCargo = function(){
    $rootScope.$broadcast("resultados:loading", true);
    $http.post('controller/apuracao/2014PartidoCargo', self.field)
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
