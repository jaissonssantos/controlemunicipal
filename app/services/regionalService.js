app.service('regionalService', ['$rootScope', '$http', function($rootScope, $http) {

  var self = this;

  this.set = function(regional) {
    self.regional = regional;
    $rootScope.$broadcast("regional", regional);
  };

  this.getList = function(){
    $rootScope.$broadcast("regionais:loading", true);
    $http.post('controller/regional/list', self.regional)
    .success(function(item){
      $rootScope.$broadcast("regionais:loading", false);
      $rootScope.$broadcast("regional", item);
    })
    .error(function(item){
      $rootScope.$broadcast("regionais:loading", false);
      $rootScope.$broadcast("regional", item);
    });
  };

}]);
