app.service('delegadoService', ['$rootScope', '$timeout', '$http', function($rootScope, $timeout, $http) {

  var self = this;

  this.set = function(delegado) {
    self.delegado = delegado;
    $rootScope.$broadcast("delegado", delegado);
  };

  this.setIds = function(ids){
    self.ids = ids;
  };

  this.getList = function(){
    $rootScope.$broadcast("delegados:loading", true);
    $http.post('controller/delegado/list', self.delegado)
    .success(function(delegados){
      $rootScope.$broadcast("delegados:loading", false);
      $rootScope.$broadcast("delegados", delegados);
    })
    .error(function(delegados){
      $rootScope.$broadcast("delegados:loading", false);
      $rootScope.$broadcast("delegados", delegados);
    });
  };

  this.load = function(){
    $rootScope.$broadcast("delegado:loading", true);
    $http.post('controller/delegado/get', self.delegado)
    .success(function(delegado){
      $rootScope.$broadcast("delegado:loading", false);
      $rootScope.$broadcast("delegado", delegado);
    })
    .error(function(delegado){
      $rootScope.$broadcast("delegado:loading", false);
      $rootScope.$broadcast("delegado", delegado);
    });
  };

  this.save = function(){
    $rootScope.$broadcast("delegado:save", "loading");
    $http.post('controller/delegado/save', self.delegado)
    .success(function(response){
      $rootScope.$broadcast("delegado:save", "success");
      $rootScope.$broadcast("delegados:message:success", "Cadastrado com sucesso");
      $timeout(function() {
        $rootScope.$broadcast("delegados:message:success", "");
      }, 3000);
    }).error(function(error){
      $rootScope.$broadcast("delegado:save", "error");
    });
  };

  this.update = function(){
    $rootScope.$broadcast("delegado:update", "loading");
    $http.post('controller/delegado/update', self.delegado)
    .success(function(response){
      $rootScope.$broadcast("delegado:update", "success");
      $rootScope.$broadcast("delegados:message:success", "Atualizado com sucesso");
      $timeout(function() {
        $rootScope.$broadcast("delegados:message:success", "");
      }, 3000);
    }).error(function(error){
      $rootScope.$broadcast("delegado:update", "error");
    });
  };

  this.delete = function(){
    $rootScope.$broadcast("delegado:delete", "loading");
    $http.post('controller/delegado/delete', self.delegado)
    .success(function(response){
      $rootScope.$broadcast("delegado:delete", "success");
      $rootScope.$broadcast("delegados:message:success", "Excluído com sucesso");
      $timeout(function() {
        $rootScope.$broadcast("delegados:message:success", "");
      }, 3000);
    }).error(function(error){
      $rootScope.$broadcast("delegado:delete", "error");
    });
  };

  this.checkname = function(){
    $rootScope.$broadcast("delegados:loading", true);
    $http.post('controller/delegado/checkname', self.delegado)
    .success(function(response){
      $rootScope.$broadcast("delegados:loading", false);
      $rootScope.$broadcast("delegado:name", response);
    })
    .error(function(response){
      $rootScope.$broadcast("delegados:loading", false);
      $rootScope.$broadcast("delegado:name", response);
    });
  };

  this.setStatus = function(status){
    var data = {
      servicos: self.ids,
      status: status
    };
    $http.post('controller/delegado/setstatus', data)
    .success(function(response){
      $rootScope.$broadcast("delegados:move", "success");
      $rootScope.$broadcast("delegados:message:success", "Atualizados com sucesso");
      $timeout(function() {
        $rootScope.$broadcast("delegados:message:success", "");
      }, 3000);
      self.getList();
    }).error(function(error){
      $rootScope.$broadcast("delegados:move", "error");
    });
  };

  this.getQTDPorCidade = function(cidade){
    $rootScope.$broadcast("qtddel:loading", true);
    $http.post('controller/delegado/getQTDPorCidade', {'cidade':cidade})
    .success(function(qtd){
      $rootScope.$broadcast("qtddel:loading", false);
      $rootScope.$broadcast("qtddel", qtd);
    })
    .error(function(qtd){
      $rootScope.$broadcast("qtddel:loading", false);
      $rootScope.$broadcast("qtddel", qtd);
    });
  };

  this.getQTDPorCidadeVinculado = function(cidade){
    $rootScope.$broadcast("qtddelv:loading", true);
    $http.post('controller/delegado/getQTDPorCidadeVinculado', {'cidade':cidade})
    .success(function(qtd){
      $rootScope.$broadcast("qtddelv:loading", false);
      $rootScope.$broadcast("qtddelv", qtd);
    })
    .error(function(qtd){
      $rootScope.$broadcast("qtddelv:loading", false);
      $rootScope.$broadcast("qtddelv", qtd);
    });
  };

}]);
