angular.module('ProjectBarataria').directive('upload', [
  '$templateCache',
  function($templateCache) {
    return {
      replace: true,
      restrict: 'A',
      template: $templateCache.get('components/upload/upload.tpl.html')
    };
  }
]);
