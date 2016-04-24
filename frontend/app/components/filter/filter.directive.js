angular.module('ProjectBarataria').directive('filter', [
  '$templateCache',
  function($templateCache) {
    return {
      replace: true,
      restrict: 'A',
      scope: {
        filterOpened: '='
      },
      controller: 'FilterCtrl',
      template: $templateCache.get('components/filter/filter.tpl.html'),
      link: function(scope) {
        scope.closeFilter = function() {
          scope.filterOpened = false;
        };
      }
    };
  }
]);
