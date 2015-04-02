'use strict';
$nvc.directive('pqVideoChat', ['LxDialogService', 'LxNotificationService', '$sce', function(LxDialogService, LxNotificationService, $sce) {
    return {
        restrict: 'E',
        templateUrl: 'partials/pq-videochat.directive.html',
        link: function(s, e, a) {
            s.statusMsg = 'Loading..',
                s.id = '',
                s.localStream = '',
                s.isDisabled = false,
                s.callInProgress = false;

            setTimeout(function() {
                LxDialogService.open('statusModal');
                s.statusMsg = 'Contacting Peer Server...';
            }, 0);
                        // Request video stream
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
        var serverip="";
        //serverip = prompt("Enter Server IP address", "localhost");
        if (serverip==null||serverip==""){
            serverip='localhost';
        }
        var userid="";
        //userid=prompt("Enter your userid, empty string for new ID","sumitkumar1209");
        if(userid==null||userid==""){
           // New peer connection with our custom server
            var peer = new Peer({　
                host: serverip,
                secure: false,
                port: 9000,
                path:'',
                debug: 3
            });
        }
        else{
                       // New peer connection with our heroku server
            var peer = new Peer(userid,{　
                host: serverip,
                secure: false,
                port: 9000,
                path:'',
                debug: 3
            });
        }

            peer.on('open', function(id) {
                s.id = id;
                s.statusMsg = 'Connected to Peer Server...';
                s.statusMsg = 'Streaming local video...';



                LxDialogService.close('statusModal');


            });

            // Listen to incoming calls
            peer.on('call', function(call) {
                // ask the user if he wants to answer the call

                // THIS DOES SHOW THE PEER VIDEO STREAM
                // FOR THE CALL INITIATOR
                // WHY!!!!???

                //LxDialogService.open('answerCall');

                //s.answer = function() {
                initSelfVideo(function() {
                    call.answer(s.localStream);
                    handleCall(call);
                    //LxDialogService.close('answerCall');
                });
                //}

                // s.reject = function() {
                //     LxNotificationService.info('Call Rejected');
                //     call.close();
                //     LxDialogService.close('answerCall');
                // }
            });

            peer.on('error', function(err) {
                s.error = err;
            });

            s.startCall = function($event) {
                if ($event.which === 13) {
                    s.isDisabled = true;
                    initSelfVideo(function() {
                        handleCall(peer.call(s.peerId, s.localStream));
                    });
                }
            };

            s.endCall = function() {
                s.callInProgress.close();
                s.callInProgress = false;
            };

            function initSelfVideo(cb) {
                navigator.getUserMedia({
                    audio: true,
                    video: true
                }, function(stream) {
                    s.localStream = stream;
                    s.localVdoURL = $sce.trustAsResourceUrl(URL.createObjectURL(stream));
                    cb();
                }, function() {
                    s.error = 'Unable to access your camera, Please try again';
                });
            }

            function handleCall(call) {
                if (s.callInProgress) {
                    s.callInProgress.close();
                }

                call.on('stream', function(peerStream) {
                    s.peerVdoURL = $sce.trustAsResourceUrl(URL.createObjectURL(peerStream));
                    s.$apply();
                });

                s.callInProgress = call;
            }

        }
    };
}])
