/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../stores/ff-store.js');
var RouteHandler = require('react-router').RouteHandler;

var Header = require('./../components/header.js');
var Search = require('./../components/search.js');
var SearchResults = require('./../components/searchresults.js');
var Navigation = require('../components/navigation');
var Footer = require('./../components/footer.js');

var Template =
    React.createClass({
        getInitialState: function() {
            return AppStore.getState();
        },
        componentDidMount: function() {
            console.log('MASTER');
            AppStore.setupSocketEvents();            
        },
        componentWillUnmount: function() {
            AppStore.removeChangeListener(this._onChange);
        },

        componentWillMount:function(){
            AppStore.addChangeListener(this._onChange);
        },
        _onChange:function(){
            this.setState(AppStore.getState());
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