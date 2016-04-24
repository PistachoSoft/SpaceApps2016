angular.module('ProjectBarataria').controller('MapViewCtrl', [
  '$rootScope', '$scope', 'events', 'layerService',
  function($rootScope, $scope, events, layerService) {
    var subscribers = [];

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
          name: 'Just an image 1',
          src: 'https://memecrunch.com/meme/AK3A7/looks-good-to-me/image.jpg?w=400&c=1'
        }, {
          name: 'Just an image 2',
          src: 'http://img.memecdn.com/rmx-looks-good-to-me_fb_968414.jpg'
        }, {
          name: 'Just an image 3',
          src: 'http://images.memes.com/meme/653108'
        }, {
          name: 'Just an image 4',
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

    layerService.setupBaseLayer();

    subscribers.push($rootScope.$on(events.filter.changed, function() {
      // TODO refreshView()
    }));

    subscribers.push($rootScope.$on(events.area.clicked, function() {
      $scope.detail = _.cloneDeep($scope.item);
      $scope.popupOpened = true;

      $scope.$applyAsync();
    }));

    $scope.$on('$destroy', function() {
      subscribers.forEach(function(subscriber) {
        subscriber();
      })
    });
  }
]);
