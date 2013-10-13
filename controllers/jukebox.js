/**
 * Controller dependancies
 */
var Mopidy = require('mopidy').Mopidy;
var events = require('events');

/**
 * Exports the module.
 */
exports = module.exports = new jukebox;

/**
 * Jukebox constructor.
 */
function jukebox(options) {
	"use strict";

	var self = this;

	this.mopidy = new Mopidy({
		// webSocketUrl: "ws://192.168.0.6:6680/mopidy/ws/"
		webSocketUrl: "ws://localhost:6680/mopidy/ws/"
	});


	events.EventEmitter.call(this);

	this.online = function() {

		console.log('Mopidy Online');

		this.mopidy.playback.getCurrentTrack().then(jukebox.printTrack, console.error.bind(console));

	},
	this.printTrack = function (track) {
		
		if (track) {
			console.log("Currently playing:", track.name, "by",	track.artists[0].name, "from", track.album.name);
		} else {
			console.log("No current track");
		}
		
	},
	this.playbackStarted = function (track) {
		// console.log(track);
		this.printTrack(track.tl_track.track);

		this.emit('playback:started', {
			'name'	: track.tl_track.track.name,
			'artist': track.tl_track.track.artists[0].name,
			'album'	: track.tl_track.track.album.name,
		});
		
	},
	this.nextTrack = function () {
		this.mopidy.playback.next();
	},
	this.previousTrack = function() {
		this.mopidy.playback.previous();
	},
	this.pause = function() {
		this.mopidy.playback.pause();
	},
	this.play = function() {
		this.mopidy.playback.play();
	},
	this.library = {

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

			self.mopidy.library.search(params).then(
				function(data) {
					console.log('search complete');
					callback(null, data);
				},
				console.error
			);

		}
	}

	this.mopidy.on('state:online', this.online.bind(this));
	this.mopidy.on('event:trackPlaybackStarted', this.playbackStarted.bind(this));

}

// Add events functions to our constructor
jukebox.prototype.__proto__ = events.EventEmitter.prototype;