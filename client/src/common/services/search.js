angular.module('services.search', ['services.comms']);
angular.module('services.search').factory('search', ['$rootScope', '$location', 'comms', function($rootScope, $location, comms){

	console.log('Initialising search...');

	function searchResultReceived(err, results) {

		if(err) { console.log('error'); return false; }

		console.log('search Results Received');
		console.log(results);

	}

	// expose public functions
	var search = {};

	search.search = function(string) {
		console.log('SEARCH: '+string);

		var searchObject = {'any': [string]};

		comms.emit('jukebox:library:search', searchObject, searchResultReceived);
		// searchResultReceived(false, 'string');
	};

	var mockResults = [
		{
			__model__: 'SearchResult',
			uri: 'local:search'
		},
		{
			__model__: 'SearchResult',
			artists: [
				{
					__model__: 'Artist',
					name: 'Incubus',
					uri: 'spotify:artist:3YcBF2ttyueytpXtEzn1Za'
				}
			],
			albums: [
				{ 
					date: 2012,
					__model__: 'Album',
					artists:    [ [Object] ],
					uri: 'spotify:album:6peEdPVO73WtgGah5sEhX4',
					name: 'The Essential Incubus'
				}

			],
			tracks: [
				{
					album: {
						date: 1999,
						__model__: 'Album',
						artists: '',
						uri: 'spotify:album:2i6nd4FV6y7K9fln6eelmR',
						name: 'Make Yourself'
					},
					__model__: 'Track',
					name: 'Drive',
					uri: 'spotify:track:7nnWIPM5hwE3DaUBkvOIpy',
					length: 233000,
					track_no: 8,
					artists: [ [Object] ],
					date: 1999,
					bitrate: null
				}
			],
			uri: 'spotify:search:incubus'
		}
	];

	return search;

}]);
