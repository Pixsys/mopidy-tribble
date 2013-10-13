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
	
	this.mopidy = new Mopidy({
		webSocketUrl: "ws://localhost:6680/mopidy/ws/"
	});

	this.status = {

		'now_playing' : null,

	};

	this.queue = [];

	events.EventEmitter.call(this);

	this.online = function() {

		console.log('Mopidy Online');

		// this.library.playUri('spotify:track:0bM5JsBjWU4RyYlMbp0voY').bind(this);


	};

	this.printTrack = function (track) {
		
		if (track) {

			console.log("Currently playing:", track.name, "by",	track.artists[0].name, "from", track.album.name);

		} else {

			console.log("No current track");

		}
		
	};

	this.playbackStarted = function (track) {
		console.log('playback started');
		var pretty_track = {

			'name'	: track.tl_track.track.name,
			'artist': track.tl_track.track.artists[0].name,
			'album'	: track.tl_track.track.album.name,
			'uri'	: track.tl_track.track.uri,
		
		};

		console.log(pretty_track);

		this.status.now_playing = pretty_track;

		this.emit('playback:started', pretty_track);

	};

	this.nextTrack = function () {

		this.mopidy.playback.next().then(null, console.error.bind(console));

	};

	this.previousTrack = function() {

		this.mopidy.playback.previous().then(null, console.error.bind(console));

	};

	this.pause = function() {

		this.mopidy.playback.pause().then(null, console.error.bind(console));

	};

	this.play = function(track) {

		this.mopidy.playback.play(track).then(console.error.bind(console), console.error.bind(console));

	};

	this.library = {

		/*
		 * (Fuzzy) Search all sources
		 *
		 # Returns results matching 'a' in any backend
		 * search({'any': ['a']})
		 * search(any=['a'])

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

				console.error.bind(console)

			);

		},

		playUri : function(uri) {

			mopidy.library.lookup(uri).then(function(track) {
			
				console.log('playUri');

				this.mopidy.tracklist.add([track])
			
				this.play();
			
			}.bind(this), console.error.bind(console));
			
		}
	}

	this.mopidy.on('state:online', this.online.bind(this));
	this.mopidy.on('event:trackPlaybackStarted', this.playbackStarted.bind(this));

	// Dev - echo all events
	// this.mopidy.on(console.log.bind(console));

}

// Add events functions to our constructor
jukebox.prototype.__proto__ = events.EventEmitter.prototype;