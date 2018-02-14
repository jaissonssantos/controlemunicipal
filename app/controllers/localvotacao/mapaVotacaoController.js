app.controller('mapaVotacaoController', ['$http', 'uiGmapGoogleMapApi', '$uibModal', '$location', '$rootScope', '$scope', '$routeParams', 'locaisMapaService', 
function($http, uiGmapGoogleMapApi, $uibModal, $location, $rootScope, $scope, $routeParams, locaisMapaService) {

	$scope.lat = '-9.974';
	$scope.lng = '-67.8076';
  $scope.marker = {};


  //$scope.status.loading = false;

  //locaisMapaService.getList();

  $scope.windowParams = {
    marker: $scope.marker,
    doIt: function() {
      return $scope.doIt()
    }
  };

  $scope.doIt = function() {
    alert("Action!");
  }

  $scope.showWindow = false;
  $scope.templateUrl = "views/apuracao/conteudovotacaome.html";

	$scope.windowParams = {
    	locais: $scope.locais
	};

  $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 16 };
  $scope.markers = [];    
  uiGmapGoogleMapApi.then(function(maps) {
  	$scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 16 };
  	locaisMapaService.getList();
  });

	$scope.locais = $scope.local = {};
  $scope.results = {};

  $scope.$on("locais:loading", function(event, status){
    $scope.results.loading = status;
  });

	$scope.$on("locais", function(event, locais){
		$scope.locais = locais;
		$scope.setMarkers();
	});

  $scope.onClickMarker = function(marker){
    $scope.marker = marker;
    $scope.windowParams.marker = $scope.marker;
  };

	$scope.setMarkers = function(){


		var i = 0;
		angular.forEach($scope.locais.localidade, function(value) {
			if(value.coordenadas != null){
  				var pontos = value.coordenadas.split(", ");
  				//console.log(value.icon[0]);
  				$scope.markers.push({'id':value.idlocal, 'local':value.local, 'coords': {'latitude':pontos[0], 'longitude':pontos[1]},
  				 'votos':value.qtdvotos, 'endereco':value.endereco, 'bairro':value.bairro, 'cidade':value.cidade, 
  				 'secoes':value.secoes, 'votosMG':value.votosMG[0], 'votosEG':value.votosEG[0], 'icon': value.icon});
			}
			i++;
		});
	};

}]);