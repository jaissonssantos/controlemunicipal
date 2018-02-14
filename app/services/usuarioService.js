app.service('usuarioService', ['$rootScope', '$timeout', '$http', function($rootScope, $timeout, $http) {

  var self = this;

  this.set = function(usuario) {
    self.usuario = usuario;
    $rootScope.$broadcast("usuario", usuario);
  };

  this.setIds = function(ids){
    self.ids = ids;
  };

  this.getList = function(){
    $rootScope.$broadcast("usuarios:loading", true);
    $http.post('controller/usuario/list', self.usuario)
    .success(function(response){
      $rootScope.$broadcast("usuarios:loading", false);
      $rootScope.$broadcast("usuarios", response);
    })
    .error(function(response){
      $rootScope.$broadcast("usuarios:loading", false);
      $rootScope.$broadcast("usuarios", response);
    });
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

  this.save = function(){
    $rootScope.$broadcast("usuario:save", "loading");
    $http.post('controller/usuario/save', self.usuario)
    .success(function(response){
      $rootScope.$broadcast("usuario:save", "success");
      $rootScope.$broadcast("usuarios:message:success", response.success);
      $timeout(function() {
        $rootScope.$broadcast("usuarios:message:success", "");
      }, 5000);
    }).error(function(response){
      $rootScope.$broadcast("usuario:save", "error");
      $rootScope.$broadcast("usuarios:message:error", response.error);
    });
  };

  this.update = function(){
    $rootScope.$broadcast("usuario:update", "loading");
    $http.post('controller/usuario/update', self.usuario)
    .success(function(response){
      $rootScope.$broadcast("usuario:update", "success");
      $rootScope.$broadcast("usuarios:message:success", response.success);
      $timeout(function() {
        $rootScope.$broadcast("usuarios:message:success", "");
      }, 5000);
    }).error(function(response){
      $rootScope.$broadcast("usuario:update", "error");
      $rootScope.$broadcast("usuarios:message:error", response.error);
    });
  };

  this.password = function(){
    $rootScope.$broadcast("usuario:password", "loading");
    $http.post('controller/usuario/password', self.usuario)
    .success(function(response){
      $rootScope.$broadcast("usuario:password", "success");
      $rootScope.$broadcast("usuarios:message:success", response.success);
      $timeout(function() {
        $rootScope.$broadcast("usuarios:message:success", "");
      }, 5000);
    }).error(function(response){
      $rootScope.$broadcast("usuario:password", "error");
      $rootScope.$broadcast("usuarios:message:error", response.error);
      $timeout(function() {
        $rootScope.$broadcast("usuarios:message:error", "");
      }, 5000);
    });
  };

  this.count = function(){
    $rootScope.$broadcast("usuario:loading", true);
    $http.post('controller/usuario/count', self.usuario)
    .success(function(response){
      $rootScope.$broadcast("usuario:loading", false);
      $rootScope.$broadcast("usuario:count", response);
    })
    .error(function(response){
      $rootScope.$broadcast("usuario:loading", false);
      $rootScope.$broadcast("usuario:count", response);
    });
  };

  this.setStatus = function(status){
    var data = {
      usuarios: self.ids,
      status: status
    };
    $http.post('controller/usuario/setstatus', data)
    .success(function(response){
      $rootScope.$broadcast("usuarios:move", "success");
      $rootScope.$broadcast("usuarios:message:success", response.success);
      $timeout(function() {
        $rootScope.$broadcast("usuarios:message:success", "");
      }, 5000);
      self.getList();
    }).error(function(response){
      $rootScope.$broadcast("usuarios:move", "error");
      $rootScope.$broadcast("usuarios:message:error", response.success);
    });
  };

}]);
