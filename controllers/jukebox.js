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

		search : function(params, callback) {

			mopidy.library.search(params).then(function(data) {
				console.log(data);
			},
				console.error.bind(console)
			);

		}
	}
};

exports.jukebox = jukebox;

// mopidy.on(console.log.bind(console));
mopidy.on('state:online', jukebox.online);
mopidy.on('event:trackPlaybackStarted', jukebox.playbackStarted);

