app.service('locaisMapaService', ['$rootScope', '$timeout', '$http', function($rootScope, $timeout, $http) {

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
    $http.post('controller/localvotacao/jsonresultadomapa.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/jsonresultadomapaop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

}]);
