/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../stores/ff-store.js');
var Track = require('../components/track.js');
var Album = require('../components/album.js');

// routing
var Link = require('react-router').Link;

var TabSwitcher =
    React.createClass({
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

        onClick: function(item) {
            this.props.onTabClick(item);
        },

        render: function() {
           
            var results = this.state.searchResults;
            var tabTitles = [];

            for(i = 0; i < results.length; i++) {
                var active = (this.props.activeTab == i ? true : false);                
                tabTitles.push({id: i, uri: results[i].uri, active: active});
            }
            
            tabTitles = tabTitles.map(function(item) {
                return <a key={item.id} href="javascript:void(0);" className={"search-switcher--tab" + (item.active ? ' active' : '') } onClick={this.onClick.bind(this, item)}>{item.id} - {item.uri}</a>;
            }.bind(this));
            
            return (<div className="search-switcher">{tabTitles}</div>);
        }
    });

module.exports = TabSwitcher;