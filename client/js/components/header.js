/** @jsx React.DOM */
var React = require('react');
var Player = require('../components/player');
var Search = require('../components/search');
// routing
var Link = require('react-router').Link;

var Header =
    React.createClass({
        render: function() {
            return (
                <header>
                	<Player />
                	<Search />
                    <nav className="primary">
                        <Link to="/">Queue</Link>
                        <Link to="search">Search</Link>
                    </nav>
                </header>
            );
        }
    });

module.exports = Header;