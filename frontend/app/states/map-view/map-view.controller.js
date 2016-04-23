angular.module('ProjectDulcinea').controller('MapViewCtrl', [
  '$scope',
  function($scope) {
    $scope.item = {
      title: 'Events in Iwo Jima',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
        'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
        'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ' +
        'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla ' +
        'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in ' +
        'culpa qui officia deserunt mollit anim id est laborum.',
      links: [
        {
          name: 'GitHub',
          url: 'https://github.com/PistachoSoft/SpaceApps2016'
        }
      ],
      images: [
        {
          name: 'Just an image',
          src: 'http://lgtm.in/p/GJ8PB88oq'
        }
      ]
    };

    $scope.filterOpened = false;
    $scope.popupOpened = false;

    $scope.openDetail = function(item) {
      $scope.detail = item;
      $scope.popupOpened = true;
    };
  }
]);
