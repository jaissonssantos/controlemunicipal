app.service('cidadeService', ['$rootScope', '$http', function($rootScope, $http) {

  var self = this;

  this.set = function(cidade) {
    self.cidade = cidade;
    $rootScope.$broadcast("cidade", cidade);
  };

  this.getList = function(){
    $rootScope.$broadcast("cidades:loading", true);
    $http.post('controller/cidade/list', self.cidade)
    .success(function(item){
      $rootScope.$broadcast("cidades:loading", false);
      $rootScope.$broadcast("cidade", item);
    })
    .error(function(item){
      $rootScope.$broadcast("cidades:loading", false);
      $rootScope.$broadcast("cidade", item);
    });
  };

  this.getListTodos = function(){
    $rootScope.$broadcast("cidades:loading", true);
    $http.post('controller/cidade/listtodos', self.cidade)
    .success(function(item){
      $rootScope.$broadcast("cidades:loading", false);
      $rootScope.$broadcast("cidade", item);
    })
    .error(function(item){
      $rootScope.$broadcast("cidades:loading", false);
      $rootScope.$broadcast("cidade", item);
    });
  };

  this.load = function(){
    $rootScope.$broadcast("cidade:loading", true);
    $http.post('controller/cidade/get', self.cidade)
    .success(function(cidade){
      $rootScope.$broadcast("cidade:loading", false);
      $rootScope.$broadcast("cidade", cidade);
    })
    .error(function(cidade){
      $rootScope.$broadcast("cidade:loading", false);
      $rootScope.$broadcast("cidade", cidade);
    });
  };

  this.pegaCidade = function(idcidade){
    //console.log(idcidade);
    //$rootScope.$broadcast("municipio:loading", true);
    $http.post('controller/cidade/pegaMunicipio', {'id':idcidade})
    .success(function(item){
      //console.log(item);
      //$rootScope.$broadcast("municipio:loading", false);
      $rootScope.$broadcast("municipio", item);
    })
    .error(function(item){
      console.log(item);
      //$rootScope.$broadcast("municipio:loading", false);
      $rootScope.$broadcast("municipio", item);
    });
  };

}]);
