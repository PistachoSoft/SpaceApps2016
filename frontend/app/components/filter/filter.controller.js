angular.module('ProjectBarataria').controller('FilterCtrl', [
  '$scope', 'filterService',
  function($scope, filterService) {
    $scope.defaultFilters = filterService.getDefaultFilters();

    $scope.toggleBranch = function(filter) {
      filter.expanded = !filter.expanded;
    };

    $scope.toggleValue = function(value) {
      value.checked = !value.checked;
    };
  }
]);
