app.service('partidoService', ['$rootScope', '$http', function($rootScope, $http) {

  var self = this;

  this.set = function(partido) {
    self.partido = partido;
    $rootScope.$broadcast("partido", partido);
  };

  this.getList = function(){
    $rootScope.$broadcast("partidos:loading", true);
    $http.post('controller/partido/list', self.partido)
    .success(function(item){
      $rootScope.$broadcast("partidos:loading", false);
      $rootScope.$broadcast("partido", item);
    })
    .error(function(item){
      $rootScope.$broadcast("partidos:loading", false);
      $rootScope.$broadcast("partido", item);
    });
  };

  this.getList2014PartidoCandidato = function(){
    $rootScope.$broadcast("partidos:loading", true);
    $http.post('controller/partido/listpartidocandidato', self.partido)
    .success(function(item){
      $rootScope.$broadcast("partidos:loading", false);
      $rootScope.$broadcast("partido", item);
    })
    .error(function(item){
      $rootScope.$broadcast("partidos:loading", false);
      $rootScope.$broadcast("partido", item);
    });
  };

}]);
