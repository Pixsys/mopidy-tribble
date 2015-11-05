/** @jsx React.DOM */
var React = require('react');
var Store = require('../stores/store.js');
var RouteHandler = require('react-router').RouteHandler;

var Header = require('./../components/header.js');
var Search = require('./../components/search.js');
var SearchResults = require('./../components/searchresults.js');
var Navigation = require('../components/navigation');
var Footer = require('./../components/footer.js');

var Template =
    React.createClass({
        getInitialState: function() {
            return Store.getState();
        },

        componentDidMount: function() {
            console.log('MASTER');
            Store.setupSocketEvents();
        },

        componentWillUnmount: function() {
            Store.removeChangeListener(this._onChange);
        },

        componentWillMount:function(){
            Store.addChangeListener(this._onChange);
        },

        _onChange:function(){
            this.setState(Store.getState());
        },

        render:function(){

            return (
                <div>
                    <Header />

                    <div className="content">
                        <RouteHandler />
                    </div>

                    <Footer />

                </div>
            );
        }
    });

module.exports = Template;