// directive that allows us to place a control for playing music
// eg. <player size="large" />

angular.module('directives.player', [])

.directive('player', ['$parse', function($parse) {


  return {
    restrict: 'AE',
    templateUrl: 'directives/player/player.tpl.html'
  };


}]);