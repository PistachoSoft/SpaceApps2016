angular.module('ProjectDulcinea').directive('detail', [
  '$templateCache',
  function($templateCache) {
    return {
      replace: true,
      restrict: 'A',
      template: $templateCache.get('components/detail/detail.tpl.html')
    };
  }
]);
