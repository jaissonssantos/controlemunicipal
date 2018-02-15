app.controller('mapaVotacao20101TurnoController', ['$http', 'uiGmapGoogleMapApi', '$uibModal', '$location', '$rootScope', '$scope', '$routeParams', 'locaisMapaService', 
function($http, uiGmapGoogleMapApi, $uibModal, $location, $rootScope, $scope, $routeParams, locaisMapaService) {


  $scope.lat = '-9.969403';
  $scope.lng = '-67.822265'; 
  $scope.marker = {};


  $scope.municipio = '';




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
  $scope.templateUrl = "views/apuracao/conteudovotacao20101turno.html";

	$scope.windowParams = {
    	locais: $scope.locais
	};

  $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 16 };
  //$scope.markers = [];    
  //uiGmapGoogleMapApi.then(function(maps) {
 // 	$scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 16 };

    
  //});

$scope.gerarMapa = function(){
    //alert($scope.municipio);

    //$scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 16 };
    $scope.markers = [];  

    if($scope.municipio == 1){
        //-10.074837, -67.055257
        $scope.lat = '-10.074837';
        $scope.lng = '-67.055257';  

      uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 16 };
        locaisMapaService.getListAcrelandia20101turno();
      });
    }
    if($scope.municipio == 2){
      //-10.939657, -69.564516
      $scope.lat = '-10.939657';
      $scope.lng = '-69.564516'; 
      uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 16 };
        locaisMapaService.getListAssisBrasil20101turno();
      });
    }
    if($scope.municipio == 3){
      //-11.006815, -68.745649
      $scope.lat = '-11.006815';
      $scope.lng = '-68.745649'; 
      uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 16 };
        locaisMapaService.getListBrasileia20101turno();
      });
    }

    if($scope.municipio == 4){
      //-9.825908, -67.950302
      $scope.lat = '-9.825908';
      $scope.lng = '-67.950302'; 
      uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 16 };
        locaisMapaService.getListBujari20101turno();
      });
    }

    if($scope.municipio == 5){
      //-10.572253, -67.675124
      $scope.lat = '-10.572253';
      $scope.lng = '-67.675124'; 
      uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 16 };
        locaisMapaService.getListCapixaba20101turno();
      });
    }

    if($scope.municipio == 6){
      //-7.626797, -72.672583
      $scope.lat = '-7.626797';
      $scope.lng = '-72.672583'; 
      uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 16 };
        locaisMapaService.getListCruzeiroDoSul20101turno();
      });
    }

    if($scope.municipio == 7){
      //-11.026646, -68.741313
      $scope.lat = '-11.026646';
      $scope.lng = '-68.741313'; 
      uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 16 };
        locaisMapaService.getListEpitaciolandia20101turno();
      });
    }

    if($scope.municipio == 8){
      //-8.169491, -70.352850
      $scope.lat = '-8.169491';
      $scope.lng = '-70.352850'; 
      uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 16 };
        locaisMapaService.getListFeijo20101turno();
      });
    }

    if($scope.municipio == 9){
      //-9.192749, -71.948819
      $scope.lat = '-9.192749';
      $scope.lng = '-71.948819'; 
      uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 16 };
        locaisMapaService.getListJordao20101turno();
      });
    }

    if($scope.municipio == 10){
      //-7.612711, -72.904674
      $scope.lat = '-7.612711';
      $scope.lng = '-72.904674'; 
      uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 16 };
        locaisMapaService.getListMancioLima20101turno();
      });
    }

    if($scope.municipio == 11){
      //-8.837597, -69.261726
      $scope.lat = '-8.837597';
      $scope.lng = '-69.261726'; 
      uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 16 };
        locaisMapaService.getListManoelUrbano20101turno();
      });
    }

    if($scope.municipio == 12){
      //-8.947168, -72.787959
      $scope.lat = '-8.947168';
      $scope.lng = '-72.787959'; 
      uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 16 };
        locaisMapaService.getListMarechalThaumaturgo20101turno();
      });
    }

    if($scope.municipio == 13){
      //-10.328166, -67.184303
      $scope.lat = '-10.328166';
      $scope.lng = '-67.184303'; 
      uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 16 };
        locaisMapaService.getListPlacidoDeCastro20101turno();
      });
    }

    if($scope.municipio == 14){
      //-9.591861, -67.540350
      $scope.lat = '-9.591861';
      $scope.lng = '-67.540350'; 
      uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 16 };
        locaisMapaService.getListPortoAcre20101turno();
      });
    }

    if($scope.municipio == 15){
      //-8.266171, -72.744183
      $scope.lat = '-8.266171';
      $scope.lng = '-72.744183'; 
      uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 16 };
        locaisMapaService.getListPortoWalter20101turno();
      });
    }

    if($scope.municipio == 16){
      //-9.969403, -67.822265
      $scope.lat = '-9.969403';
      $scope.lng = '-67.822265'; 
      uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 16 };
        locaisMapaService.getListRioBranco20101turno();
      });
    }

    if($scope.municipio == 17){
      //-7.735604, -72.651403
      $scope.lat = '-7.735604';
      $scope.lng = '-72.651403'; 
      uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 16 };
        locaisMapaService.getListRodriguesAlves20101turno();
      });
    }

    if($scope.municipio == 18){
      //-9.437787, -70.492097
      $scope.lat = '-9.437787';
      $scope.lng = '-70.492097'; 
      uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 16 };
        locaisMapaService.getListSantaRosaDoPurus20101turno();
      });
    }

    if($scope.municipio == 19){
      //-9.066565, -68.658990
      $scope.lat = '-9.066565';
      $scope.lng = '-68.658990'; 
      uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 16 };
        locaisMapaService.getListSenaMadureira20101turno();
      });
    }

    if($scope.municipio == 20){
      //-10.148996, -67.736941
      $scope.lat = '-10.148996';
      $scope.lng = '-67.736941'; 
      uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 16 };
        locaisMapaService.getListSenadorGuiomard20101turno();
      });
    }

    if($scope.municipio == 21){
      //-8.162026, -70.766480
      $scope.lat = '-8.162026';
      $scope.lng = '-70.766480'; 
      uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 16 };
        locaisMapaService.getListTarauaca20101turno();
      });
    }

    if($scope.municipio == 22){
      //-10.654170, -68.498525
      $scope.lat = '-10.654170';
      $scope.lng = '-68.498525'; 
      uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 16 };
        locaisMapaService.getListXapuri20101turno();
      });
    }
    
  };






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
  				 'secoes':value.secoes, 'votosMG':value.votosMG[0], 'votosEG':value.votosEG[0], 'icon': value.icon+""});
			}
			i++;
		});
	};

}]);