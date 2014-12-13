/** @jsx React.DOM */
var Req = require('reqwest');

var root = 'https://api.github.com/';

var Api = {
    getProfileData: function() {
        return Req({
            url: root + '/users/shaunchurch'
        });
    },

    getProfileDataForUser: function(user) {
        return Req({
            url: root + 'users/' + user
        });
    },

    getRepositoryDataforUser: function(user) {
        return Req({
            url: root + 'users/' + user + '/repos'
        });
    }
};

module.exports = Api;