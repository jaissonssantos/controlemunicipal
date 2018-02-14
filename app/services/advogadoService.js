app.service('advogadoService', ['$rootScope', '$timeout', '$http', function($rootScope, $timeout, $http) {

  var self = this;

  this.set = function(advogado) {
    self.advogado = advogado;
    $rootScope.$broadcast("advogado", advogado);
  };

  this.setIds = function(ids){
    self.ids = ids;
  };

  this.getList = function(){
    $rootScope.$broadcast("advogados:loading", true);
    $http.post('controller/advogado/list', self.advogado)
    .success(function(advogados){
      $rootScope.$broadcast("advogados:loading", false);
      $rootScope.$broadcast("advogados", advogados);
    })
    .error(function(advogados){
      $rootScope.$broadcast("advogados:loading", false);
      $rootScope.$broadcast("advogados", advogados);
    });
  };

  this.load = function(){
    $rootScope.$broadcast("advogado:loading", true);
    $http.post('controller/advogado/get', self.advogado)
    .success(function(advogado){
      $rootScope.$broadcast("advogado:loading", false);
      $rootScope.$broadcast("advogado", advogado);
    })
    .error(function(advogado){
      $rootScope.$broadcast("advogado:loading", false);
      $rootScope.$broadcast("advogado", advogado);
    });
  };

  this.save = function(){
    $rootScope.$broadcast("advogado:save", "loading");
    $http.post('controller/advogado/save', self.advogado)
    .success(function(response){
      $rootScope.$broadcast("advogado:save", "success");
      $rootScope.$broadcast("advogados:message:success", "Cadastrado com sucesso");
      $timeout(function() {
        $rootScope.$broadcast("advogados:message:success", "");
      }, 3000);
    }).error(function(error){
      $rootScope.$broadcast("advogado:save", "error");
    });
  };

  this.update = function(){
    $rootScope.$broadcast("advogado:update", "loading");
    $http.post('controller/advogado/update', self.advogado)
    .success(function(response){
      $rootScope.$broadcast("advogado:update", "success");
      $rootScope.$broadcast("advogados:message:success", "Atualizado com sucesso");
      $timeout(function() {
        $rootScope.$broadcast("advogados:message:success", "");
      }, 3000);
    }).error(function(error){
      $rootScope.$broadcast("advogado:update", "error");
    });
  };

  this.delete = function(){
    $rootScope.$broadcast("advogado:delete", "loading");
    $http.post('controller/advogado/delete', self.advogado)
    .success(function(response){
      $rootScope.$broadcast("advogado:delete", "success");
      $rootScope.$broadcast("advogados:message:success", "Excluído com sucesso");
      $timeout(function() {
        $rootScope.$broadcast("advogados:message:success", "");
      }, 3000);
    }).error(function(error){
      $rootScope.$broadcast("advogado:delete", "error");
    });
  };

  this.checkname = function(){
    $rootScope.$broadcast("advogados:loading", true);
    $http.post('controller/advogado/checkname', self.advogado)
    .success(function(response){
      $rootScope.$broadcast("advogados:loading", false);
      $rootScope.$broadcast("advogado:name", response);
    })
    .error(function(response){
      $rootScope.$broadcast("advogados:loading", false);
      $rootScope.$broadcast("advogado:name", response);
    });
  };

  this.setStatus = function(status){
    var data = {
      servicos: self.ids,
      status: status
    };
    $http.post('controller/advogado/setstatus', data)
    .success(function(response){
      $rootScope.$broadcast("advogados:move", "success");
      $rootScope.$broadcast("advogados:message:success", "Atualizados com sucesso");
      $timeout(function() {
        $rootScope.$broadcast("advogados:message:success", "");
      }, 3000);
      self.getList();
    }).error(function(error){
      $rootScope.$broadcast("advogados:move", "error");
    });
  };

  this.getQTDPorCidade = function(cidade){
    $rootScope.$broadcast("qtdadv:loading", true);
    $http.post('controller/advogado/getQTDPorCidade', {'cidade':cidade})
    .success(function(qtd){
      $rootScope.$broadcast("qtdadv:loading", false);
      $rootScope.$broadcast("qtdadv", qtd);
    })
    .error(function(qtd){
      $rootScope.$broadcast("qtdadv:loading", false);
      $rootScope.$broadcast("qtdadv", qtd);
    });
  };

  this.getQTDPorCidadeVinculado = function(cidade){
    $rootScope.$broadcast("qtdadvv:loading", true);
    $http.post('controller/advogado/getQTDPorCidadeVinculado', {'cidade':cidade})
    .success(function(qtdv){
      $rootScope.$broadcast("qtdadvv:loading", false);
      $rootScope.$broadcast("qtdadvv", qtdv);
    })
    .error(function(qtdv){
      $rootScope.$broadcast("qtdadvv:loading", false);
      $rootScope.$broadcast("qtdadvv", qtdv);
    });
  };

}]);
