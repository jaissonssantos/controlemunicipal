app.controller('addUsuarioController', ['$rootScope', '$scope', '$routeParams', '$location', 'usuarioService', 'cidadeService', 
	function($rootScope, $scope, $routeParams, $location, usuarioService, cidadeService){

	$scope.usuario = {
		id: $routeParams.id
	};
	$scope.cidade = {};
	$scope.cidades = [];

	$rootScope.$on('cidade', function(event, cidade) {
		$scope.cidade = cidade;
	});

	$rootScope.$on('usuario', function(event, usuario) {
		$scope.usuario = usuario;
		if($scope.usuario.cidade){
			$scope.cidades = usuario.cidade;
		}
	});

	$rootScope.$on('usuario:save', function(event, status) {
	    $scope.status = {
	      loading: (status == 'loading'),
	      success: (status == 'success'),
	      error: (status == 'error')
	    };
		if($scope.status.success){
			$location.path('/usuario');
		}
  	});

  	$rootScope.$on('usuario:update', function(event, status) {
	    $scope.status = {
	      loading: (status == 'loading'),
	      success: (status == 'success'),
	      error: (status == 'error')
	    };
		if($scope.status.success){
			$location.path('/usuario');
		}
  	});

  	$rootScope.$on('usuario:password', function(event, status) {
	    $scope.status = {
	      loading: (status == 'loading'),
	      success: (status == 'success'),
	      error: (status == 'error')
	    };
		if($scope.status.success){
			$location.path('/usuario');
		}
  	});

  	$scope.addCidade = function(idcidade){
  		var exists = 0;
  		$scope.cidade.forEach(function(cidade){
  			if(cidade.id == idcidade){
  				$scope.cidades.forEach(function(selected){
  					if(selected.id == idcidade) exists = 1;
  				}); 
  				if(!exists) $scope.cidades.push(cidade);
  			}
  		});
	};

	$scope.delCidade = function(idcidade){
		$scope.cidades.forEach(function(selected, index){
			if(selected.id == idcidade) $scope.cidades.splice(index, 1);
		});
	}

	$scope.save = function() {
		/*set cidade in usuario*/
		$scope.usuario.cidades = $scope.cidades; 
		usuarioService.set($scope.usuario);
		usuarioService.save();
	};
	$scope.load = function() {
		usuarioService.set($scope.usuario);
		usuarioService.load();
		$scope.usuario.cidades = [];
	};
	$scope.update = function() {
		/*set cidade in usuario*/
		$scope.usuario.cidades = $scope.cidades; 
		usuarioService.set($scope.usuario);
		usuarioService.update();
	};
	$scope.updatePassword = function(){
		usuarioService.set($scope.usuario);
		usuarioService.password();
	};
	$scope.loadCidades = function(){
		cidadeService.getListTodos();
	};

}]);
