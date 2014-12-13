var AppConstants = require('../constants/ff-constants.js');
var AppDispatcher = require('../dispatchers/ff-dispatcher.js');

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

    /// OUTGOING REQUESTS
    search: function(data) {
        AppDispatcher.handleDataAction({
            actionType: AppConstants.TX_SEARCH_QUERY,
            data: data
        });
    },

    play: function(data) {
        AppDispatcher.handleDataAction({
            actionType: AppConstants.TX_JUKEBOX_PLAY,
            data: data
        })
    }
};

module.exports = appActions;