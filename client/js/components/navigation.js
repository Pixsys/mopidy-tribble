/** @jsx React.DOM */
var React = require('react');

// routing
var Link = require('react-router').Link;

var Navigation =
    React.createClass({
        render: function() {
            return (
                <nav className="primary">
                    <Link to="/">Dash</Link>
                    <Link to="forms">Form List</Link>
                    <Link to="form" params={{formid: 'formid'}}>Form #1</Link>
                </nav>
            );
        }
    });

module.exports = Navigation;