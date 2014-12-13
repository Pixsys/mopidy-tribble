/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../stores/ff-store.js');

var Track =
    React.createClass({
        handleClick: function(e) {
            e.preventDefault();
            AppStore.addUri(this.props.uri);
        },
        render:function(){
            return (
                <a onClick={this.handleClick}  href="javascript:void(0);" className="track" >
                    <span className="track--name">{this.props.name}</span><br />
                    <span className="track--artist">{this.props.artist}</span><br /> 
                    <span className="track--album">{this.props.album}</span>
                </a>
            );
        }
    });

module.exports = Track;