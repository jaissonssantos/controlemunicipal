app.service('associarFiscalService', ['$rootScope', '$timeout', '$http', function($rootScope, $timeout, $http) {

  var self = this;

  this.set = function(associarfiscal) {
    self.associarfiscal = associarfiscal;
    $rootScope.$broadcast("associarfiscal", associarfiscal);
  };

  this.setIds = function(ids){
    self.ids = ids;
  };

  this.getList = function(){
    $rootScope.$broadcast("associarfiscais:loading", true);
    $http.post('controller/associarfiscal/list', self.associarfiscal)
    .success(function(response){
      $rootScope.$broadcast("associarfiscais:loading", false);
      $rootScope.$broadcast("associarfiscais", response);
    })
    .error(function(response){
      $rootScope.$broadcast("associarfiscais:loading", false);
      $rootScope.$broadcast("associarfiscais", response);
    });
  };

  this.load = function(){
    $rootScope.$broadcast("associarfiscais:loading", true);
    $http.post('controller/associarfiscal/get', self.associarfiscal)
    .success(function(response){
      $rootScope.$broadcast("associarfiscais:loading", false);
      $rootScope.$broadcast("associarfiscal", response);
    })
    .error(function(response){
      $rootScope.$broadcast("associarfiscais:loading", false);
      $rootScope.$broadcast("associarfiscal", response);
    });
  };

  this.save = function(){
    $rootScope.$broadcast("associarfiscal:save", "loading");
    $http.post('controller/associarfiscal/save', self.associarfiscal)
    .success(function(response){
      $rootScope.$broadcast("associarfiscal:save", "success");
      $rootScope.$broadcast("associarfiscais:message:success", response.success);
      $timeout(function() {
        $rootScope.$broadcast("associarfiscais:message:success", "");
      }, 5000);
    }).error(function(response){
      $rootScope.$broadcast("associarfiscal:save", "error");
      $rootScope.$broadcast("associarfiscais:message:error", response.error);
    });
  };

  this.update = function(){
    $rootScope.$broadcast("associarfiscal:update", "loading");
    $http.post('controller/associarfiscal/update', self.associarfiscal)
    .success(function(response){
      $rootScope.$broadcast("associarfiscal:update", "success");
      $rootScope.$broadcast("associarfiscais:message:success", response.success);
      $timeout(function() {
        $rootScope.$broadcast("associarfiscais:message:success", "");
      }, 5000);
    }).error(function(response){
      $rootScope.$broadcast("associarfiscal:update", "error");
      $rootScope.$broadcast("associarfiscais:message:error", response.error);
    });
  };

  this.deleteLocal = function(data){
    $rootScope.$broadcast("associado:delete:local", "loading");
    $http.post('controller/associarfiscal/deletelocal', data)
    .success(function(response){
      $rootScope.$broadcast("associado:delete:local", "success");
      $rootScope.$broadcast("associarfiscais:message:success", response.success);
      $timeout(function() {
        $rootScope.$broadcast("associarfiscais:message:success", "");
      }, 5000);
    })
    .error(function(response){
      $rootScope.$broadcast("associado:delete:local", "error");
      $rootScope.$broadcast("associarfiscais:message:error", response.error);
    });
  };

  this.deleteItem = function(data){
    $rootScope.$broadcast("associados:loading", true);
    $http.post('controller/associarfiscal/deleteitem', data)
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
    $http.post('controller/associarfiscal/setstatus', data)
    .success(function(response){
      $rootScope.$broadcast("associarfiscal:move", "success");
      $rootScope.$broadcast("associarfiscais:message:success", response.success);
      $timeout(function() {
        $rootScope.$broadcast("associarfiscais:message:success", "");
      }, 3000);
      self.getList();
    }).error(function(error){
      $rootScope.$broadcast("associarfiscal:move", "error");
    });
  };

}]);
