'use strict';
var $nvc = angular.module('pinquip-messenger', ['ngSanitize', 'emojiApp', 'blueimp.fileupload', 'pouchdb', 'ngMaterial', 'ui.materialize'])
	.config(function ($mdThemingProvider) {
		$mdThemingProvider.theme('default')
			.primaryPalette('teal', {
				'default': '500', // by default use shade 400 from the pink palette for primary intentions
				'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
				'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
				'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
			})
			.accentPalette('cyan', {
				'default': '400', // by default use shade 400 from the pink palette for primary intentions
				'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
				'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
				'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
			})
			.warnPalette('amber')
			.backgroundPalette('grey', {
				'default': '300', // by default use shade 400 from the pink palette for primary intentions
				'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
				'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
				'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
			})
			//.dark()
		;
		$mdThemingProvider.theme('altTheme')
			.primaryPalette('green', {
				'default': '300', // by default use shade 400 from the pink palette for primary intentions
				'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
				'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
				'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
			}) // specify primary color, all
			// other color intentions will be inherited
			// from default
		;
		$mdThemingProvider.theme('dialogTheme')
			.primaryPalette('green', {
				'default': '300', // by default use shade 400 from the pink palette for primary intentions
				'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
				'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
				'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
			}) // specify primary color, all
			// other color intentions will be inherited
			// from default
			.backgroundPalette('red', {
				'default': '100', // by default use shade 400 from the pink palette for primary intentions
				'hue-1': '300', // use shade 100 for the <code>md-hue-1</code> class
				'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
				'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
			});
	})
	.controller('MainCtrl', function ($rootScope, $scope, handler, $http, $timeout, $mdSidenav, $log, $mdDialog) {
		$scope.toggleLeft = function () {
			$mdSidenav('left').toggle()
				.then(function () {
					$log.debug('toggle left is done');
				});
		};
		$scope.toggleRight = function () {
			$mdSidenav('right').toggle()
				.then(function () {
					$log.debug('toggle RIGHT is done');
				});
		};
		$scope.registrationForm = function (ev) {
			$mdDialog.show({
					controller: DialogController,
					templateUrl: 'partials/registration.html',
					targetEvent: ev,
				})
				.then(function (answer) {
					//$scope.alert = 'You said the information was "' + answer + '".';
				}, function () {
					//$scope.alert = 'You cancelled the dialog.';
				});
		};

		function DialogController($scope, $mdDialog) {
			$scope.hide = function () {
				$mdDialog.hide();
			};
			$scope.cancel = function () {
				$mdDialog.cancel();
			};
			$scope.answer = function (answer) {
				$mdDialog.hide(answer);
			};
		}
	})
	.service('handler', function Greeting($http, $rootScope, pouchDB) {

	});
// Jquery DOM manipulation Hiding and Showing Elements
$(document).ready(function () {

});
