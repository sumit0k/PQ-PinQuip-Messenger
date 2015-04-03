'use strict';
$nvc.directive('pqVideoChat', ['LxDialogService', 'LxNotificationService', '$sce', function (LxDialogService, LxNotificationService, $sce) {
	return {
		restrict: 'E',
		templateUrl: 'partials/pq-videochat.directive.html',
		link: function (s) {
			s.statusMsg = 'Loading..',
				s.id = '',
				s.localStream = '',
				s.isDisabled = false,
				s.callInProgressStatus = false;

			setTimeout(function () {
				//LxDialogService.open('server_select');
				LxDialogService.open('statusModal');
				s.statusMsg = 'Contacting Peer Server...';
			}, 0);
			//     s.serverClose=function(){
			//     //LxDialogService.close('server_select');
			//     LxNotificationService.info('Server cs');
			// }
			// Request video stream
			navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
			var serverip = '';
			var peer;
			//serverip = prompt("Enter Server IP address", "localhost");
			if (serverip === null || serverip === '') {
				serverip = 'pinquip-peerjs.herokuapp.com';
			}
			var userid = '';
			userid=prompt("Enter your userid, empty string for new ID","sumitkumar1209");
			if (userid === null || userid === '') {
				// New peer connection with our server provides userid
				peer = new Peer({　
					host: serverip,
					secure: true,
					port: 443,
					path: '',
					debug: 3
				});
			} else {
				// New peer connection with our custom id
				peer = new Peer(userid, {　
					host: serverip,
					secure: true,
					port: 443,
					path: '',
					debug: 3
				});
			}

			peer.on('open', function (id) {
				s.id = id;
				s.statusMsg = 'Connected to Peer Server...';
				s.statusMsg = 'Streaming local video...';
				LxDialogService.close('statusModal');
				LxDialogService.close('server_select');
			});

			// Listen to incoming calls
			peer.on('call', function (call) {
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

			peer.on('error', function (err) {
				s.error = err;
			});

			peer.on('disconnected', function () {
				s.localVdoURL = '',
					s.isDisabled = false,
					s.callInProgressStatus = false;
			});

			peer.on('close', function () {
				s.localVdoURL = '',
					s.isDisabled = false,
					s.callInProgressStatus = false;
			});

			s.startCall = function ($event) {
				if ($event.which === 13) {
					s.isDisabled = true;
					initSelfVideo(function () {
						handleCall(peer.call(s.peerId, s.localStream));
					});
				}
			};

			s.endCall = function () {
				s.callInProgress.close();
				s.callInProgressStatus = false;
				LxDialogService.close('videos');
				LxNotificationService.info('Call ended');
			};

			function initSelfVideo(cb) {
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

				call.on('stream', function (peerStream) {
					s.peerVdoURL = $sce.trustAsResourceUrl(URL.createObjectURL(peerStream));
					s.$apply();
				});
				s.callInProgress = call;
				LxDialogService.open('videos');
			}

		}
	};
}]);
