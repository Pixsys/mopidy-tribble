/**
 * Controller dependancies
 */
var Mopidy = require('mopidy').Mopidy;
var events = require('events');
var request = require('request');

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

	this.status = {

		'now_playing' : null,

	};

	this.queue = [];

	events.EventEmitter.call(this);

	this.online = function() {

		console.log('Mopidy Online');

		// this.library.playUri('spotify:track:0bM5JsBjWU4RyYlMbp0voY');


	};

	this.nowPlaying = function() {

		return this.status.now_playing;

	}

	this.printTrack = function (track) {
		
		if (track) {

			console.log("Currently playing:", track.name, "by",	track.artists[0].name, "from", track.album.name);

		} else {

			console.log("No current track");

		}
		
	};

	this.playbackStarted = function (track) {

		var pretty_track = {

			'name'	: track.tl_track.track.name,
			'artist': track.tl_track.track.artists[0].name,
			'album'	: track.tl_track.track.album.name,
			'uri'	: track.tl_track.track.uri,
		
		};

		// Get album artwork
		request('https://embed.spotify.com/oembed/?url='+pretty_track.uri, function (error, response, body) {
			
			if (!error && response.statusCode == 200) {
			
				var spotify_api_details = JSON.parse(body)

				pretty_track.artwork = spotify_api_details.thumbnail_url;
			
			} else {

				pretty_track.artwork = null;

			}

			self.status.now_playing = pretty_track;

			self.emit('playback:started', pretty_track);
		});

	};

	this.playbackEnded = function (track) {

		if(this.queue[0]) {

			var to_be_played = this.queue.shift();
			
			this.library.playUri(to_be_played.uri);

			this.emit('playback:queue');

		} else {

			this.status.now_playing = null;

			this.emit('playback:stopped');

		}

	};

	this.nextTrack = function () {

		this.mopidy.playback.next().then(null, console.error.bind(console));

	};

	this.previousTrack = function() {

		this.mopidy.playback.previous().then(null, console.error.bind(console));

	};

	this.pause = function() {

		this.mopidy.playback.pause().then(null, console.error.bind(console));

		this.emit('playback:paused');

	};

	this.play = function(track) {

		this.mopidy.playback.play(track).then(null, console.error.bind(console));

	};

	this.addTrack = function(track) {

		console.log('[JUKE] addTrack()');

		// Get album artwork
		request('https://embed.spotify.com/oembed/?url='+track.uri, function (error, response, body) {
			
			if (!error && response.statusCode == 200) {
			
				var spotify_api_details = JSON.parse(body)

				track.artwork = spotify_api_details.thumbnail_url;
			
			} else {

				track.artwork = null;

			}


			if(self.status.now_playing) {

				console.log('[JUKE] '+ track.uri +' added to the queue');
				
				console.log(track);

				self.queue.push(track);

				self.emit('playback:queue');

			} else {

				console.log('[JUKE] '+ track.uri +' sent to be played');

				self.library.playUri(track.uri);

				self.emit('playback:queue');
			
			};
		
		});


	}

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

			console.log('[JUKE] search()');

			self.mopidy.library.search(params).then(
				function(data) {

					callback(null, data);

				},

				console.error.bind(console)

			);

		},

		playUri : function(uri) {

			console.log('[JUKE] playUri()');

			self.mopidy.library.lookup(uri).then(function(track) {
					
				self.mopidy.tracklist.clear();

				self.mopidy.tracklist.add(track);
			
				self.play();
			
			});
			
		}
	}

	this.mopidy.on('state:online', this.online.bind(this));
	this.mopidy.on('event:trackPlaybackStarted', this.playbackStarted.bind(this));
	this.mopidy.on('event:trackPlaybackEnded', this.playbackEnded.bind(this));

	// Dev - echo all events
	// this.mopidy.on(console.log.bind(console));

}

// Add events functions to our constructor
jukebox.prototype.__proto__ = events.EventEmitter.prototype;