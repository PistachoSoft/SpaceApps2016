angular.module('ProjectBarataria').directive('filter', [
  '$templateCache',
  function($templateCache) {
    return {
      replace: true,
      restrict: 'A',
      template: $templateCache.get('components/filter/filter.tpl.html')
    };
  }
]);