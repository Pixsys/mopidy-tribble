angular.module('services.player', []);
angular.module('services.player').factory('player', ['$rootScope', '$location', function($rootScope, $location){

	console.log('Initialising player...');

	var player = {};

	player.test = function() {
		console.log('TEST WORKS');
	};

	return player;

}]);