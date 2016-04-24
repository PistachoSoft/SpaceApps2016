angular.module('ProjectBarataria').directive('header', [
  '$templateCache',
  function($templateCache) {
    return {
      replace: true,
      restrict: 'A',
      scope: {
        filterOpened: '=',
        state: '@'
      },
      template: $templateCache.get('components/header/header.tpl.html'),
      link: function(scope) {
        scope.toggleFilter = function() {
          scope.filterOpened = !scope.filterOpened;
        };
      }
    };
  }
]);
