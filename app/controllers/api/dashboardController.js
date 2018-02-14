'use strict';

app
	.controller('dashboardController',
		[ '$rootScope', '$scope', 'cidadeService', 'advogadoService', 'candidatoService', 'coordenadorService', 'delegadoService', 'fiscalService', 'locaisService',
			function($rootScope, $scope, cidadeService, advogadoService, candidatoService, coordenadorService, delegadoService, fiscalService, locaisService){

				//javascript active item in menu
				$( document ).ready(function() {
					$('[data-slug="dashboard"]').parent('li').addClass('active');
				});

				$scope.cidade = $scope.cidades = {};
				$scope.cid = {};

				//variaveis das porcentagens
				$scope.ap = 0;
				$scope.cp = 0;
				$scope.dp = 0;
				$scope.fp = 0;

				$scope.qtdadv = [{qtd: 0}];
				$scope.qtdadvv = [{qtd: 0}];
				$scope.qtdcand = [{qtd: 0}];
				$scope.qtdcoo = [{qtd: 0}];
				$scope.qtdcoov = [{qtd: 0}];
				$scope.qtddel = [{qtd: 0}];
				$scope.qtddelv = [{qtd: 0}];
				$scope.qtdfis = [{qtd: 0}];
				$scope.qtdfisv = [{qtd: 0}];
				$scope.qtdloc = [{qtd: 0}];

				$rootScope.$on('cidade', function(event, cidade) {
					$scope.cidade = cidade;
					var exists = 0;
					if(cidade!=undefined){
						cidade.forEach(function(cidade){
							if(cidade.id==16){ 
								$scope.cid=cidade.id;
								exists++;
							}

						});
					}
					if(exists) $scope.pegaCidade();							
				});

				$rootScope.$on('qtdadv', function(event, qtdadv) {
					$scope.qtdadv = qtdadv;
				});

				$rootScope.$on('qtdadvv', function(event, qtdadvv) {
					$scope.qtdadvv = qtdadvv;
				});

				$rootScope.$on('qtdcand', function(event, qtdcand) {
					$scope.qtdcand = qtdcand;
				});

				$rootScope.$on('qtdcoo', function(event, qtdcoo) {
					$scope.qtdcoo = qtdcoo;
				});

				$rootScope.$on('qtdcoov', function(event, qtdcoov) {
					$scope.qtdcoov = qtdcoov;
				});

				$rootScope.$on('qtddel', function(event, qtddel) {
					$scope.qtddel = qtddel;
				});

				$rootScope.$on('qtddelv', function(event, qtddelv) {
					$scope.qtddelv = qtddelv;
				});

				$rootScope.$on('qtdfis', function(event, qtdfis) {
					$scope.qtdfis = qtdfis;
				});

				$rootScope.$on('qtdfisv', function(event, qtdfisv) {
					$scope.qtdfisv = qtdfisv;
				});

				$rootScope.$on('qtdloc', function(event, qtdloc) {
					$scope.qtdloc = qtdloc;
				});

				$scope.loadCidades = function(){
					cidadeService.getList();
				};

				$scope.pegaCidade = function(){
					//pega as qtds
				    advogadoService.getQTDPorCidade($scope.cid);
				    advogadoService.getQTDPorCidadeVinculado($scope.cid);
				    candidatoService.getQTDPorCidade($scope.cid);
				    coordenadorService.getQTDPorCidade($scope.cid);
				    coordenadorService.getQTDPorCidadeVinculado($scope.cid);
				    delegadoService.getQTDPorCidade($scope.cid);
				    delegadoService.getQTDPorCidadeVinculado($scope.cid);
				    fiscalService.getQTDPorCidade($scope.cid);
				    fiscalService.getQTDPorCidadeVinculado($scope.cid);
				    locaisService.getQTDPorCidade($scope.cid);
				}

	}]);