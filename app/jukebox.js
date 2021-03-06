/**
 * Controller dependancies
 */
var Mopidy = require('mopidy');
var events = require('events');
var request = require('request');
var lastfm = require('./lastfm.js');
var musicbrainz = require('./musicbrainz.js');
var _ = require('lodash');

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

    events.EventEmitter.call(this);

    this.mopidy = new Mopidy({
        webSocketUrl: "ws://192.168.1.105:6680/mopidy/ws/"
        // webSocketUrl: "ws://192.168.1.75:6680/mopidy/ws/"
    });

    this.status = {
        'now_playing': null
    };

    this.queue = [];
    this.isPlaying = false;

    this.online = function(object) {
        console.log('[JUKE] Mopidy Online');
        // this.checkDuplicate();
        // this.library.playUri('spotify:track:0bM5JsBjWU4RyYlMbp0voY');
        // this.addUri('spotify:track:2uL5pB9kAb21KCQG0rJ9Q3');
        // this.addAlbum('spotify:album:5LdqbRBfjz6qfhC4Q77rDe');
    };

    this.nowPlaying = function() {
        return this.status.now_playing;
    }

    this.printTrack = function(track) {
        if (track) {
            console.log("Currently playing:", track.name, "by", track.artists[0].name, "from", track.album.name);
        } else {
            console.log("No current track");
        }
    };

    this.playbackStarted = function(track) {
        var pretty_track = {
            'name': track.tl_track.track.name,
            'artist': track.tl_track.track.artists[0].name,
            'album': track.tl_track.track.album.name,
            'uri': track.tl_track.track.uri,
            'length': track.tl_track.track.length,
            'votes': 0
        };

        console.log(pretty_track.uri);

        // Get album artwork
        lastfm.getAlbumArtwork(pretty_track.artist, pretty_track.album).then(function(data) {
            // just use the first one
            pretty_track.artwork = data[3]['#text'];
            self.status.now_playing = pretty_track;
            self.emit('playback:started', pretty_track);
        }).catch(function(err) {
            self.status.now_playing = pretty_track;
            self.emit('playback:started', pretty_track);
        });

        // request('https://embed.spotify.com/oembed/?url='+pretty_track.uri, function (error, response, body) {
        // if (!error && response.statusCode == 200 && body.length > 0) {
        // 	var spotify_api_details = JSON.parse(body);
        // 	console.log("artwork", spotify_api_details.thumbnail_url);
        // 	pretty_track.artwork = spotify_api_details.thumbnail_url;
        // } else {
        // pretty_track.artwork = null;
        //
        // });
    };

    this.playbackEnded = function(track) {

        this.isPlaying = false;
        if (this.queue[0]) {
            var to_be_played = this.queue.shift();
            this.library.playUri(to_be_played.uri);
            this.emit('playback:queue');
        } else {
            this.status.now_playing = null;
            this.emit('playback:stopped');
            this.isPlaying = false;
        }
    };

    this.nextTrack = function() {
        this.mopidy.playback.next().then(null, console.error.bind(console));
    };

    this.previousTrack = function() {
        this.mopidy.playback.previous().then(null, console.error.bind(console));
    };

    this.pause = function() {
        this.isPlaying = false;
        this.mopidy.playback.pause().then(null, console.error.bind(console));
        this.emit('playback:paused');
    };

    this.play = function(track) {
        // console.log('MOP: ' +track);
        if(!this.isPlaying) {
            this.isPlaying = true;
            this.mopidy.playback.play(track).then(null, console.error.bind(console));
        }
    };

    this.checkDuplicate = function(uri) {
        console.log('[JUKE] checkDuplicate()');
        for (var x in this.queue) {
            if (this.queue[x].uri === uri) return true
        }

        return false;
    };

    this.addUris = function(array) {
        console.log('[JUKE] addUris');
        
        if (!self.status.now_playing) {                        
            self.addUri(array[0]);
            array.shift();
            setTimeout(function() {
                _(array).forEach(function(uri) {
                    console.log('finding ' + uri);
                    self.addUri(uri);
                });
            }, 4000);
        } else {
            _(array).forEach(function(uri) {
                console.log('finding ' + uri);
                self.addUri(uri);
            });
        }
    }

    this.addUri = function(uri) {
        console.log('[JUKE] addUri()');
        this.mopidy.library.lookup(uri).then(function(track) {
            // console.log(track);
            self.addTrack({
                name: track[0].name,
                artist: track[0].artists[0].name,
                album: (track[0].album !== undefined ? track[0].album.name : undefined),
                uri: track[0].uri,
                length: track[0].length
            });
        });
    };

    this.addAlbum = function(uri) {
        console.log('[JUKE] addAlbum()')
        this.mopidy.library.lookup(uri).then(function(album) {
            // ToDo: Add to playlist in album order
            for (var x in album) {
                console.log('Adding track #' + x + ':')
                    // console.log(album[x]);
                self.addTrack({
                    name: album[x].name,
                    artist: album[x].artists[0].name,
                    album: album[x].album.name,
                    uri: album[x].uri,
                    length: album[x].length,
                    votes: 0
                });

            }
            // console.log(this.queue);
        });
    };



    this.addTrack = function(track) {
        console.log('[JUKE] addTrack()');
        track.votes = 0;
        if (this.checkDuplicate(track.uri)) {
            self.emit('log', track.name + ' is a duplicate');
        } else {
            // Get album artwork
            // 			request('https://embed.spotify.com/oembed/?url='+track.uri, function (error, response, body) {
            // 				// if (!error && response.statusCode == 200) {
            // 				// 	var spotify_api_details = JSON.parse(body)
            // 				// 	track.artwork = spotify_api_details.thumbnail_url;
            // 				// } else {
            // 					track.artwork = null;            
            // 			}
            // console.log(track);
            if(track.artist !== undefined && track.album !== undefined) {
                console.log('ARTWORK')
                lastfm.getAlbumArtwork(track.artist, track.album).then(function(data) {
                    track.artwork = data[3]['#text'];
                    self.pushToQueue(track);
                }).catch(function(data) {
                    console.log('Pushing anyway');
                    self.pushToQueue(track);
                });
            } else {
                self.pushToQueue(track);
            }
        }
    };

    this.pushToQueue = function(track) {
        console.log('[JUKE] push to queue');
        if (self.status.now_playing) {                        
            self.queue.push(track);
            console.log('[JUKE] ' + track.uri + ' added to the queue');
            self.emit('log', track.name + ' added to queue');
            self.emit('playback:queue');
        } else {
            console.log('[JUKE] ' + track.uri + ' sent to be played');
            self.emit('log', track.name + ' sent to player');
            self.library.playUri(track.uri);
            self.emit('playback:queue');
        };                             
    }

    this.sortQueue = function() {
        this.queue.sort(function(a, b) {
            return b.votes - a.votes;
        });
        self.emit('playback:queue');
    }

    this.vote = {
        up: function(uri) {
            console.log('[JUKE] Vote track ' + uri + ' up.');
            for (var x in this.queue) {
                if (this.queue[x].uri === uri) {
                    console.log('[JUKE] Found track at ' + x);
                    this.queue[x].votes++;
                    this.sortQueue();
                }
            }
        },

        down: function(uri) {
            console.log('[JUKE] Vote track ' + uri + ' down.');
            for (var x in this.queue) {
                console.log(this.queue[x].uri);
                if (this.queue[x].uri === uri) {
                    console.log('[JUKE] Found track at ' + x);
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
        search: function(params, callback) {
            console.log('[JUKE] search()');
            self.mopidy.library.search(params, null, false).then(
                function(data) {
                    console.log(data[0].artists);
                    callback(data);
                },
                console.error.bind(console)
            );
        },

        playUri: function(uri) {
            console.log('[JUKE] playUri()');
            self.mopidy.library.lookup(uri).then(function(track) {
                self.mopidy.tracklist.clear();
                self.mopidy.tracklist.add(track);
                self.play();
            });

        },

        getImages: function(uris, callback) {
            self.mopidy.library.getImages(uris).then(function(result) {
                callback(result);
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
