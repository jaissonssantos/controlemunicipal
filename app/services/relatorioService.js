app.service('relatorioService', ['$rootScope', '$timeout', '$http', function($rootScope, $timeout, $http) {

  var self = this;

  this.set = function(cid) {
    self.cid = cid;
    $rootScope.$broadcast("cid", cid);
  };

  this.setIds = function(ids){
    self.ids = ids;
  };

  this.getList = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/relatorios/listadvogados', {'id':self.cid})
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    });
  };

  this.getListCoordenadores = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/relatorios/listcoordenadores', {'id':self.cid})
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    });
  };

  this.getListDelegados = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/relatorios/listdelegados', {'id':self.cid})
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    });
  };

  this.getListFiscais = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/relatorios/listfiscais', {'id':self.cid})
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    });
  };

  this.getListRegionaisRB = function(regional, cargo){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/relatorios/listregionaisrb', {'regional':regional, 'cargo':cargo})
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    });
  };

  this.checkname = function(cargo, nome){
    $rootScope.$broadcast("pessoas:loading", true);
    $http.post('controller/relatorios/checkname', {'cargo':cargo, 'nome':nome})
    .success(function(response){
      $rootScope.$broadcast("pessoas:loading", false);
      $rootScope.$broadcast("pessoas", response);
    })
    .error(function(response){
      $rootScope.$broadcast("pessoas:loading", false);
      $rootScope.$broadcast("pessoas", response);
    });
  };

  this.getListLocais = function(id, cargo){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/relatorios/listlocais', {'id':id, 'cargo':cargo})
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    });
  };

  this.getLocais = function(id){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/relatorios/locais', {'id':id})
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    });
  };

  this.getLocal = function(nome, municipio){
    $rootScope.$broadcast("localC:loading", true);
    $http.post('controller/relatorios/getLocal', {'nome':nome, 'municipio':municipio})
    .success(function(item){
      $rootScope.$broadcast("localC:loading", false);
      $rootScope.$broadcast("localC", item);
      //console.log(item);
    })
    .error(function(item){
      $rootScope.$broadcast("localC:loading", false);
      $rootScope.$broadcast("localC", item);
    });
  };

  this.getListGeralPorRegionaisRB = function(regional){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/relatorios/listgeralregionaisrb', {'regional':regional})
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    });
  };

}]);
