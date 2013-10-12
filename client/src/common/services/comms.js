
angular.module('services.comms', []);

angular.module('services.comms').factory('comms', ['$rootScope', '$location', function($rootScope, $location){

	console.log('Initialising comms...');

	var socket = io.connect();

	socket.on('connect', function() {
		console.log('...connected.');
	});


	return {
		on: function (eventName, callback) {
			socket.on(eventName, function () {  
				var args = arguments;
				$rootScope.$apply(function () {
					callback.apply(socket, args);
				});
			});
		},
		emit: function (eventName, data, callback) {
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