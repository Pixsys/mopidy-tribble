var express = require('express');
var http = require('http');
var path = require('path');
var keypress = require('keypress');
var io = require('socket.io');
var jukebox = require('./app/jukebox.js');

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'dist')));
var server = http.createServer(app).listen(app.get('port'), function(){
	console.log('Tribble server listening on port ' + app.get('port'));
});

/**
 * SocketIO for Web Interface (jukebox relay)
 */
io = io.listen(server);
io.set('log level', 0);
io.sockets.on('connection', function(socket) {
	console.log('[SOCKET] New Connection from '+socket.id);
	// send current status on connection
	socket.emit('playback:started', jukebox.status.now_playing);
	socket.emit('playback:queue', jukebox.queue);

	// listen for events
	socket.on('jukebox:play', jukebox.play.bind(jukebox));
	socket.on('jukebox:playTrack', jukebox.library.playUri.bind(jukebox));
	socket.on('jukebox:addTrack', jukebox.addTrack.bind(jukebox));
	socket.on('jukebox:pause', jukebox.pause.bind(jukebox));
	socket.on('jukebox:previousTrack', jukebox.previousTrack.bind(jukebox));
	socket.on('jukebox:nextTrack', jukebox.nextTrack.bind(jukebox));
	socket.on('jukebox:addUri', jukebox.addUri.bind(jukebox));
	socket.on('jukebox:addUris', jukebox.addUris.bind(jukebox));
	socket.on('jukebox:voteUp', jukebox.vote.up.bind(jukebox));
	socket.on('jukebox:voteDown', jukebox.vote.down.bind(jukebox));
	socket.on('jukebox:library:search', function (request, response) {
		jukebox.library.search(request, function(err, results) {
			if (!err) {
				response(null, results);
			} else {
				response(err);
			}
		});
	});
});

/**
 * Jukebox events
 */
jukebox.on('log', function(message) {
	io.sockets.emit('playback:log', message);
});

jukebox.on('playback:started', function(track) {
	io.sockets.emit('playback:started', track);
})

jukebox.on('playback:paused', function() {
	io.sockets.emit('playback:paused');
})

jukebox.on('playback:stopped', function() {
	io.sockets.emit('playback:stopped');
})

jukebox.on('playback:queue', function() {
	io.sockets.emit('playback:queue', jukebox.queue);
})

/**
 * KeyPress (temporary library)
 */
// keypress(process.stdin);
// process.stdin.setRawMode(true);
// process.stdin.resume();

// process.stdin.on('keypress', function (ch, key) {
// 	// console.log('got "keypress"', key);
// 	if (key && key.ctrl && key.name == 'c') {
// 		jukebox.disconnect();
// 		process.exit();
// 	} else {
// 		// console.log(key);
// 		switch(key.name) {
// 			case 'up':
// 				jukebox.play();
// 				break;
// 			case 'down':
// 				jukebox.pause();
// 				break;
// 			case 'left':
// 				jukebox.previousTrack();
// 				break;
// 			case 'right':
// 				jukebox.nextTrack();
// 				break;

// 		}
// 	}
// 	return;
// });
