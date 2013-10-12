angular.module( 'ngBoilerplate.player', [
  'ui.state',
  'placeholders',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'player', {
    url: '/player',
    views: {
      "main": {
        controller: 'PlayerCtrl',
        templateUrl: 'player/player.tpl.html'
      }
    },
    data:{ pageTitle: 'Player' }
  });
})

.controller( 'PlayerCtrl', function PlayerCtrl( $scope ) {

  $scope.currentTrack = 'Ben Caplan - Down to the Water Stream';

})

;
