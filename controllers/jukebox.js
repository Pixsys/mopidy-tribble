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

	this.online = function(object) {

		console.log('[JUKE] Mopidy Online');

		// this.checkDuplicate();
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
			'length': track.tl_track.track.length,
			'votes'	: 0
		
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

	this.checkDuplicate = function(uri) {

		console.log('[JUKE] checkDuplicate()');

		for (var x in this.queue) {
			if(this.queue[x].uri === uri) return true
		}

		return false;
	};

	this.addTrack = function(track) {

		console.log('[JUKE] addTrack()');

		// track = this.formatTrack(track);

		// track.votes = 0;

		if(this.checkDuplicate(track.uri)) {

			self.emit('log', track.name+' is a duplicate');

		} else {

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

					self.emit('log', track.name+' added to queue');
					
					self.queue.push(track);

					self.emit('playback:queue');

				} else {

					console.log('[JUKE] '+ track.uri +' sent to be played');

					self.emit('log', track.name+' sent to player');
					
					self.library.playUri(track.uri);

					self.emit('playback:queue');
				
				};
			
			});
			
		}


	};

	this.sortQueue = function() {

		this.queue.sort(function(a, b){
			return b.votes-a.votes;
		});

		self.emit('playback:queue');

	}

	this.vote = {

		up : function(uri) {

			console.log('[JUKE] Vote track '+uri+' up.');

			for(var x in this.queue) {

				if(this.queue[x].uri === uri) {

					console.log('[JUKE] Found track at '+x);

					this.queue[x].votes++;

					this.sortQueue();

				}

			}

		},

		down : function(uri) {

			console.log('[JUKE] Vote track '+uri+' down.');

			for(var x in this.queue) {

				if(this.queue[x].uri === uri) {

					console.log('[JUKE] Found track at '+x);

					this.queue[x].votes--;

					this.sortQueue();

				}

			}

		}

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

			console.log(params);

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

	this.disconnect = function() {

		// Close the WebSocket without reconnecting. Letting the object be garbage
		// collected will have the same effect, so this isn't strictly necessary.
		this.mopidy.close();

		// Unregister all event listeners. If you don't do this, you may have
		// lingering references to the object causing the garbage collector to not
		// clean up after it.
		this.mopidy.off();

		// Delete your reference to the object, so it can be garbage collected.
		this.mopidy = null;

	}

	this.mopidy.on('state:online', this.online.bind(this));
	this.mopidy.on('event:trackPlaybackStarted', this.playbackStarted.bind(this));
	this.mopidy.on('event:trackPlaybackEnded', this.playbackEnded.bind(this));

	// Dev - echo all events
	// this.mopidy.on(console.log.bind(console));

}

// Add events functions to our constructor
jukebox.prototype.__proto__ = events.EventEmitter.prototype;