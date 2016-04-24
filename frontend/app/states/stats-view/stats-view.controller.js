angular.module('ProjectBarataria').controller('StatsViewCtrl', [
  '$rootScope', '$scope', 'events',
  function($rootScope, $scope, events) {
    var subscribers = [];

    $scope.filterOpened = false;

    subscribers.push($rootScope.$on(events.filter.changed, function() {
      // TODO refreshStats()
    }));

    $scope.$on('$destroy', function() {
      subscribers.forEach(function(subscriber) {
        subscriber();
      })
    });
  }
]);
