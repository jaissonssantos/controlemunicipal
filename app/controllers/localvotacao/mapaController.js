app.controller('mapaController', ['$http', 'uiGmapGoogleMapApi', '$uibModal', '$location', '$rootScope', '$scope', '$routeParams', 'locaisMapaService', 'cidadeService',
function($http, uiGmapGoogleMapApi, $uibModal, $location, $rootScope, $scope, $routeParams, locaisMapaService, cidadeService) {

	$scope.lat = '';
	$scope.lng = '';
  $scope.marker = {};

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
  $scope.templateUrl = "views/localvotacao/conteudo.html";

	$scope.windowParams = {
    	locais: $scope.locais
	};

  $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 16 };
  $scope.markers = [];    
  uiGmapGoogleMapApi.then(function(maps) {
  	$scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 16 };
  	locaisMapaService.getList();
  });

	$scope.municipio = [];
	$scope.locais = $scope.local = {};
	$scope.cidade = $scope.cidades = {};
  $scope.results = {};

	$rootScope.$on('cidade', function(event, cidade) {
		$scope.cidade = cidade;
    var exists = 0;
    if(cidade!=undefined){
      cidade.forEach(function(cidade){
        if(cidade.id==16){ 
          $scope.municipio=cidade;
          exists++;
        }

      });
    }
    if(exists) $scope.setCoord();  
	});

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
  				var secoes = "|"; 
  				//montar a lista de secoes, advogados, delegados e coordenadores no braço e jogar ele montado no json abaixo
  				//pega as secoes
  				for(var j = 0; j < value.secoes.length; j++){
  					secoes += ", "+value.secoes[j].secao;
  				}
  				secoes = secoes.replace("|,", "");
  				
  				//pega as secoes
  				var advogados = "|";

  				for(var j = 0; j < value.advogados.length; j++){
  					advogados += ", "+value.advogados[j].nome+"("+value.advogados[j].celular1+")";
  				}
  				if(advogados == '|, undefined(undefined)'){
  					advogados = "Não possui vinculação.";
  				}else{
  					advogados = advogados.replace("|,", "");
  				}

  				//pega as secoes
  				var coordenadores = "|";
  				for(var j = 0; j < value.coordenadores.length; j++){
  					coordenadores += ", "+value.coordenadores[j].nome+"("+value.coordenadores[j].celular1+")";
  				}
  				if(coordenadores == '|, undefined(undefined)'){
  					coordenadores = "Não possui vinculação.";
  				}else{
  					coordenadores = coordenadores.replace("|,", "");
  				}

  				//pega as secoes
  				var delegados = "|";
  				for(var j = 0; j < value.delegados.length; j++){
  					delegados += ", "+value.delegados[j].nome+"("+value.delegados[j].celular1+")";
  				}
  				if(delegados == '|, undefined(undefined)'){
  					delegados = "Não possui vinculação.";
  				}else{
  					delegados = delegados.replace("|,", "");
  				}
  				$scope.markers.push({'id':value.idlocal, 'local':value.local, 'coords': {'latitude':pontos[0], 'longitude':pontos[1]},
  				 'votos':value.qtdvotos, 'endereco':value.endereco, 'bairro':value.bairro, 'cidade':value.cidade, 
  				 'advogados':advogados, 'coordenadores':coordenadores, 'delegados':delegados, 'secoes':secoes, 'fiscais':value.fiscais});
			}
			i++;
		});
	};

  $scope.setRB = function(){
    $scope.municipio = {
      id: 16,
      latitude:  -9.974,
      longitude: -67.8076
    }
    $scope.markers = []; 
    $scope.lat = -9.974;
    $scope.lng = -67.8076; 
    $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 16 };
    locaisMapaService.set($scope.municipio);
    locaisMapaService.getList();
  };

	$scope.setCoord = function(){
		$scope.markers = []; 
		$scope.lat = $scope.municipio.latitude;
		$scope.lng = $scope.municipio.longitude; 
		locaisMapaService.set($scope.municipio);
		locaisMapaService.getList();
	};

	$scope.loadCidades = function(){
		cidadeService.getList();
	};

}]);