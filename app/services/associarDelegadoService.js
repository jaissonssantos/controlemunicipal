app.service('associarDelegadoService', ['$rootScope', '$timeout', '$http', function($rootScope, $timeout, $http) {

  var self = this;

  this.set = function(associardelegado) {
    self.associardelegado = associardelegado;
    $rootScope.$broadcast("associardelegado", associardelegado);
  };

  this.setIds = function(ids){
    self.ids = ids;
  };

  this.getList = function(){
    $rootScope.$broadcast("associardelegados:loading", true);
    $http.post('controller/associardelegado/list', self.associardelegado)
    .success(function(response){
      $rootScope.$broadcast("associardelegados:loading", false);
      $rootScope.$broadcast("associardelegados", response);
    })
    .error(function(response){
      $rootScope.$broadcast("associardelegados:loading", false);
      $rootScope.$broadcast("associardelegados", response);
    });
  };

  this.load = function(){
    $rootScope.$broadcast("associardelegados:loading", true);
    $http.post('controller/associardelegado/get', self.associardelegado)
    .success(function(response){
      $rootScope.$broadcast("associardelegados:loading", false);
      $rootScope.$broadcast("associardelegado", response);
    })
    .error(function(response){
      $rootScope.$broadcast("associardelegados:loading", false);
      $rootScope.$broadcast("associardelegado", response);
    });
  };

  this.save = function(){
    $rootScope.$broadcast("associardelegado:save", "loading");
    $http.post('controller/associardelegado/save', self.associardelegado)
    .success(function(response){
      $rootScope.$broadcast("associardelegado:save", "success");
      $rootScope.$broadcast("associardelegados:message:success", response.success);
      $timeout(function() {
        $rootScope.$broadcast("associardelegados:message:success", "");
      }, 5000);
    }).error(function(response){
      $rootScope.$broadcast("associardelegado:save", "error");
      $rootScope.$broadcast("associardelegados:message:error", response.error);
    });
  };

  this.update = function(){
    $rootScope.$broadcast("associardelegado:update", "loading");
    $http.post('controller/associardelegado/update', self.associardelegado)
    .success(function(response){
      $rootScope.$broadcast("associardelegado:update", "success");
      $rootScope.$broadcast("associardelegados:message:success", response.success);
      $timeout(function() {
        $rootScope.$broadcast("associardelegados:message:success", "");
      }, 5000);
    }).error(function(response){
      $rootScope.$broadcast("associardelegado:update", "error");
      $rootScope.$broadcast("associardelegados:message:error", response.error);
    });
  };

  this.deleteItem = function(data){
    $rootScope.$broadcast("associados:loading", true);
    $http.post('controller/associardelegado/deleteitem', data)
    .success(function(response){
      $rootScope.$broadcast("associados:loading", false);
      $rootScope.$broadcast("associado:delete", response);
    })
    .error(function(response){
      $rootScope.$broadcast("associados:loading", false);
      $rootScope.$broadcast("associado:delete", response);
    });
  };

  this.setStatus = function(status){
    var data = {
      associados: self.ids,
      status: status
    };
    $http.post('controller/associardelegado/setstatus', data)
    .success(function(response){
      $rootScope.$broadcast("associardelegado:move", "success");
      $rootScope.$broadcast("associardelegados:message:success", response.success);
      $timeout(function() {
        $rootScope.$broadcast("associardelegados:message:success", "");
      }, 3000);
      self.getList();
    }).error(function(error){
      $rootScope.$broadcast("associardelegado:move", "error");
    });
  };

}]);
