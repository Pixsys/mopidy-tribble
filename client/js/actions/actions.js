var AppConstants = require('../constants/constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var appActions = {

    receivedCurrentTrack: function(data) {
        AppDispatcher.handleDataAction( {
            actionType: AppConstants.RX_CURRENT_TRACK,
            data: data
        });
    },

    receivedCurrentQueue: function(data) {
        AppDispatcher.handleDataAction({
            actionType: AppConstants.RX_CURRENT_QUEUE,
            data: data
        });
    },

    receivedSearchResults: function(data) {
        AppDispatcher.handleDataAction({
            actionType: AppConstants.RX_SEARCH_RESULTS,
            data: data
        });
    },

    playbackWasStopped: function() {
        AppDispatcher.handleDataAction({
            actionType: AppConstants.RX_PLAYBACK_STOPPED
        });
    },

    playbackWasPaused: function() {
        AppDispatcher.handleDataAction({
            actionType: AppConstants.RX_PLAYBACK_PAUSED
        });
    },

    /// OUTGOING REQUESTS
    search: function(data) {
        AppDispatcher.handleDataAction({
            actionType: AppConstants.TX_SEARCH_QUERY,
            data: data
        });
    },

    playTrack: function(data) {
        AppDispatcher.handleDataAction({
            actionType: AppConstants.TX_JUKEBOX_PLAY_TRACK,
            data: data
        });
    },

    play: function(data) {
        AppDispatcher.handleDataAction({
            actionType: AppConstants.TX_JUKEBOX_PLAY,
            data: data
        });
    },

    pause: function() {
        AppDispatcher.handleDataAction({
            actionType: AppConstants.TX_JUKEBOX_PAUSE
        });
    },

    next: function() {
        AppDispatcher.handleDataAction({
            actionType: AppConstants.TX_JUKEBOX_NEXT
        });
    }
};


module.exports = appActions;