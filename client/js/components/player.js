/** @jsx React.DOM */
var React = require('react');
var Store = require('../stores/store.js');
var Track = require('../components/track');

// routing
var Link = require('react-router').Link;

var Player =
    React.createClass({
    	getInitialState: function() {
    		return Store.getState();
    	},
         componentWillUnmount: function() {
            Store.removeChangeListener(this._onChange);
        },
        componentWillMount:function(){
            Store.addChangeListener(this._onChange);
        },
        _onChange:function(){
            this.setState(Store.getState());
        },
        onClickPlay: function() {
            if(!this.state.isPlaying) {
                Store.play();
            }
        },
        onClickPause: function() {
            Store.pause();
        },
        onClickNext: function() {
            Store.next();
        },
        render: function() {
                // console.log(this.state.currentTrack);
                if(this.state.currentTrack) {
                return (
                    <div>
                        <div className="player--controls">
                            <a onClick={this.onClickPlay} className="player--play"></a>
                            <a onClick={this.onClickPause} className="player--pause"></a>
                            <a onClick={this.onClickNext} className="player--next"></a>
                            <span className={"player--playing" + (this.state.isPlaying ? ' enabled' : '')}>Playing...</span>
                            <span className={"player--paused" + (this.state.isPlaying ? '' : ' enabled')}>Paused</span>
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