angular.module('services.playlist', ['services.comms']);
angular.module('services.playlist').factory('playlist', ['$rootScope', '$location', 'comms', function($rootScope, $location, comms){

	var playlist = {};

	playlist.voteDown = function(track) {
		console.log('DOWN VOTE TRACK');
		comms.emit('jukebox:voteDown', track.uri);
	};

	playlist.voteUp = function(track) {
		console.log('UP VOTE TRACK');
		comms.emit('jukebox:voteUp', track.uri);
	};

	return playlist;

}]);
