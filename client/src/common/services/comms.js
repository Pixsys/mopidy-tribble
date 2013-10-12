angular.module('services.comms', []);
angular.module('services.comms').factory('comms', ['$rootScope', '$location', function($rootScope, $location){

	console.log('Initialising comms...');

	var comms = {};

	comms.test = function() {
		console.log('TEST WORKS');
	};

	return comms;

}]);