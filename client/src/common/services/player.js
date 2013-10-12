angular.module('services.player', ['services.comms']);
angular.module('services.player').factory('player', ['$rootScope', '$location', 'comms', function($rootScope, $location, comms){

	console.log('Initialising player...');

	var player = {};

	player.play = function() {
		console.log('PLAY');
		comms.emit('jukebox:play');
	};

	player.pause = function() {
		console.log('PAUSE');
		comms.emit('jukebox:pause');
	};

	player.nextTrack = function() {
		console.log('NEXT');
		comms.emit('jukebox:nextTrack');
	};

	player.previousTrack = function() {
		console.log('PREVIOUS');
		comms.emit('jukebox:previousTrack');
	};

	player.search = function(string) {
		console.log('SEARCH');
		comms.emit('jukebox:search', string);
	};

	return player;

}]);
