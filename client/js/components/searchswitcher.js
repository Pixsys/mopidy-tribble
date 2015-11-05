/** @jsx React.DOM */
var React = require('react');
var Store = require('../stores/store.js');
var Track = require('../components/track.js');
var Album = require('../components/album.js');

// routing
var Link = require('react-router').Link;

var TabSwitcher =
    React.createClass({
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

        onClick: function(item) {
            this.props.onTabClick(item);
        },

        render: function() {

            var results = this.state.searchResults;
            var tabTitles = [];

            for(i = 0; i < results.length; i++) {
                var active = (this.props.activeTab == i ? true : false);
                tabTitles.push({id: i, uri: results[i].uri, active: active, tracks: (results[i].tracks !== undefined ? results[i].tracks.length : 0 )});
            }

            tabTitles = tabTitles.map(function(item) {
                var label = item.uri.split(":");
                return <a key={item.id} href="javascript:void(0);" className={"search-switcher--tab" + (item.active ? ' active' : '') } onClick={this.onClick.bind(this, item)}>{label[0] + " (" + item.tracks + ")"}</a>;
            }.bind(this));

            return (<div className="search-switcher">
                        <p>Showing results for <strong>{this.state.searchQuery}</strong></p>
                        {tabTitles}
                    </div>);
        }
    });

module.exports = TabSwitcher;