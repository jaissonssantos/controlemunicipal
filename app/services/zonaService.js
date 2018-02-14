app.service('zonaService', ['$rootScope', '$timeout', '$http', function($rootScope, $timeout, $http) {

  var self = this;

  this.set = function(zona) {
    self.zona = zona;
    $rootScope.$broadcast("zona", zona);
  };

  this.getList = function(){
    $rootScope.$broadcast("zonas:loading", true);
    $http.post('controller/zona/list', self.zona)
    .success(function(response){
      $rootScope.$broadcast("zonas:loading", false);
      $rootScope.$broadcast("zonas", response);
    })
    .error(function(response){
      $rootScope.$broadcast("zonas:loading", false);
      $rootScope.$broadcast("zonas", response);
    });
  };

}]);
