'use strict';
$nvc.directive('rightSidebar', function () {
	return {
		restrict: 'E',
		templateUrl: 'partials/right-sidebar.directive.html',
		controller: function ($scope, handler, $timeout, $mdSidenav, $log) {
			$scope.close = function () {
				$mdSidenav('right').close()
					.then(function () {
						$log.debug('close RIGHT is done');
					});
			};
		},
		controllerAs: 'right'
	};
});
