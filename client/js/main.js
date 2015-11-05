/** @jsx React.DOM */
var React = require('react');
var Store = require('./stores/store');

// router modules
var Router = require('react-router');
var Routes = require('./routes.js');

Router.run(Routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('main'));
});