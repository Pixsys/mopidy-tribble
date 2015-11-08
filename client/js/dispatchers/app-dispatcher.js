var Dispatcher = require('./dispatcher.js');
// var merge  = require('react/lib/merge');

var AppDispatcher = Object.assign(Dispatcher.prototype, {

    handleViewAction: function(action){
        console.log('action', action);
        this.dispatch({
            source: 'VIEW_ACTION',
            action:action
        });
    },

    handleDataAction: function(action){
        console.log('data actions', action);
        this.dispatch({
            source: 'DATA_ACTION',
            action:action
        });
    }

});

module.exports = AppDispatcher;