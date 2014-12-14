/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../stores/ff-store.js');

var Track =
    React.createClass({
        handleClick: function(e) {
            e.preventDefault();
            AppStore.addUri(this.props.uri);            
        },
        handleUpVote: function(e) {
            console.log('handle upvote');
            AppStore.voteUp(this.props.uri);
        },
        handleDownVote: function(e) {
            console.log('handle downvote');
            AppStore.voteDown(this.props.uri);
        },
        render:function(){            

            // is this in the queue?
            var inQueue = AppStore.isInQueue(this.props.uri);
            var isPlaying = AppStore.isPlaying(this.props.uri);

            return (
                <div className="track" >

                    <div className={"track--controls" + (this.props.controls === true ? ' enabled' : '')}>
                        <span className={"track--add" + (inQueue === false ? ' enabled' : '' )} onClick={this.handleClick}>Add</span>
                        <span className={"track--added" + (inQueue !== false ? ' enabled' : '' )}>Added <span className="track--queue">{inQueue === 0 ? 'Up next' : (inQueue+1) + " in queue"}</span></span>
                        <span className={"track--playing" + (isPlaying === true ? ' enabled' : '')}><span className="track--queue">Currently playing</span></span>
                    </div>
                    <div className="track--artwork">
                        <img src={this.props.artwork} />
                    </div>
                    <span className={"track--voting" + (this.props.vote  === true ? ' enabled' : '' )}>
                        <span className="track--votes">{this.props.votes}</span>
                        <span className="track--upvote" onClick={this.handleUpVote}>up</span>
                        <span className="track--downvote" onClick={this.handleDownVote}>down</span>
                    </span>
                    <div className="track--details">
                        <span className="track--name" onClick={this.handleClick}>{this.props.name}</span><br />
                        <span className="track--artist">{this.props.artist}</span><br /> 
                        <span className="track--album">{this.props.album}</span>
                    </div>
                    
                </div>
            );
        }
    });

module.exports = Track;