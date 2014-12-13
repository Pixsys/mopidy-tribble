/** @jsx React.DOM */
var React = require('react');
var Player = require('../components/player.js');

var Dashboard =
    React.createClass({
        render:function(){

            return (
                <div>
                    <h1>Dashboard</h1>
                   
                    <Player />
                   
                </div>
            );
        }
    });

module.exports = Dashboard;