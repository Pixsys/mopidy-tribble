angular.module('services.search', ['services.comms']);
angular.module('services.search').factory('search', ['$rootScope', '$location', 'comms', function($rootScope, $location, comms){

	console.log('Initialising search...');

	var searchResult = {
		albums: [],
		artists: [],
		tracks: []
	};

	function searchResultReceived(err, results) {

		if(err) { console.log('error', err); return false; }

		// reset search
		searchResult = {
			albums: [],
			artists: [],
			tracks: []
		};

		// for each search location (eg. Spotify, Local)
		for (var i = 0; i < results.length; i++) {

			// for each album
			if(results[i].hasOwnProperty('albums')) {
				for (var j = 0; j < results[i].albums.length; j++) {
					searchResult.albums.push(results[i].albums[j]);
				}
			}

			// for each artist
			if(results[i].hasOwnProperty('artists')) {
				for (var k = 0; k < results[i].artists.length; k++) {
					searchResult.artists.push(results[i].artists[k]);
				}
			}

			// for each track
			if(results[i].hasOwnProperty('tracks')) {
				for (var m = 0; m < results[i].tracks.length; m++) {
					searchResult.tracks.push(results[i].tracks[m]);
				}
			}
		}

		// broadcast results
		$rootScope.$broadcast('search:result', searchResult);
	}

	// expose public functions
	var search = {};

	search.any = function(string) {

		var searchObject = {'any': [string]};

		comms.emit('jukebox:library:search', searchObject, searchResultReceived);

	};

	return search;

}]);
