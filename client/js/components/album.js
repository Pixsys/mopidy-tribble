/** @jsx React.DOM */
var React = require('react');
var Store = require('../stores/store');

var Album =
    React.createClass({
        handleClick: function() {
            Store.search(Store.getSearchQuery() + " " + this.props.name);
        },
        render:function(){

            var artwork;
            if(this.props.artwork) {
                artwork = this.props.artwork[this.props.artwork.length-1].uri;
            }

            return (
                <div onClick={this.handleClick} className="album">
                    <img src={artwork} />
                    <span className="album--name">{this.props.name}</span>
                    <span className="album--artist">{this.props.artist}</span>
                </div>
            );
        }
    });

module.exports = Album;