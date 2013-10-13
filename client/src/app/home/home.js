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
  'ui.router',
  'plusOne',
  'services.comms',
  'services.player',
  'services.search',
  'services.filter',
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

  // expose player, search functions to the view
  $scope.player = player;
  $scope.search = search;

  // default.
  $scope.currentTrack = 'Stopped.';

  $scope.$on('search:result', function(obj, searchResult) {
    console.log('Search result:');
    console.log(searchResult);
    $scope.searchResult = {};
    $scope.searchResult = searchResult;
  });

  $scope.$on('playback:started', function(event, data) {
    $scope.currentTrack = data;
  });

  $scope.$on('playback:stopped', function(event) {
    $scope.currentTrack = { name: 'Stopped',
                        artist: null,
                        album: null };

  });

  $scope.$on('playback:queue', function(event, queue) {
    console.log('updating playback queue');
    $scope.playbackQueue = queue;
  });

  // watch
  $scope.$watch('searchTerm', function() {
    console.log($scope.searchTerm);

    if(!$scope.searchTerm) {
      search.clearSearch();
      $scope.searchResult = [];
    }
  });

})

;

