app.service('autenticarService', ['$rootScope', '$timeout', '$http', function($rootScope, $timeout, $http) {

  var self = this;

  this.set = function(user) {
    self.user = user;
    $rootScope.$broadcast("user", user);
  };

  this.load = function(){
    $rootScope.$broadcast("usuario:loading", true);
    $http.post('controller/usuario/get', self.usuario)
    .success(function(response){
      $rootScope.$broadcast("usuario:loading", false);
      $rootScope.$broadcast("usuario", response);
    })
    .error(function(response){
      $rootScope.$broadcast("usuario:loading", false);
      $rootScope.$broadcast("usuario", response);
    });
  };

  this.authenticate = function(){
    $rootScope.$broadcast("user:authenticate", "loading");
    $http.post('controller/api/authenticate', self.user)
    .success(function(response){
      $rootScope.$broadcast("user:authenticate", "success");
      $rootScope.$broadcast("user", response);
    }).error(function(response){
      $rootScope.$broadcast("user:authenticate", "error");
      $rootScope.$broadcast("users:message:error", response.error);
      $timeout(function() {
        $rootScope.$broadcast("users:message:error", "");
      }, 5000);
    });
  };

  this.logout = function(){
    $rootScope.$broadcast("user:logout", "loading");
    $http.post('controller/api/logout', self.user)
    .success(function(response){
      $rootScope.$broadcast("user:logout", "success");
    }).error(function(response){
      $rootScope.$broadcast("user:logout", "error");
    });
  };

}]);
