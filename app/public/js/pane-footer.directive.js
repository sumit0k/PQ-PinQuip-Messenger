'use strict';
$nvc.directive('paneFooter', function () {
	return {
		restrict: 'E',
		templateUrl: 'partials/pane-footer.directive.html',
		controller: function (handler, $rootScope, $scope) {
			$scope.emojiMessage = {};
			$scope.decodeType = 'colon';
			$scope.emojiMessage.replyToUser = function () {
				alert('You typed ' + $scope.emojiMessage.messagetext);
			};
			// 	var footer = this;
			// 	$rootScope.$on('new', function () {
			// 		handler.peer.on('connection', connect);

			// 		function connect(c) {
			// 				//LxNotificationService.info('connect called:  ' + JSON.stringify(c));
			// 				c.on('data', function (data) {
			// 					LxNotificationService.info(data, 'arrow-down-bold', true);
			// 				});
			// 			}
			// 			//footer.requestedPeer = handler.activeContact.username;
			// 			//LxNotificationService.info('requestedPeer:  ' + JSON.stringify(handler.activeContact.username));
			// 		handler.c = handler.peer.connect(handler.activeContact.username, {
			// 			label: 'chat',
			// 			serialization: 'none',
			// 			metadata: {
			// 				message: 'hi i want to chat with you!'
			// 			}
			// 		});
			// 		handler.c.on('open', function () {
			// 			//LxNotificationService.info('data open:  ' + JSON.stringify(handler.c));
			// 			connect(handler.c);
			// 		});
			// 	});
			// 	footer.sendMessage = function () {
			// 		// if (!($event.which === 13)) {
			// 		// 	return;
			// 		// }
			// 		// if (footer.message === 0) {
			// 		// 	return;
			// 		// }
			// 		//console.log('calll' + footer.message);
			// 		LxNotificationService.success(handler.mydetail.nick + ' :  ' + footer.message);
			// 		// handler.dbMessages.allDocs({
			// 		// 	include_docs: true,
			// 		// 	descending: true
			// 		// }, function (err, doc) {
			// 		// 	if (!err) {
			// 		// 		doc.rows.some(function (todo) {
			// 		// 			if (todo.doc.id === handler.activeContact.id) {
			// 		// 				todo.doc.message.push(footer.message);
			// 		// 				//								messages.message = todo.doc;
			// 		// 				return true;
			// 		// 			} else {
			// 		// 				//messages.message = [];
			// 		// 			}
			// 		// 		});
			// 		// 		//console.log('change' + JSON.stringify());
			// 		// 		//left.ContactsCheck.push(JSON.stringify(change.doc));
			// 		// 	} else {
			// 		// 		console.log('Change error' + err);
			// 		// 	}
			// 		// });

			// 		//console.log('send to ' + handler.activeContact.username);
			// 		//LxNotificationService.info('sending to :  ' + handler.activeContact.username);
			// 		// handler.dbMessages.post({
			// 		//
			// 		// 	_id: handler.activeContact.username,
			// 		// 	messages: [{
			// 		// 		type: 'out',
			// 		// 		author: handler.mydetail.nick,
			// 		// 		body: footer.message,
			// 		// 		meta: new Date().getTime()
			// 		// 	}]
			// 		// });
			// 		handler.c.on('error', function (err) {
			// 			LxNotificationService.error('data sending error:  ' + err);
			// 		});
			// 		footer.msg = handler.mydetail.nick + ' :  ' + footer.message;
			// 		footer.message = '';
			// 		handler.c.send(footer.msg);
			// 		//LxNotificationService.success('data sending function:  ' + footer.msg);
			// 	};
		},
		controllerAs: 'footer'
	};
});
