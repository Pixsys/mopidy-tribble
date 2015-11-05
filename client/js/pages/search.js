/** @jsx React.DOM */
var React = require('react');
var Player = require('../components/player.js');
var Queue = require('../components/queue.js');
var SearchResults = require('../components/searchresults.js');
var SearchSwitcher = require('../components/searchswitcher.js');

var Search =
    React.createClass({
            getInitialState:function() {
                return {
                    activeTab: 0
                };
            },
            handleTabSwitch: function(item) {
                console.log('Search age knows', item);
                this.setState({activeTab: item.id});
            },
            render:function(){

            return (
                <div className="search-page">
                    <h1>Search</h1>
                    <SearchSwitcher activeTab={this.state.activeTab} onTabClick={this.handleTabSwitch} />
                    <SearchResults activeTab={this.state.activeTab} />
                </div>
            );
        }
    });

module.exports = Search;