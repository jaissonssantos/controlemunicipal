app.service('presidenteCandidatoService', ['$rootScope', '$timeout', '$http', function($rootScope, $timeout, $http) {

  var self = this;

  this.set = function(presidente) {
    self.presidente = presidente;
    $rootScope.$broadcast("presidente", presidente);
  };

  this.getList = function(){
    $rootScope.$broadcast("presidentes:loading", true);
    $http.post('controller/presidentecandidato/list', self.presidente)
    .success(function(response){
      $rootScope.$broadcast("presidentes:loading", false);
      $rootScope.$broadcast("presidentes", response);
    })
    .error(function(response){
      $rootScope.$broadcast("presidentes:loading", false);
      $rootScope.$broadcast("presidentes", response);
    });
  };

}]);
