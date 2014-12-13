/** @jsx React.DOM */
var React = require('react');

// router setup
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

// layouts
var Layout = require('./pages/master-template.js');

// route handlers / pages
var Dashboard = require('./pages/dashboard.js');
var Search = require('./pages/search.js');
var Form = require('./pages/form.js');
var FormList = require('./pages/formlist.js');

// routes
var Routes = (
    <Route handler={Layout}>
        <DefaultRoute handler={Dashboard} />
        <Route name="search" handler={Search} />
        <Route name="forms" handler={FormList} />
        <Route name="form" path="form/:formid" handler={Form} />
    </Route>
);

module.exports = Routes;