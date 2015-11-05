var Mopidy = require('mopidy');

var mopidy = new Mopidy({
        webSocketUrl: "ws://127.0.0.1:6680/mopidy/ws/"
        // webSocketUrl: "ws://localhost:6680/mopidy/ws/"
    });

mopidy.on('state:online', function() {console.log('Mopidy is online.');});

// mopidy.on('event:trackPlaybackStarted', function() { console.log('Track');})

// mopidy.on('event:playbackStateChanged', function() {console.log('something changes');});

mopidy.on(console.log.bind(console));

