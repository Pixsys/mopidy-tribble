angular.module('services.player', ['services.comms']);
angular.module('services.player').factory('player', ['$rootScope', '$location', 'comms', function($rootScope, $location, comms){

	// expose public functions
	var player = {};

	function playbackWasStarted(data) {
		$rootScope.$broadcast('playback:started', data);
	}

	function bindEvents() {
		comms.on('playback:started', playbackWasStarted);
	}

	function init() {

		console.log('Initialising player...');
		bindEvents();
	}

	// go
	init();

	comms.on('playback:started', function(data) {
		$rootScope.$broadcast('playback:started', data);
	});

	player.play = function(track) {
		console.log('PLAY');
		if(track) {
			console.log(track.uri);
			comms.emit('jukebox:playTrack', track.uri);
		} else {
			comms.emit('jukebox:play');
		}
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

	return player;

}]);
