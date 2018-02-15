app.service('locaisMapaService', ['$rootScope', '$timeout', '$http', function($rootScope, $timeout, $http) {

  var self = this;

  this.set = function(local) {
    self.local = local;
    $rootScope.$broadcast("local", local);
  };

  this.setIds = function(ids){
    self.ids = ids;
  };

  this.getList = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/jsonresultadomapa.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/jsonresultadomapaop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListAcrelandia20141turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisacrelandia20141turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListAssisBrasil20141turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisassisbrasil20141turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListBrasileia20141turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisbrasileia20141turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListBujari20141turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisbujari20141turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListCapixaba20141turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaiscapixaba20141turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListCruzeiroDoSul20141turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaiscruzeirodosul20141turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListEpitaciolandia20141turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisepitaciolandia20141turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListFeijo20141turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisfeijo20141turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListJordao20141turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisjordao20141turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListMancioLima20141turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaismanciolima20141turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListManoelUrbano20141turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaismanoelurbano20141turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListMarechalThaumaturgo20141turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaismarechalthaumaturgo20141turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListPlacidoDeCastro20141turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisplacidodecastro20141turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListPortoAcre20141turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisportoacre20141turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListPortoWalter20141turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisPortoWalter20141turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListRioBranco20141turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisriobranco20141turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListRodriguesAlves20141turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisRodriguesAlves20141turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListSantaRosaDoPurus20141turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaissantarosadopurus20141turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListSenadorGuiomard20141turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaissenadorguiomard20141turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListSenaMadureira20141turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaissenamadureira20141turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListTarauaca20141turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaistarauaca20141turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListXapuri20141turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisxapuri20141turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };


  this.getListAcrelandia20141turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisacrelandia20141turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListAssisBrasil20141turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisassisbrasil20141turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListBrasileia20141turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisbrasileia20141turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListBujari20141turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisbujari20141turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListCapixaba20141turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaiscapixaba20141turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListCruzeiroDoSul20141turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaiscruzeirodosul20141turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListEpitaciolandia20141turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisepitaciolandia20141turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListFeijo20141turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisfeijo20141turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListJordao20141turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisjordao20141turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListMancioLima20141turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaismanciolima20141turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListManoelUrbano20141turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaismanoelurbano20141turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListMarechalThaumaturgo20141turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaismarechalthaumaturgo20141turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListPlacidoDeCastro20141turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisplacidodecastro20141turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListPortoAcre20141turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisportoacre20141turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListPortoWalter20141turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisPortoWalter20141turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListRioBranco20141turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisriobranco20141turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListRodriguesAlves20141turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisRodriguesAlves20141turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListSantaRosaDoPurus20141turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaissantarosadopurus20141turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListSenadorGuiomard20141turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaissenadorguiomard20141turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListSenaMadureira20141turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaissenamadureira20141turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListTarauaca20141turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaistarauaca20141turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListXapuri20141turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisxapuri20141turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListAcrelandia20142turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisacrelandia20142turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListAssisBrasil20142turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisassisbrasil20142turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListBrasileia20142turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisbrasileia20142turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListBujari20142turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisbujari20142turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListCapixaba20142turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaiscapixaba20142turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListCruzeiroDoSul20142turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaiscruzeirodosul20142turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListEpitaciolandia20142turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisepitaciolandia20142turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListFeijo20142turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisfeijo20142turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListJordao20142turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisjordao20142turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListMancioLima20142turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaismanciolima20142turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListManoelUrbano20142turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaismanoelurbano20142turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListMarechalThaumaturgo20142turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaismarechalthaumaturgo20142turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListPlacidoDeCastro20142turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisplacidodecastro20142turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListPortoAcre20142turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisportoacre20142turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListPortoWalter20142turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisPortoWalter20142turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListRioBranco20142turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisriobranco20142turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListRodriguesAlves20142turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisRodriguesAlves20142turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListSantaRosaDoPurus20142turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaissantarosadopurus20142turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListSenadorGuiomard20142turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaissenadorguiomard20142turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListSenaMadureira20142turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaissenamadureira20142turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListTarauaca20142turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaistarauaca20142turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListXapuri20142turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisxapuri20142turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListAcrelandia20101turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisacrelandia20101turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListAssisBrasil20101turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisassisbrasil20101turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListBrasileia20101turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisbrasileia20101turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListBujari20101turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisbujari20101turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListCapixaba20101turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaiscapixaba20101turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListCruzeiroDoSul20101turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaiscruzeirodosul20101turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListEpitaciolandia20101turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisepitaciolandia20101turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListFeijo20101turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisfeijo20101turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListJordao20101turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisjordao20101turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListMancioLima20101turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaismanciolima20101turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListManoelUrbano20101turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaismanoelurbano20101turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListMarechalThaumaturgo20101turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaismarechalthaumaturgo20101turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListPlacidoDeCastro20101turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisplacidodecastro20101turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListPortoAcre20101turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisportoacre20101turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListPortoWalter20101turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisPortoWalter20101turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListRioBranco20101turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisriobranco20101turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListRodriguesAlves20101turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisRodriguesAlves20101turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListSantaRosaDoPurus20101turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaissantarosadopurus20101turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListSenadorGuiomard20101turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaissenadorguiomard20101turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListSenaMadureira20101turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaissenamadureira20101turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListTarauaca20101turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaistarauaca20101turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListXapuri20101turno = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisxapuri20101turno.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };


  this.getListAcrelandia20101turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisacrelandia20101turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListAssisBrasil20101turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisassisbrasil20101turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListBrasileia20101turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisbrasileia20101turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListBujari20101turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisbujari20101turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListCapixaba20101turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaiscapixaba20101turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListCruzeiroDoSul20101turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaiscruzeirodosul20101turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListEpitaciolandia20101turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisepitaciolandia20101turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListFeijo20101turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisfeijo20101turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListJordao20101turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisjordao20101turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListMancioLima20101turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaismanciolima20101turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListManoelUrbano20101turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaismanoelurbano20101turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListMarechalThaumaturgo20101turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaismarechalthaumaturgo20101turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListPlacidoDeCastro20101turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisplacidodecastro20101turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListPortoAcre20101turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisportoacre20101turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListPortoWalter20101turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisPortoWalter20101turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListRioBranco20101turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisriobranco20101turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListRodriguesAlves20101turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisRodriguesAlves20101turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListSantaRosaDoPurus20101turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaissantarosadopurus20101turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListSenadorGuiomard20101turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaissenadorguiomard20101turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListSenaMadureira20101turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaissenamadureira20101turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListTarauaca20101turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaistarauaca20101turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };

  this.getListXapuri20101turnoOp = function(){
    $rootScope.$broadcast("locais:loading", true);
    $http.post('controller/localvotacao/locaisxapuri20101turnoop.json')
    .success(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("locais", item);
    })
    .error(function(item){
      $rootScope.$broadcast("locais:loading", false);
      $rootScope.$broadcast("local", item);
    });
  };


}]);
