app.service('apuracaoColigacaoService', ['$rootScope', '$http', function($rootScope, $http) {

  var self = this;

  this.set = function(prefeito) {
    self.prefeito = prefeito;
    $rootScope.$broadcast("prefeito", prefeito);
  };

  this.getList = function( cidade ){
    $rootScope.$broadcast("prefeitos:loading", true);
    $http.post('controller/apuracao/1turnoColigacao', {'cidade':cidade})
    .success(function(response){
      $rootScope.$broadcast("prefeitos:loading", false);
      $rootScope.$broadcast("prefeitos", response);
    })
    .error(function(response){
      $rootScope.$broadcast("prefeitos:loading", false);
      $rootScope.$broadcast("prefeitos", response);
    });
  };

}]);
