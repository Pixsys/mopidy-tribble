/** @jsx React.DOM */
var React = require('react');
var Store = require('../stores/store.js');
var Navigation = require('react-router').Navigation;

// routing
var Link = require('react-router').Link;

var Player =
    React.createClass({
        mixins: [Navigation],

    	getInitialState: function() {
    		return Store.getState();
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

        onSearchSubmit: function(e) {
            e.preventDefault();

            var query = this.refs.query.getDOMNode().value.trim();
            if (!query) return;

            Store.search(query);
            this.transitionTo('search');
        },

        render: function() {
            return (
                <div className="search-field">
                    <form onSubmit={this.onSearchSubmit} >
                        <input type="text" placeholder="search" defaultValue={this.state.searchQuery} ref="query" />
                    </form>
                </div>);
        }
    });

module.exports = Player;