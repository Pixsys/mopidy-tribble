'use strict';

/* Controllers */

angular.module('myApp.controllers', [$scope]).
controller('MyCtrl1', [function($scope, commsService) {
	$scope.data = "Example";	
	console.log('log');

}])
.controller('MyCtrl2', [function() {

}]);