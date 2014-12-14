/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../stores/ff-store');

var Album =
    React.createClass({
        handleClick: function() {
            console.log('Aubm', this.props.uri);
            AppStore.search(AppStore.getSearchQuery() + " " + this.props.name);
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