'use strict';
var $nvc = angular.module('pinquip-messenger', ['lumx'])
	.controller('MainCtrl', ['$scope', 'LxDialogService', 'LxNotificationService', function ($scope, LxDialogService, LxNotificationService) {
		this.infoBar = 0;
		$scope.opendDialog = function (dialogId) {
			LxDialogService.open(dialogId);
		};
		$scope.info = function () {
			this.infoBar = 1;
		};
		$scope.close = function () {
			this.infoBar = 0;
		};
		// $scope.serverClose=function(){
		//     //LxDialogService.close('server_select');
		//     LxNotificationService.info('Server Saved');
		// }
	}])
	.directive('dialogBoxes', function () {
		return {
			restrict: 'E',
			templateUrl: 'partials/dialog-boxes.html'
		};
	});

$(document).ready(function () {
	$('#main').on('click', '#close', show);
});

function show() {
	//alert('Hello' + $('right-sidebar').length);
}
