/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../stores/ff-store.js');


// routing
var Link = require('react-router').Link;




var Player =
    React.createClass({
    	getInitialState: function() {    		
    		return AppStore.getState();
    	},
         componentWillUnmount: function() {
            AppStore.removeChangeListener(this._onChange);
        },

        componentWillMount:function(){
            AppStore.addChangeListener(this._onChange);
        },

        _onChange:function(){
            this.setState(AppStore.getState());
        },
        render: function() {
            if(this.state.currentTrack) {
                track = this.state.currentTrack;
                return (
                    <div>
                        {track.name}<br />{track.artist}
                    </div>
                );

            } else {

                return (
                    <div>
                        No queued tracks.
                    </div>
                );

            }            
        }
    });

module.exports = Player;