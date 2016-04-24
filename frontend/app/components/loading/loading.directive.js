angular.module('ProjectBarataria').directive('loading', [
  '$templateCache',
  function($templateCache) {
    return {
      replace: true,
      restrict: 'A',
      template: $templateCache.get('components/loading/loading.tpl.html')
    };
  }
]);
