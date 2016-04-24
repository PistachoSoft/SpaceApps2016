angular.module('ProjectBarataria').controller('FilterCtrl', [
  '$scope', 'filterService',
  function($scope, filterService) {
    $scope.filters = filterService.getFilters();

    $scope.toggleBranch = function(filter) {
      filter.expanded = !filter.expanded;
    };

    $scope.toggleValue = function(value) {
      value.checked = !value.checked;
    };

    $scope.applyFilters = function() {
      filterService.saveFilters($scope.filters);
    };
  }
]);
