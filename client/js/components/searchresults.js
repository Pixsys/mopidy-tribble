/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../stores/ff-store.js');
var Track = require('../components/track.js');
var Album = require('../components/album.js');

// routing
var Link = require('react-router').Link;

var SearchResults =
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

        albumWasClicked: function(item) {
            console.log('Album click');
        },

        trackWasClicked: function(item) {
            console.log('Album click');
        },

        render: function() {
            if(!this.state.searchResults[this.props.activeTab]) {
                return (<p>No search results.</p>); 
            }
            
            var results, albums, tracks, artists;

            results = this.state.searchResults[this.props.activeTab];

            if(results.tracks !== undefined) {
                tracks = results.tracks.map(function(item) {                    
                    var artists = item.artists.map(function(artist) {
                        return artist.name;
                    });
                    
                    return <Track key={item.uri} uri={item.uri} name={item.name} artist={artists.join(', ')} album={item.album.name} />;
                }, this);
            }
            
            if(results.albums !== undefined) {
                albums = results.albums.map(function(item) {                               

                    return <Album key={item.uri} uri={item.uri} name={item.name} artist={item.artist} />;
                }, this);
            }

            return (
                <div className="search-results">
                    <span className="search-results--title">
                        {results.uri}<br />
                        {albums !== undefined ? albums.length + ' albums, ' : ' 0 albums, '}
                        {tracks !== undefined ? tracks.length + ' tracks' : ' 0 tracks '}
                    </span>

                    <div className="search-results--content">
                        <div className="search-results--albums">
                            {albums}
                        </div>
                        <div className="search-results--tracks">
                            {tracks}
                        </div>
                    </div>
                </div>);
        }
    });

module.exports = SearchResults;