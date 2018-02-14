app.service('fiscalService', ['$rootScope', '$timeout', '$http', function($rootScope, $timeout, $http) {

  var self = this;

  this.set = function(fiscal) {
    self.fiscal = fiscal;
    $rootScope.$broadcast("fiscal", fiscal);
  };

  this.setIds = function(ids){
    self.ids = ids;
  };

  this.getList = function(){
    $rootScope.$broadcast("fiscals:loading", true);
    $http.post('controller/fiscal/list', self.fiscal)
    .success(function(fiscals){
      $rootScope.$broadcast("fiscals:loading", false);
      $rootScope.$broadcast("fiscals", fiscals);
    })
    .error(function(fiscals){
      $rootScope.$broadcast("fiscals:loading", false);
      $rootScope.$broadcast("fiscals", fiscals);
    });
  };

  this.load = function(){
    $rootScope.$broadcast("fiscal:loading", true);
    $http.post('controller/fiscal/get', self.fiscal)
    .success(function(fiscal){
      $rootScope.$broadcast("fiscal:loading", false);
      $rootScope.$broadcast("fiscal", fiscal);
    })
    .error(function(fiscal){
      $rootScope.$broadcast("fiscal:loading", false);
      $rootScope.$broadcast("fiscal", fiscal);
    });
  };

  this.save = function(){
    $rootScope.$broadcast("fiscal:save", "loading");
    $http.post('controller/fiscal/save', self.fiscal)
    .success(function(response){
      $rootScope.$broadcast("fiscal:save", "success");
      $rootScope.$broadcast("fiscals:message:success", "Cadastrado com sucesso");
      $timeout(function() {
        $rootScope.$broadcast("fiscals:message:success", "");
      }, 3000);
    }).error(function(error){
      $rootScope.$broadcast("fiscal:save", "error");
    });
  };

  this.update = function(){
    $rootScope.$broadcast("fiscal:update", "loading");
    $http.post('controller/fiscal/update', self.fiscal)
    .success(function(response){
      $rootScope.$broadcast("fiscal:update", "success");
      $rootScope.$broadcast("fiscals:message:success", "Atualizado com sucesso");
      $timeout(function() {
        $rootScope.$broadcast("fiscals:message:success", "");
      }, 3000);
    }).error(function(error){
      $rootScope.$broadcast("fiscal:update", "error");
    });
  };

  this.delete = function(){
    $rootScope.$broadcast("fiscal:delete", "loading");
    $http.post('controller/fiscal/delete', self.fiscal)
    .success(function(response){
      $rootScope.$broadcast("fiscal:delete", "success");
      $rootScope.$broadcast("fiscals:message:success", "Excluído com sucesso");
      $timeout(function() {
        $rootScope.$broadcast("fiscals:message:success", "");
      }, 3000);
    }).error(function(error){
      $rootScope.$broadcast("fiscal:delete", "error");
    });
  };

  this.checkname = function(){
    $rootScope.$broadcast("fiscais:loading", true);
    $http.post('controller/fiscal/checkname', self.fiscal)
    .success(function(response){
      $rootScope.$broadcast("fiscais:loading", false);
      $rootScope.$broadcast("fiscal:name", response);
    })
    .error(function(response){
      $rootScope.$broadcast("fiscais:loading", false);
      $rootScope.$broadcast("fiscal:name", response);
    });
  };

  this.setStatus = function(status){
    var data = {
      servicos: self.ids,
      status: status
    };
    $http.post('controller/fiscal/setstatus', data)
    .success(function(response){
      $rootScope.$broadcast("fiscals:move", "success");
      $rootScope.$broadcast("fiscals:message:success", "Atualizados com sucesso");
      $timeout(function() {
        $rootScope.$broadcast("fiscals:message:success", "");
      }, 3000);
      self.getList();
    }).error(function(error){
      $rootScope.$broadcast("fiscals:move", "error");
    });
  };

  this.getQTDPorCidade = function(cidade){
    $rootScope.$broadcast("qtdfis:loading", true);
    $http.post('controller/fiscal/getQTDPorCidade', {'cidade':cidade})
    .success(function(qtd){
      $rootScope.$broadcast("qtdfis:loading", false);
      $rootScope.$broadcast("qtdfis", qtd);
    })
    .error(function(qtd){
      $rootScope.$broadcast("qtdfis:loading", false);
      $rootScope.$broadcast("qtdfis", qtd);
    });
  };

  this.getQTDPorCidadeVinculado = function(cidade){
    $rootScope.$broadcast("qtdfisv:loading", true);
    $http.post('controller/fiscal/getQTDPorCidadeVinculado', {'cidade':cidade})
    .success(function(qtd){
      $rootScope.$broadcast("qtdfisv:loading", false);
      $rootScope.$broadcast("qtdfisv", qtd);
    })
    .error(function(qtd){
      $rootScope.$broadcast("qtdfisv:loading", false);
      $rootScope.$broadcast("qtdfisv", qtd);
    });
  };

}]);
