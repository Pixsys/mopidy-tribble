/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');
var Store = require('../stores/store.js');
var Track = require('../components/track.js');
var Album = require('../components/album.js');

// routing
var Link = require('react-router').Link;

var SearchResults =
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
            console.log("Search change");
            console.log(Store.getState());
        },

        albumWasClicked: function(item) {
            console.log('Album click');
        },

        trackWasClicked: function(item) {
            console.log('Album click');
        },

        addAllResults: function() {
            var tracks = this.state.searchResults[this.props.activeTab].tracks;
            var uris = [];
            if(tracks !== undefined) {
                _(tracks).forEach(function(track) {
                    if(track.uri !== undefined) {
                        uris.push(track.uri);
                    }
                });
                Store.addUris(uris);
            }
        },

        render: function() {
            if(!this.state.searchResults[this.props.activeTab]) {
                return (<p>No search results.</p>);
            }

            var results, albums, tracks, artists;

            results = this.state.searchResults[this.props.activeTab];

            if(results.tracks !== undefined) {
                tracks = results.tracks.map(function(item) {
                    // console.log("ITEMS: " ,  item);
                    var artists = item.artists.map(function(artist) {
                        return artist.name;
                    });

                    var artwork;
                    if(item.album.artwork) {
                        if(item.album.artwork[1]) {
                            artwork = item.album.artwork[1].uri;
                        } else if(item.album.artwork[2]) {
                            artwork = item.album.artwork[2].uri;
                        } else if(item.album.artwork[0]) {
                            artwork = item.album.artwork[0].uri;
                        }
                    }

                    return <Track key={item.uri}
                                  uri={item.uri}
                                  name={item.name} artist={artists.join(', ')}
                                  album={item.album.name}
                                  artwork={artwork}
                                  vote={false}
                                  controls={true} />;
                }, this);
            }

            // if(results.albums !== undefined) {
            //     albums = results.albums.map(function(item) {

            //         return <Album key={item.uri} uri={item.uri} name={item.name} artist={item.artist} artwork={item.artwork} />;
            //     }, this);
            // }

            return (
                <div className="search-results">

                    <span className="search-results--title">
                        {/*albums !== undefined ? albums.length + ' albums, ' : ' 0 albums, '*/}
                    </span>

                    <span className={"search-results--add-all button" + (tracks !== undefined ? (tracks.length < 18 ? ' enabled' : ''):'')} onClick={this.addAllResults}>
                        Add All
                    </span>

                    <div className="search-results--content">
                        <div className="search-results--albums">

                            {albums}
                        </div>

                        <div className="search-results--tracks">
                            {tracks !== undefined ? tracks.length + ' tracks' : ' 0 tracks '}

                            {tracks}
                        </div>
                    </div>
                </div>);
        }
    });

module.exports = SearchResults;