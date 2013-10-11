
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var keypress = require('keypress');

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
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});


/**
 * KeyPress (temporary library)
 */
keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

process.stdin.on('keypress', function (ch, key) {
	console.log('got "keypress"', key);
	if (key && key.ctrl && key.name == 'c') {
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
