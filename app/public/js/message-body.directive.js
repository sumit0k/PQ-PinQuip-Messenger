'use strict';
$nvc.directive('messageBody', [function () {
	return {
		restrict: 'E',
		templateUrl: 'partials/message-body.directive.html',
		controller: function ($http, handler, $scope, $rootScope) {
			var message = this;
			this.message = {};
			this.message.messages = [{
				type: 'system',
				body: 'March 10, 2015'
			}, {
				type: 'in',
				body: 'Hi :smile:',
				meta: '11:10 AM'
			}, {
				type: 'out',
				body: 'Hey :smile:',
				meta: '11:10 AM'
			}, {
				type: 'in',
				body: 'Fine :heart:',
				meta: '11:10 AM'
			}];
		},
		controllerAs: 'message'
	};
}]);
