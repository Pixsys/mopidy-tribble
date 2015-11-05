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
                        <Link to="/">Play Queue</Link>
                        <Link to="search">Search Results</Link>
                    </nav>
                </header>
            );
        }
    });

module.exports = Header;