var q = require('q');
var LastFmNode = require('lastfm').LastFmNode;
var Config = require('./config');

var lastfm = new LastFmNode({
  api_key: Config.lastfm.api_key,    // sign-up for a key at http://www.last.fm/api
  secret: Config.lastfm.secret,
  useragent: "lastfm" // optional. defaults to lastfm-node.
});

var LastFM = {

	getLibraryArtists: function(username, limit) {
		var defer = q.defer();

		lastfm.request("library.getArtists", {
		    user: username,
		    limit: limit,
		    handlers: {
		        success: function(data) {
		            console.log("Success: " + data);
		            defer.resolve(data);
		        },
		        error: function(error) {
		            console.log("Error: " + error.message);
		            defer.reject(error);
		        }
		    }
		});

		return defer.promise;
	},

	getAlbumArtwork: function(artist, album) {
		var defer = q.defer();


		lastfm.request("album.getInfo", {
			artist: artist,
			album: album,
			handlers: {
				success: function(data) {
					defer.resolve(data.album.image);
				},
				error: function(err) {
					console.log("Error: " + err.message);
					defer.reject(err);
				}
			}
		})

		return defer.promise;
	}
}

module.exports = LastFM;