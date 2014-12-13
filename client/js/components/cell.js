/** @jsx React.DOM */
var React = require('react');

var Dashboard =
    React.createClass({
        render:function(){
            return (
                <div className="cell">
                    <span className="cell--data">{this.props.data}</span>
                    <span className="cell--title">{this.props.title}</span>
                </div>
            );
        }
    });

module.exports = Dashboard;