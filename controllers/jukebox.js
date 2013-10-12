/**
 * Controller dependancies
 */
var Mopidy = require('mopidy').Mopidy;

var mopidy = new Mopidy({
	webSocketUrl: "ws://localhost:6680/mopidy/ws/"
});


var jukebox = {

	online : function() {

		console.log('Mopdiy Online');

		mopidy.playback.getCurrentTrack().then(jukebox.printTrack, console.error.bind(console));

	},
	printTrack : function (track) {
		
		if (track) {
			console.log("Currently playing:", track.name, "by",
			track.artists[0].name, "from", track.album.name);
		} else {
			console.log("No current track");
		}
		
	},
	playbackStarted : function (track) {
		// console.log(track);
		jukebox.printTrack(track.tl_track.track);
	},
	nextTrack : function () {
		mopidy.playback.next();
	},
	previousTrack : function() {
		mopidy.playback.previous();
	},
	pause : function() {
		mopidy.playback.pause();
	},
	play : function() {
		mopidy.playback.play();
	},
	'library' : {

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
		search : function(params, callback) {

			console.log('search called');

			mopidy.library.search(params).then(
				function(data) {
					console.log('search complete');
					callback(null, data);
				},
				console.error
			);

		}
	}
};

exports.jukebox = jukebox;

// mopidy.on(console.log.bind(console));
mopidy.on('state:online', jukebox.online);
mopidy.on('event:trackPlaybackStarted', jukebox.playbackStarted);

