// Import other controllers
exports.user = require('./user');
exports.jukebox = require('./jukebox').jukebox;

/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { title: 'Express' });
};