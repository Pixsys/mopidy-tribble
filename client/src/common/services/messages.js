angular.module('services.messages', ['services.comms']);
angular.module('services.messages').factory('messages', ['$rootScope', '$location', 'comms', function($rootScope, $location, comms){

	var messages = {
		list: []
	};

	init();

	function messageWasReceived(message) {

		messages.list.push(message);

		if(message.list.length > 5) {
			messages.list.shift(); // keep only 5 most recent
		}

		$rootScope.emit('messages', messages);

	}

	function bindEvents() {

		comms.on('playback:log', messageWasReceived);
		comms.on('anything', messageWasReceived);

	}

	function init()  {

		bindEvents();

	}

	// messages.show = function(message) {

	// $rootScope.emit('message:show', message);

	// };

	// return messages;

}]);