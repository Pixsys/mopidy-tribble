
angular.module('services.comms', []);

angular.module('services.comms').factory('comms', ['$rootScope', '$location', function($rootScope, $location){

	console.log('Initialising comms...');

	// var socket = io.connect('http://192.168.0.4:3000');
	var socket = io.connect();

	socket.on('connect', function() {
		console.log('...connected.');
	});

	return {
		on: function (eventName, callback) {
			console.log('COMMS: on ' + eventName);
			socket.on(eventName, function () {
				var args = arguments;
				$rootScope.$apply(function () {
					callback.apply(socket, args);
				});
			});
		},
		emit: function (eventName, data, callback) {
			console.log('COMMS: emit ' + eventName);
			socket.emit(eventName, data, function () {
				var args = arguments;
				$rootScope.$apply(function () {
					if (callback) {
						callback.apply(socket, args);
					}
				});
			});
		}
	};

}]);