/** @jsx React.DOM */
var React = require('react');

var Album =
    React.createClass({
        handleClick: function() {
            console.log('Aubm', this.props.uri);
        },
        render:function(){
            
            return (
                <div onClick={this.handleClick} className="album">
                    <span className="album--name">{this.props.name}</span>
                    <span className="album--artist">{this.props.artist}</span>
                </div>
            );
        }
    });

module.exports = Album;