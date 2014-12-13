/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../stores/ff-store.js');
var Navigation = require('react-router').Navigation;

// routing
var Link = require('react-router').Link;

var Player =
    React.createClass({
        mixins: [Navigation],

    	getInitialState: function() {    		
    		return AppStore.getState();
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

        onSearchSubmit: function(e) {
            e.preventDefault();
            
            var query = this.refs.query.getDOMNode().value.trim();            
            if (!query) return;

            AppStore.search(query);
            this.transitionTo('search');
        },

        render: function() {
           
            return (
                <div>
                    <form onSubmit={this.onSearchSubmit} >
                        <input type="text" ref="query" />
                    </form>                
                </div>);
        }
    });

module.exports = Player;