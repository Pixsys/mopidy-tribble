var Mopidy = require('mopidy');

var mopidy = new Mopidy({
        webSocketUrl: "ws://192.168.1.106:6680/mopidy/ws/"
        // webSocketUrl: "ws://localhost:6680/mopidy/ws/"
    });

mopidy.on('state:online', function() {console.log('Mopidy is online.');});

// mopidy.on('event:trackPlaybackStarted', function() { console.log('Track');})

// mopidy.on('event:playbackStateChanged', function() {console.log('something changes');});

mopidy.on(console.log.bind(console));

