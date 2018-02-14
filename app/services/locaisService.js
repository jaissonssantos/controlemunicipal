app.service('locaisService', ['$rootScope', '$timeout', '$http', function($rootScope, $timeout, $http) {

  var self = this;

  this.set = function(local) {
    self.local = local;
    $rootScope.$broadcast("local", local);
  };

  this.setIds = function(ids){
    self.ids = ids;
  };

  this.getList = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/list', self.local)
    .success(function(response){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", response);
    })
    .error(function(response){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", response);
    });
  };

  this.getListLocal = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/listlocal', self.local)
    .success(function(response){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", response);
    })
    .error(function(response){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", response);
    });
  };

  this.getListSecao = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/listsecao', self.local)
    .success(function(response){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local:secao", response);
    })
    .error(function(response){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local:secao", response);
    });
  };

  this.getQTDPorCidade = function(cidade){
    $rootScope.$broadcast("qtdloc:loading", true);
    $http.post('controller/localvotacao/getQTDPorCidade', {'cidade':cidade})
    .success(function(qtd){
      $rootScope.$broadcast("qtdloc:loading", false);
      $rootScope.$broadcast("qtdloc", qtd);
    })
    .error(function(qtd){
      $rootScope.$broadcast("qtdloc:loading", false);
      $rootScope.$broadcast("qtdloc", qtd);
    });
  };

}]);
