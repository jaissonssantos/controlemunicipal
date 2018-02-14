app.service('associarCoordenadorService', ['$rootScope', '$timeout', '$http', function($rootScope, $timeout, $http) {

  var self = this;

  this.set = function(associarcoordenador) {
    self.associarcoordenador = associarcoordenador;
    $rootScope.$broadcast("associarcoordenador", associarcoordenador);
  };

  this.setIds = function(ids){
    self.ids = ids;
  };

  this.getList = function(){
    $rootScope.$broadcast("associarcoordenadores:loading", true);
    $http.post('controller/associarcoordenador/list', self.associarcoordenador)
    .success(function(response){
      $rootScope.$broadcast("associarcoordenadores:loading", false);
      $rootScope.$broadcast("associarcoordenadores", response);
    })
    .error(function(response){
      $rootScope.$broadcast("associarcoordenadores:loading", false);
      $rootScope.$broadcast("associarcoordenadores", response);
    });
  };

  this.load = function(){
    $rootScope.$broadcast("associarcoordenadores:loading", true);
    $http.post('controller/associarcoordenador/get', self.associarcoordenador)
    .success(function(response){
      $rootScope.$broadcast("associarcoordenadores:loading", false);
      $rootScope.$broadcast("associarcoordenador", response);
    })
    .error(function(response){
      $rootScope.$broadcast("associarcoordenadores:loading", false);
      $rootScope.$broadcast("associarcoordenador", response);
    });
  };

  this.save = function(){
    $rootScope.$broadcast("associarcoordenador:save", "loading");
    $http.post('controller/associarcoordenador/save', self.associarcoordenador)
    .success(function(response){
      $rootScope.$broadcast("associarcoordenador:save", "success");
      $rootScope.$broadcast("associarcoordenadores:message:success", response.success);
      $timeout(function() {
        $rootScope.$broadcast("associarcoordenadores:message:success", "");
      }, 5000);
    }).error(function(response){
      $rootScope.$broadcast("associarcoordenador:save", "error");
      $rootScope.$broadcast("associarcoordenadores:message:error", response.error);
    });
  };

  this.update = function(){
    $rootScope.$broadcast("associarcoordenador:update", "loading");
    $http.post('controller/associarcoordenador/update', self.associarcoordenador)
    .success(function(response){
      $rootScope.$broadcast("associarcoordenador:update", "success");
      $rootScope.$broadcast("associarcoordenadores:message:success", response.success);
      $timeout(function() {
        $rootScope.$broadcast("associarcoordenadores:message:success", "");
      }, 5000);
    }).error(function(response){
      $rootScope.$broadcast("associarcoordenador:update", "error");
      $rootScope.$broadcast("associarcoordenadores:message:error", response.error);
    });
  };

  this.deleteItem = function(data){
    $rootScope.$broadcast("associados:loading", true);
    $http.post('controller/associarcoordenador/deleteitem', data)
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
    $http.post('controller/associarcoordenador/setstatus', data)
    .success(function(response){
      $rootScope.$broadcast("associarcoordenador:move", "success");
      $rootScope.$broadcast("associarcoordenadores:message:success", response.success);
      $timeout(function() {
        $rootScope.$broadcast("associarcoordenadores:message:success", "");
      }, 3000);
      self.getList();
    }).error(function(error){
      $rootScope.$broadcast("associarcoordenador:move", "error");
    });
  };

}]);
