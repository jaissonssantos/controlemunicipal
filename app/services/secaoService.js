app.service('secaoService', ['$rootScope', '$timeout', '$http', function($rootScope, $timeout, $http) {

  var self = this;

  this.set = function(secao) {
    self.secao = secao;
    $rootScope.$broadcast("secao", secao);
  };

  this.getList = function(){
    $rootScope.$broadcast("secoes:loading", true);
    $http.post('controller/secao/list', self.secao)
    .success(function(response){
      $rootScope.$broadcast("secoes:loading", false);
      $rootScope.$broadcast("secoes", response);
    })
    .error(function(response){
      $rootScope.$broadcast("secoes:loading", false);
      $rootScope.$broadcast("secoes", response);
    });
  };

}]);
