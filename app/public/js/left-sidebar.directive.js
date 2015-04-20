'use strict';
$nvc.directive('leftSidebar', function () {
	return {
		restrict: 'E',
		templateUrl: 'partials/left-sidebar.directive.html',
		controller: function ($http, handler, $rootScope, $scope, $timeout, $mdSidenav, $log) {
			$scope.close = function () {
				$mdSidenav('left').close()
					.then(function () {
						$log.debug('close LEFT is done');
					});
			};
		},
		controllerAs: 'left'
	};
});
