/** @jsx React.DOM */
var React = require('react');
var Player = require('../components/player.js');
var Queue = require('../components/queue.js');

var Dashboard =
    React.createClass({
        render:function(){

            return (
                <div>
                    <Queue />
                </div>
            );
        }
    });

module.exports = Dashboard;