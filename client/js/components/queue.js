/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../stores/ff-store.js');
var Track = require('../components/track.js');
var Album = require('../components/album.js');

// routing
var Link = require('react-router').Link;

var Queue =
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

        albumWasClicked: function(item) {
            console.log('Album click');
        },

        trackWasClicked: function(item) {
            console.log('Album click');
        },

        render: function() {
            var queue = this.state.currentQueue;

            var tracks = queue.map(function(item) {
                return <Track key={item.uri} 
                              uri={item.uri} 
                              name={item.name} 
                              artist={item.artist} 
                              album={item.album.name} 
                              artwork={item.artwork}
                              vote={true}
                              votes={item.votes} />;
            });
            
            return (
                <div className="queue"><h2>Play Queue</h2>
                    {tracks}
                </div>);
        }
    });

module.exports = Queue;