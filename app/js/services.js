'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');

myApp.factory('commsService', function ($rootScope) {
	

		var socket = io.connect();
		
		socket.on('connect', function() {
			// log.log('Secure Socket Connected (ID: ' + socket.socket.sessionid +')', 'comms', 1);
			$rootScope.$broadcast('comms.connected');
			// safeApply($rootScope);
		});
		
		socket.on('disconnect', function() {
			
			// for an update because a disconnect triggered by a remote crash
			// doesn't seem to cause an udpate. 
			// safeApply because otherwise a manual disconnect triggers a digest error
			// safeApply($rootScope); 
			// log.log('Disconnected', 'comms', -1);			
			$rootScope.$broadcast('comms.disconnected');
			// safeApply($rootScope);
		});

		socket.on('connecting', function() {			
			// log.log('Connecting...', 'comms')
		});

		socket.on('connect_failed', function() {			
			// log.log('Connect failed', 'comms', -1);
		});	

		socket.on('error', function() {			
			// log.log('Socket Error', 'comms', -1);			
			$rootScope.$broadcast('comms.disconnected');
			// safeApply($rootScope);
		})

		socket.on('reply', function(data) {
			$rootScope.$broadcast('comms.reply', data);
			console.log('REPLY: '+data.request.type);
			console.log(data);
		});
});