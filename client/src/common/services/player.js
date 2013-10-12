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

	/*
	 * (Fuzzy) Search all sources
	 *
	 # Returns results matching 'a' in any backend
	 * search({'any': ['a']})
	 * search(any=['a'])

	 # Returns results matching artist 'xyz' in any backend
	 * search({'artist': ['xyz']})
	 * search(artist=['xyz'])

	 # Returns results matching 'a' and 'b' and artist 'xyz' in any
	 # backend
	 * search({'any': ['a', 'b'], 'artist': ['xyz']})
	 * search(any=['a', 'b'], artist=['xyz'])

	 # Returns results matching 'a' if within the given URI roots
	 # "file:///media/music" and "spotify:"
	 * search({'any': ['a']}, uris=['file:///media/music', 'spotify:'])
	 * search(any=['a'], uris=['file:///media/music', 'spotify:'])
	 */
	player.search = function(string) {
		console.log('SEARCH');
		comms.emit('jukebox:search', string, function(err, results) {

			if(!err) {

				// results contains an object that looks likes this:

				// [
				//     {
				//         __model__: 'SearchResult',
				//         uri: 'local:search'
				//     },
				//     {
				//         __model__: 'SearchResult',
				//         artists: [
				//             {
				//                 __model__: 'Artist',
				//                 name: 'Incubus',
				//                 uri: 'spotify:artist:3YcBF2ttyueytpXtEzn1Za'
				//             },
				//             [Object],
				//             [Object],
				//             [Object]
				//         ],
				//         albums: [
				//             { 
				//                 date: 2012,
				//                 __model__: 'Album',
				//                 artists:    [ [Object] ],
				//                 uri: 'spotify:album:6peEdPVO73WtgGah5sEhX4',
				//                 name: 'The Essential Incubus'
				//             },
				//             [Object],
				//             *snip*
				//             [Object],
				//             [Object]
				//         ],
				//         tracks: [
				//             {
				//                 album: {
				//                     date: 1999,
				//                     __model__: 'Album',
				//                     artists: [Object],
				//                     uri: 'spotify:album:2i6nd4FV6y7K9fln6eelmR',
				//                     name: 'Make Yourself'
				//                 },
				//                 __model__: 'Track',
				//                 name: 'Drive',
				//                 uri: 'spotify:track:7nnWIPM5hwE3DaUBkvOIpy',
				//                 length: 233000,
				//                 track_no: 8,
				//                 artists: [ [Object] ],
				//                 date: 1999,
				//                 bitrate: null
				//             },
				//             [Object],
				//             *snip*
				//             [Object],
				//             [Object]
				//         ],
				//         uri: 'spotify:search:incubus'
				//     }
				// ]

			} else {

				// There was an error with the search

			};

		});
	};

	return player;

}]);
