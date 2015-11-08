var AppDispatcher = require('../dispatchers/app-dispatcher');
var Constants = require('../constants/constants');
var merge = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var AppActions = require('../actions/actions.js');
var Api = require('../api.js');
var socket = io();
var CHANGE_EVENT = "change";

var _state = {
    currentTrack: {},
    currentQueue: [],
    searchResults: {},
    searchQuery: null,
    isPlaying: false
};

function setupSocketEvents() {

    socket.on('connection', function() {
        console.log('Connection to server established.');
    });

    socket.on('playback:started', playbackWasStarted);
    socket.on('playback:stopped', playbackWasStopped);
    socket.on('playback:paused', playbackWasPaused);
    socket.on('playback:queue', playbackQueueWasUpdated);

}

function playbackWasStarted(data) {
    console.log('PLAY: ', data);

    if(data !== null && data.artwork) {
        console.log("IMAGE: ", data.artwork);
    }
    AppActions.receivedCurrentTrack(data);
}

function playbackWasStopped() {
    AppActions.playbackWasStopped();
}

function playbackWasPaused() {
    AppActions.playbackWasPaused();
}

function playbackQueueWasUpdated(data) {
    console.log('QUEUE: ', data);
    AppActions.receivedCurrentQueue(data);
}

function getState() {
    return _state;
}

var ffStore = {

    emitChange:function(){
        this.emit(CHANGE_EVENT);
    },

    addChangeListener:function(callback){
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener:function(callback){
        this.removeListener(CHANGE_EVENT, callback);
    },

    getState: function() {
        return _state;
    },

    setupSocketEvents: function() {
        return setupSocketEvents();
    },

    search: function(query) {
        _state.searchQuery = query;
        var searchObject = {'any': [query]};
        socket.emit('jukebox:library:search', searchObject, function(searchResults) {
            AppActions.receivedSearchResults(searchResults);
        });
    },

    getSearchQuery: function() {
        return _state.searchQuery;
    },

    play: function(uri) {
        if(uri) {
            socket.emit('jukebox:playTrack', uri);
        } else {
            socket.emit('jukebox:play');
        }
    },

    next: function() {
        socket.emit('jukebox:nextTrack');
    },

    pause: function() {
        socket.emit('jukebox:pause');
    },

    voteUp: function(uri) {
        socket.emit('jukebox:voteUp', uri);
    },

    voteDown: function(uri) {
        socket.emit('jukebox:voteDown', uri);
    },

    addUri: function(uri) {
        console.log('App store uri' + uri);
        if(uri) {
            socket.emit('jukebox:addUri', uri);
        }
    },

    addUris: function(array) {
        socket.emit('jukebox:addUris', array);
    },

    isInQueue: function(uri) {
        for(i = 0; i < _state.currentQueue.length; i++) {
            if(_state.currentQueue[i].uri === uri) return i;
        }
        return false;
    },

    isPlaying: function(uri) {
        if(_state.currentTrack === null) return false;
        if(_state.currentTrack.uri === uri) return true;
        return false;
    },

    dispatcherIndex: AppDispatcher.register(function(payload) {

        var action = payload.action; // this is our actions from handleViewAction

        switch(action.actionType){
            case Constants.RX_CURRENT_TRACK:
                setCurrentTrack(action.data);
                break;
            case Constants.RX_CURRENT_QUEUE:
                setCurrentQueue(action.data);
                break;
            case Constants.RX_SEARCH_RESULTS:
                setSearchResults(action.data);
                break;
            case Constants.RX_PLAYBACK_PAUSED:
                setPlaybackPaused();
                break;
            case Constants.RX_PLAYBACK_STOPPED:
                setPlaybackStopped();
                break;
        }

        ffStore.emitChange();
        return true;
    })
};

function setCurrentQueue(data) {
    console.log('QUEUE', data);
    _state.currentQueue = data;
}

function setCurrentTrack(data) {
    _state.isPlaying = true;
    _state.currentTrack = data;
}

function setSearchResults(data) {
    _state.searchResults = data;
}

function setPlaybackStopped() {
    _state.isPlaying = false;
}
function setPlaybackPaused() {
    _state.isPlaying = false;
}
function updateDaterangeFrom(date) {

    _state.daterange.from = new Date(date);
}

function updateDaterangeTo(date) {
    _state.daterange.to = new Date(date);
}

function getMoreData() {
    console.log("Get data between " + _state.daterange.from + " and " + _state.daterange.to);
}

// merge together
merge(ffStore, EventEmitter.prototype, ffStore);

module.exports = ffStore;
