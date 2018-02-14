app.service('apuracaoPrefeitosService', ['$rootScope', '$http', function($rootScope, $http) {

  var self = this;

  this.set = function(prefeito) {
    self.prefeito = prefeito;
    $rootScope.$broadcast("prefeito", prefeito);
  };

  this.getListPrefeitos = function(){
    $rootScope.$broadcast("prefeitos:loading", true);
    $http.post('controller/apuracao/1turnoPrefeitos', self.prefeito)
    .success(function(response){
      $rootScope.$broadcast("prefeitos:loading", false);
      $rootScope.$broadcast("prefeitos", response);
    })
    .error(function(response){
      $rootScope.$broadcast("prefeitos:loading", false);
      $rootScope.$broadcast("prefeitos", response);
    });
  };

  this.getListPrefeitosMunicipio = function(){
    $rootScope.$broadcast("prefeitos:loading", true);
    $http.post('controller/apuracao/1turnoPrefeitoMunicipio', self.prefeito)
    .success(function(response){
      $rootScope.$broadcast("prefeitos:loading", false);
      $rootScope.$broadcast("prefeitos", response);
    })
    .error(function(response){
      $rootScope.$broadcast("prefeitos:loading", false);
      $rootScope.$broadcast("prefeitos", response);
    });
  };

  this.getListPrefeitosRegional = function(){
    $rootScope.$broadcast("prefeitos:loading", true);
    $http.post('controller/apuracao/1turnoPrefeitoRegional', self.prefeito)
    .success(function(response){
      $rootScope.$broadcast("prefeitos:loading", false);
      $rootScope.$broadcast("prefeitos", response);
    })
    .error(function(response){
      $rootScope.$broadcast("prefeitos:loading", false);
      $rootScope.$broadcast("prefeitos", response);
    });
  };

  this.getListPrefeitosSecao = function(){
    $rootScope.$broadcast("secoes:loading", true);
    $http.post('controller/apuracao/1turnoPrefeitosRegionais', self.prefeito)
    .success(function(response){
      $rootScope.$broadcast("secoes:loading", false);
      $rootScope.$broadcast("secoes", response);
    })
    .error(function(response){
      $rootScope.$broadcast("secoes:loading", false);
      $rootScope.$broadcast("secoes", response);
    });
  };

  this.getListPrefeitosLocalvotacaoSecao = function(){
    $rootScope.$broadcast("prefeitos:loading", true);
    $http.post('controller/apuracao/1turnoPrefeitosLocalvotacaoSecao', self.prefeito)
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
