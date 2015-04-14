'use strict';
$nvc.directive('rightSidebar', function () {
	return {
		restrict: 'E',
		templateUrl: 'partials/right-sidebar.directive.html',
		controller: function ($scope, handler) {
			var right = this;
			$scope.$on('new', function () {
				right.activeContact = handler.activeContact;
			});
		},
		controllerAs: 'right'
	};
});
