'use strict';
var $nvc = angular.module('pq-videochat', ['lumx'])
    .factory('GUI', function() {
        return require('nw.gui');
    })
    .factory('win', ['GUI', function(gui) {
        return gui.Window.get();
    }])
    .controller('DialogCtrl',['$scope','LxDialogService', 'LxNotificationService',function($scope,LxDialogService, LxNotificationService){
        $scope.opendDialog=function(dialogId){
            LxDialogService.open(dialogId);
        }
        $scope.closingDialog=function(){
            LxNotificationService.info('Dialog closed!');
        }
    }])
    .controller('MessageController',function(){
        this.tab=1;
        this.selectTab=function(setTab){
            this.tab=setTab;
        };
        this.isSelected=function(checkTab){
            return this.tab===checkTab;
        };
    })
    .directive('rightSidebar',function(){
        return{
            restrict: 'E',
            templateUrl: 'partials/right-sidebar.html'
        };
        })
    .run(['GUI', 'win', function(GUI, win) {
        win.isMaximized = false;
        win.isFullscreen=false;
        var landscape=true;
        document.getElementById('windowControlMinimize').onclick = function()
        {
            win.minimize();
        };
        document.getElementById('windowControlClose').onclick = function()
        {
            win.close();
        };
        document.getElementById('windowControlMaximize').onclick = function()
        {
            if (win.isMaximized)
                win.unmaximize();
            else
                win.maximize();
        };
        document.getElementById('windowControlRotate').onclick = function()
        {
            if (landscape){
                win.resizeTo(380,720);
                win.moveTo(0,0);
                landscape=false;
            }
            
            else{
                win.resizeTo(1200,600);
                win.moveTo(0,0);
                landscape=true;
            }
        };
        document.getElementById('windowControlFullscreen').onclick = function()
        {
                win.toggleFullscreen();
        };
        win.on('maximize', function(){
            win.isMaximized = true;
        });
        win.on('unmaximize', function(){
            win.isMaximized = false;
        });
    }])
    ;

$(document).ready(function () {
$('#main').on('click','#close',show);
});
function show(){
    alert('Hello' + $('right-sidebar').length);
}
