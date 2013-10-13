/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'ngBoilerplate.home', [
  'ui.state',
  'plusOne',
  'services.comms',
  'services.player',
  'services.search',
  'directives.player'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', function HomeController( $scope, comms, player, search) {

  // expose player functions to the view
  $scope.player = player;

  // get current playing track
  $scope.currentTrack = 'Ben Capistrano - Down to the Fluid Stream';

  // mock array of tracks
  $scope.tracks = {
    0: {
      title: 'Where do we go from here?',
      artist: 'Buffy the Vampire Slayer'
    },
    1: {
      title: 'Let me rest in peace',
      artist: 'Spike'
    },
    2: {
      title: 'A song sung',
      artist: 'Byme'
    },
    3: {
      title: 'Something else',
      artist: 'Completely Different'
    }
  };
  /**
   * handles submission of a user search for artists.
   * @return {[type]} [description]
   */
  $scope.searchFormWasSubmitted = function() {

    // console.log('Searched for: ' + $scope.searchTerm);
    search.search($scope.searchTerm);

  };

})

;

