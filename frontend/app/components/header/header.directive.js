angular.module('ProjectDulcinea').directive('header', [
  '$templateCache',
  function($templateCache) {
    return {
      replace: true,
      restrict: 'A',
      template: $templateCache.get('components/header/header.tpl.html')
    };
  }
]);
