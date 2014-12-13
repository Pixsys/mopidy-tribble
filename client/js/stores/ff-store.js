var AppDispatcher = require('../dispatchers/ff-dispatcher');
var ffConstants = require('../constants/ff-constants');
var merge = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var AppActions = require('../actions/ff-actions.js');
var Api = require('../Api.js');
var socket = io();
var CHANGE_EVENT = "change";

var _state = {
    currentTrack: {},
    currentQueue: {},
    searchResults: {}
};

function setupSocketEvents() {
    
    socket.on('connection', function() {
        console.log('Connection to server established.');
    });

    socket.on('connect', function() {
        console.log('test');
    });

    socket.on('playback:started', playbackWasStarted);
    socket.on('playback:stopped', playbackWasStopped);
    // socket.on('playback:queue', playbackQueueWasUpdated);    

}

function playbackWasStarted(data) {
    console.log('PLAY: ', data);
    AppActions.receivedCurrentTrack(data);
}

function playbackWasStopped() {
    console.log('STOP');
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
        var searchObject = {'any': [query]};
        socket.emit('jukebox:library:search', searchObject, function(searchResults) {
            AppActions.receivedSearchResults(searchResults);
        });        
    },

    play: function(uri) {
        if(uri) {
            socket.emit('jukebox:playTrack', uri);
        } else {
            socket.emit('jukebox:play');
        }
    },

    addUri: function(uri) {
        if(uri) {
            socket.emit('jukebox:addUri', uri);
        }
    },

    dispatcherIndex: AppDispatcher.register(function(payload) {

        var action = payload.action; // this is our actions from handleViewAction

        // console.log('ACTION: ', action);

        switch(action.actionType){
            case ffConstants.RX_CURRENT_TRACK:
                setCurrentTrack(action.data);
                break;
            case ffConstants.RX_CURRENT_QUEUE:
                setCurrentQueue(action.data);
                break;
            case ffConstants.RX_SEARCH_RESULTS:
                setSearchResults(action.data);
                break;

        }

        ffStore.emitChange();
        return true;
    })
};

function setCurrentQueue(data) {
    _state.currentQueue = data;
}

function setCurrentTrack(data) {
    console.log('SET CURRENT', data);
    _state.currentTrack = data;
}

function setSearchResults(data) {
    _state.searchResults = data;
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