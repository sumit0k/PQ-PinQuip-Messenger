'use strict';
$nvc.directive('pqVideoChat', ['LxDialogService', 'LxNotificationService', '$sce', function (LxDialogService, LxNotificationService, $sce) {
	return {
		restrict: 'E',
		templateUrl: 'partials/pq-videochat.directive.html',
		controller: function (handler, $scope) {
			$scope.$on('registration', function () {
				var s = $scope;
				s.localStream = '';
				s.isDisabled = false;
				s.callInProgressStatus = false;
				//     s.serverClose=function(){
				//     //LxDialogService.close('server_select');
				//     LxNotificationService.info('Server cs');
				// }
				// Request video stream
				navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

				// //serverip = prompt('Enter Server IP address', '"localhost');
				// if (serverip === null || serverip === '') {
				// 	console.log('Error picking up server id');
				// }
				// var userid = $scope.mydetail.username;
				// //userid = prompt('Enter your userid, empty string for new ID', 'sumitkumar1209');
				// if (userid === null || userid === '') {
				// 	// New peer connection with our server provides userid
				// 	console.log('Error picking up user id');
				// } else {
				// 	console.log('peerjs presented mydetai username' + JSON.stringify(userid));
				// 	console.log('peerjs presented server' + JSON.stringify($scope.server));
				// 	// New peer connection with our custom id
				// 	peer = new Peer(userid, {　
				// 		host: serverip,
				// 		secure: false,
				// 		port: 9000,
				// 		path: '',
				// 		debug: 3
				// 	});
				// }


				// Listen to incoming calls
				handler.peer.on('call', function (call) {
					// ask the user if he wants to answer the call

					// THIS DOES SHOW THE PEER VIDEO STREAM
					// FOR THE CALL INITIATOR
					// WHY!!!!???

					LxDialogService.open('answerCall');

					s.answer = function () {
						initSelfVideo(function () {
							call.answer(s.localStream);
							handleCall(call);
							LxDialogService.close('answerCall');
						});
					};

					s.reject = function () {
						call.close();
						LxDialogService.close('answerCall');
						s.callInProgress.close();
						s.callInProgressStatus = false;
						//s.endCall();
						LxNotificationService.info('Call Rejected');
					};
				});

				handler.peer.on('error', function (err) {
					s.error = err;
				});

				handler.peer.on('disconnected', function () {
					s.localVdoURL = '';
					//s.localStream.stop();
					s.isDisabled = false;
					s.callInProgressStatus = false;
					//LxDialogService.close('videos');
					LxNotificationService.info('Call ended');
				});

				handler.peer.on('close', function () {
					s.localVdoURL = '';
					//s.localStream.stop();
					s.isDisabled = false;
					s.callInProgressStatus = false;
					//LxDialogService.close('videos');
					LxNotificationService.info('Call ended');
				});


				$scope.$on('video', function () {
					$scope.activeContact = handler.activeContact;
					s.peerId = $scope.activeContact.username;
					s.isDisabled = true;
					console.log('video call presented to peer id' + s.peerId);
					initSelfVideo(function () {
						handleCall(handler.peer.call(s.peerId, s.localStream));
					});
				});
				$scope.$on('audio', function () {
					$scope.activeContact = handler.activeContact;
					s.peerId = $scope.activeContact.username;
					s.isDisabled = true;
					console.log('audio call presented to peer id' + s.peerId);
					initSelfAudio(function () {
						handleCall(handler.peer.call(s.peerId, s.localStream));
					});
				});
				s.endCall = function () {
					s.callInProgress.close();
					s.callInProgressStatus = false;
					LxDialogService.close('videos');
					LxNotificationService.info('Call ended');
				};

				function initSelfVideo(cb) {
					LxNotificationService.info('Streaming media data');
					navigator.getUserMedia({
						audio: true,
						video: true
					}, function (stream) {
						s.localStream = stream;
						s.localVdoURL = $sce.trustAsResourceUrl(URL.createObjectURL(stream));
						cb();
					}, function () {
						s.error = 'Unable to access your camera, Please try again';
					});
				}

				function initSelfAudio(cb) {
					LxNotificationService.info('Streaming media data');
					navigator.getUserMedia({
						audio: true,
						video: true
					}, function (stream) {
						s.localStream = stream;
						s.localVdoURL = $sce.trustAsResourceUrl(URL.createObjectURL(stream));
						cb();
					}, function () {
						s.error = 'Unable to access your camera, Please try again';
					});
				}

				function handleCall(call) {
					if (s.callInProgressStatus) {
						s.callInProgress.close();
					}
					// if (handler.call) {
					// 	handler.call.on('stream', function (peerStream) {
					// 		s.peerVdoURL = $sce.trustAsResourceUrl(URL.createObjectURL(peerStream));
					// 		s.$apply();
					// 	});
					// }
					call.on('stream', function (peerStream) {
						s.peerVdoURL = $sce.trustAsResourceUrl(URL.createObjectURL(peerStream));
						s.$apply();
					});

					s.callInProgress = call;
					LxDialogService.open('videos');
				}
			});
		}
	};
}]);
