app.controller('deleteAssociarFiscalController', ['$rootScope', '$scope', '$uibModalInstance', '$location', 'fiscal', 'info', 'associarFiscalService',
function($rootScope, $scope, $uibModalInstance, $location, fiscal, info, associarFiscalService) {

	$scope.associar = {
		id: fiscal.id
	};
	$scope.info = info;

	$rootScope.$on('associado:delete:local', function(event, status) {
	    $scope.status = {
	      loading: (status == 'loading'),
	      success: (status == 'success'),
	      error: (status == 'error')
	    };
		if($scope.status.success){
			$location.path('/associar/fiscal/add');
		}
  	});

	$scope.ok = function(){
		associarFiscalService.deleteLocal($scope.associar);
	}

}]);