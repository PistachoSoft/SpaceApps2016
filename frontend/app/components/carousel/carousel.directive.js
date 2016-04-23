angular.module('ProjectDulcinea').directive('carousel', [
  '$templateCache',
  function($templateCache) {
    return {
      replace: true,
      restrict: 'A',
      template: $templateCache.get('components/carousel/carousel.tpl.html')
    };
  }
]);
