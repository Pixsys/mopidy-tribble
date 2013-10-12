angular.module( 'ngBoilerplate.status', [
  'ui.state',
  'placeholders',
  'ui.bootstrap',
  'services.comms'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'status', {
    url: '/status',
    views: {
      "main": {
        controller: 'StatusCtrl',
        templateUrl: 'status/status.tpl.html'
      }
    },
    data:{ pageTitle: 'Status' }
  });
})

.controller( 'StatusCtrl', function StatusCtrl( $scope, comms ) {
  

  


  // This is simple a demo for UI Boostrap.
  $scope.dropdownDemoItems = [
    "The first choice!",
    "And another choice for you.",
    "but wait! A third!"
  ];
})

;
