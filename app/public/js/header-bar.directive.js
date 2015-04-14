'use strict';
$nvc.factory('GUI', function () {
		return require('nw.gui');
	})
	.factory('win', ['GUI', function (gui) {
		return gui.Window.get();
	}])
	.directive('headerBar', ['GUI', 'win', function (GUI, win) {
		return {
			restrict: 'E', //element directive
			templateUrl: 'partials/header-bar.directive.html', //serving template
			link: function (s) {
				win.isMaximized = false; //knowing window status for maximise
				win.isFullscreen = false; //knowing window status for fullscreen
				var landscape = true;
				// Window Minimise
				s.winMin = function () {
					win.minimize();
				};
				// Window Close
				s.winClo = function () {
					win.close();
				};
				// Window Maximise Toggle
				s.winMax = function () {
					if (win.isMaximized) {
						win.unmaximize();
					} else {
						win.maximize();
					}
				};
				// Window Rotate Toggle
				s.winRot = function () {
					if (landscape) {
						win.resizeTo(380, 720);
						win.moveTo(0, 0);
						landscape = false;
					} else {
						win.resizeTo(1200, 600);
						win.moveTo(0, 0);
						landscape = true;
					}
				};
				// Window FullScreen Toggle
				s.winFul = function () {
					win.toggleFullscreen();
				};
				win.on('maximize', function () {
					win.isMaximized = true;
				});
				win.on('unmaximize', function () {
					win.isMaximized = false;
				});
			}
		};
	}]);
