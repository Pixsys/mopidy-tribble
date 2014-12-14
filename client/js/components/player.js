/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../stores/ff-store.js');
var Track = require('../components/track');

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
        onClickPlay: function() {
            if(!this.state.isPlaying) {
                AppStore.play();
            }
        },
        onClickPause: function() {
            AppStore.pause();
        },
        onClickNext: function() {
            AppStore.next();
        },
        render: function() {
                // console.log(this.state.currentTrack);
                if(this.state.currentTrack) {
                return (
                    <div>
                        <div className="player--controls">                            
                            <span onClick={this.onClickPlay} className="player--play">play</span>
                            <span onClick={this.onClickPause} className="player--pause">pause</span>
                            <span onClick={this.onClickNext} className="player--next">next</span>
                        </div>
                        <div className="player--details">
                            <Track name={this.state.currentTrack.name} artist={this.state.currentTrack.artist} artwork={this.state.currentTrack.artwork} />
                        </div>
                    </div>
                );
            } else {
                return (<div>No queued tracks</div>);
            }

            // } else {

            //     return (
            //         <div>
            //             No queued tracks.
            //         </div>
            //     );
            // }            
        }
    });

module.exports = Player;