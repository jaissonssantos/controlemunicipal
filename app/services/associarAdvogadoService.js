app.service('associarAdvogadoService', ['$rootScope', '$timeout', '$http', function($rootScope, $timeout, $http) {

  var self = this;

  this.set = function(associaradvogado) {
    self.associaradvogado = associaradvogado;
    $rootScope.$broadcast("associaradvogado", associaradvogado);
  };

  this.setIds = function(ids){
    self.ids = ids;
  };

  this.getList = function(){
    $rootScope.$broadcast("associaradvogados:loading", true);
    $http.post('controller/associaradvogado/list', self.associaradvogado)
    .success(function(response){
      $rootScope.$broadcast("associaradvogados:loading", false);
      $rootScope.$broadcast("associaradvogados", response);
    })
    .error(function(response){
      $rootScope.$broadcast("associaradvogados:loading", false);
      $rootScope.$broadcast("associaradvogados", response);
    });
  };

  this.load = function(){
    $rootScope.$broadcast("associaradvogados:loading", true);
    $http.post('controller/associaradvogado/get', self.associaradvogado)
    .success(function(response){
      $rootScope.$broadcast("associaradvogados:loading", false);
      $rootScope.$broadcast("associaradvogado", response);
    })
    .error(function(response){
      $rootScope.$broadcast("associaradvogados:loading", false);
      $rootScope.$broadcast("associaradvogado", response);
    });
  };

  this.save = function(){
    $rootScope.$broadcast("associaradvogado:save", "loading");
    $http.post('controller/associaradvogado/save', self.associaradvogado)
    .success(function(response){
      $rootScope.$broadcast("associaradvogado:save", "success");
      $rootScope.$broadcast("associaradvogados:message:success", response.success);
      $timeout(function() {
        $rootScope.$broadcast("associaradvogados:message:success", "");
      }, 5000);
    }).error(function(response){
      $rootScope.$broadcast("associaradvogado:save", "error");
      $rootScope.$broadcast("associaradvogados:message:error", response.error);
    });
  };

  this.update = function(){
    $rootScope.$broadcast("associaradvogado:update", "loading");
    $http.post('controller/associaradvogado/update', self.associaradvogado)
    .success(function(response){
      $rootScope.$broadcast("associaradvogado:update", "success");
      $rootScope.$broadcast("associaradvogados:message:success", response.success);
      $timeout(function() {
        $rootScope.$broadcast("associaradvogados:message:success", "");
      }, 5000);
    }).error(function(response){
      $rootScope.$broadcast("associaradvogado:update", "error");
      $rootScope.$broadcast("associaradvogados:message:error", response.error);
    });
  };

  this.deleteItem = function(data){
    $rootScope.$broadcast("associados:loading", true);
    $http.post('controller/associaradvogado/deleteitem', data)
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
    $http.post('controller/associaradvogado/setstatus', data)
    .success(function(response){
      $rootScope.$broadcast("associaradvogado:move", "success");
      $rootScope.$broadcast("associaradvogados:message:success", response.success);
      $timeout(function() {
        $rootScope.$broadcast("associaradvogados:message:success", "");
      }, 3000);
      self.getList();
    }).error(function(error){
      $rootScope.$broadcast("associaradvogado:move", "error");
    });
  };

}]);
