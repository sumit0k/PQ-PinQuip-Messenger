'use strict';
$nvc.directive('leftSidebar',function(){
    return{
        restrict:'E',
        templateUrl:'partials/left-sidebar.directive.html',
        controller:function(){
        	this.selectTab = function(setTab){

        	};
        	this.isSelected = function(checkTab){

        	};
        },
        controllerAs:'left'
    };
});