/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var keypress = require('keypress');
var io = require('socket.io');

/**
 * Controller.
 */
var $controller	= require('./controllers/index');

/**
 * Init App
 */
var app = express();

/**
 * App settings
 */
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Error handling
 */
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
} else {
	app.use(function(err, req, res, next){
		console.error(err.stack);
		res.send(500, 'Something broke!');
	});
}

/**
 * Routes
 */

// All redirecting to public/

/**
 * HTTP server
 */
var server = http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

/**
 * SocketIO for Web Interface (jukebox relay)
 */
io = io.listen(server);

io.set('log level', 0);

io.sockets.on('connection', function(socket) {

	console.log('[SOCKET] New Connection from '+socket.id);

	// Send current status
	socket.emit('playback:started', $controller.jukebox.status.now_playing);
	socket.emit('playback:queue', $controller.jukebox.queue);

	socket.on('jukebox:play', $controller.jukebox.play.bind($controller.jukebox));
	socket.on('jukebox:playTrack', $controller.jukebox.library.playUri.bind($controller.jukebox));
	socket.on('jukebox:addTrack', $controller.jukebox.addTrack.bind($controller.jukebox));
	socket.on('jukebox:pause', $controller.jukebox.pause.bind($controller.jukebox));
	socket.on('jukebox:previousTrack', $controller.jukebox.previousTrack.bind($controller.jukebox));
	socket.on('jukebox:nextTrack', $controller.jukebox.nextTrack.bind($controller.jukebox));

	socket.on('jukebox:voteUp', $controller.jukebox.vote.up.bind($controller.jukebox));
	socket.on('jukebox:voteDown', $controller.jukebox.vote.down.bind($controller.jukebox));

	socket.on('jukebox:library:search', function (request, response) {
				
		$controller.jukebox.library.search(request, function(err, results) {
			
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
$controller.jukebox.on('log', function(message) {

	io.sockets.emit('playback:log', message);

});

$controller.jukebox.on('playback:started', function(track) {

	io.sockets.emit('playback:started', track);

})

$controller.jukebox.on('playback:paused', function() {

	io.sockets.emit('playback:paused');

})

$controller.jukebox.on('playback:stopped', function() {

	io.sockets.emit('playback:stopped');

})

$controller.jukebox.on('playback:queue', function() {

	io.sockets.emit('playback:queue', $controller.jukebox.queue);

})


/**
 * KeyPress (temporary library)
 */
keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

process.stdin.on('keypress', function (ch, key) {
	// console.log('got "keypress"', key);
	if (key && key.ctrl && key.name == 'c') {
		$controller.jukebox.disconnect();
		process.exit();
	} else {
		// console.log(key);
		switch(key.name) {
			case 'up':
				$controller.jukebox.play();
				break;
			case 'down':
				$controller.jukebox.pause();
				break;
			case 'left':
				$controller.jukebox.previousTrack();
				break;
			case 'right':
				$controller.jukebox.nextTrack();
				break;
		}
	}
});
