'use strict';
$nvc.directive('messageBody', [function () {
	return {
		restrict: 'E',
		templateUrl: 'partials/message-body.directive.html',
		controller: function ($http, handler, $scope, $rootScope) {
			var messages = this;
			messages.uploadFlag = true;
			messages.message = [];
			$rootScope.$on('new', function () {
				messages.activeContact = handler.activeContact;
				handler.dbMessages.allDocs({
					include_docs: true,
					descending: true
				}, function (err, doc) {
					if (!err) {
						doc.rows.some(function (todo) {
							if (todo.doc.id === handler.activeContact.username) {
								messages.message = todo.doc;
								return todo.doc.id === handler.activeContact.username;
							} else {
								messages.message = [];
							}
						});
					} else {
						console.log('Change error' + err);
					}
				});
			});

			handler.dbMessages.info(function (err, info) {
				handler.dbMessages.changes({
					since: info.update_seq,
					continuous: true,
					include_docs: true,
					descending: true,
					onChange: onChange
				});
			});

			function onChange(change) {
				handler.dbMessages.allDocs({
					include_docs: true,
					descending: true
				}, function (err, doc) {
					if (!err) {
						console.log('dekhe : ' + JSON.stringify(change));
						doc.rows.some(function (todo) {
							if (todo.doc.id === handler.activeContact.username) {
								messages.message = todo.doc;
								return todo.doc.id === handler.activeContact.username;
							} else {
								messages.message = [];
							}
						});
					} else {
						console.log('Change error' + err);
					}
				});
			}
			messages.upload = function () {
				messages.uploadFlag = false;
			};
			messages.audio = function () {
				$scope.$broadcast('audio');
				console.log('audio call requested');
			};
			messages.video = function () {
				$scope.$broadcast('video');
				console.log('video call requested');
			};
		},
		controllerAs: 'message'
	};
}]);
