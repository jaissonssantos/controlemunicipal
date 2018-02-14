app.service('candidatoService', ['$rootScope', '$timeout', '$http', function($rootScope, $timeout, $http) {

  var self = this;

  this.set = function(candidato) {
    self.candidato = candidato;
    $rootScope.$broadcast("candidato", candidato);
  };

  this.setIds = function(ids){
    self.ids = ids;
  };

  this.getList = function(){
    $rootScope.$broadcast("candidatos:loading", true);
    $http.post('controller/candidato/list', self.candidato)
    .success(function(candidatos){
      $rootScope.$broadcast("candidatos:loading", false);
      $rootScope.$broadcast("candidatos", candidatos);
    })
    .error(function(candidatos){
      $rootScope.$broadcast("candidatos:loading", false);
      $rootScope.$broadcast("candidatos", candidatos);
    });
  };

  this.load = function(){
    $rootScope.$broadcast("candidato:loading", true);
    $http.post('controller/candidato/get', self.candidato)
    .success(function(candidato){
      $rootScope.$broadcast("candidato:loading", false);
      $rootScope.$broadcast("candidato", candidato);
    })
    .error(function(candidato){
      $rootScope.$broadcast("candidato:loading", false);
      $rootScope.$broadcast("candidato", candidato);
    });
  };

  this.save = function(){
    $rootScope.$broadcast("candidato:save", "loading");
    $http.post('controller/candidato/save', self.candidato)
    .success(function(response){
      $rootScope.$broadcast("candidato:save", "success");
      $rootScope.$broadcast("candidatos:message:success", "Cadastrado com sucesso");
      $timeout(function() {
        $rootScope.$broadcast("candidatos:message:success", "");
      }, 3000);
    }).error(function(error){
      $rootScope.$broadcast("candidato:save", "error");
    });
  };

  this.update = function(){
    $rootScope.$broadcast("candidato:update", "loading");
    $http.post('controller/candidato/update', self.candidato)
    .success(function(response){
      $rootScope.$broadcast("candidato:update", "success");
      $rootScope.$broadcast("candidatos:message:success", "Atualizado com sucesso");
      $timeout(function() {
        $rootScope.$broadcast("candidatos:message:success", "");
      }, 3000);
    }).error(function(error){
      $rootScope.$broadcast("candidato:update", "error");
    });
  };

  this.delete = function(){
    $rootScope.$broadcast("candidato:delete", "loading");
    $http.post('controller/candidato/delete', self.candidato)
    .success(function(response){
      $rootScope.$broadcast("candidato:delete", "success");
      $rootScope.$broadcast("candidatos:message:success", "Excluído com sucesso");
      $timeout(function() {
        $rootScope.$broadcast("candidatos:message:success", "");
      }, 3000);
    }).error(function(error){
      $rootScope.$broadcast("candidato:delete", "error");
    });
  };

  this.setStatus = function(status){
    var data = {
      servicos: self.ids,
      status: status
    };
    $http.post('controller/candidato/setstatus', data)
    .success(function(response){
      $rootScope.$broadcast("candidatos:move", "success");
      $rootScope.$broadcast("candidatos:message:success", "Atualizados com sucesso");
      $timeout(function() {
        $rootScope.$broadcast("candidatos:message:success", "");
      }, 3000);
      self.getList();
    }).error(function(error){
      $rootScope.$broadcast("candidatos:move", "error");
    });
  };

  this.getQTDPorCidade = function(cidade){
    $rootScope.$broadcast("qtdcand:loading", true);
    $http.post('controller/candidato/getQTDPorCidade', {'cidade':cidade})
    .success(function(qtd){
      $rootScope.$broadcast("qtdcand:loading", false);
      $rootScope.$broadcast("qtdcand", qtd);
    })
    .error(function(qtd){
      $rootScope.$broadcast("qtdcand:loading", false);
      $rootScope.$broadcast("qtdcand", qtd);
    });
  };

}]);
