/**
 * @typedef Image
 * @type {Object}
 * @property {string} name: display name of the image.
 * @property {string} src: the src of the image.
 */

/**
 * Directive that renders a list of images, allowing to zoom and cycle images.
 *
 * Receives as scope parameters:
 *
 * - {Array.<Image>} images: list of images to display.
 */
angular.module('ProjectBarataria').directive('carousel', [
  '$templateCache',
  function($templateCache) {
    return {
      replace: true,
      restrict: 'A',
      scope: {
        images: '='
      },
      template: $templateCache.get('components/carousel/carousel.tpl.html'),
      link: function(scope, element) {

        scope.index = 0;

        scope.prevImg = function() {
          scope.index = (scope.index + 2) % 3;
        };

        scope.nextImg = function() {
          scope.index = (scope.index + 1) % 3;
        };

      }
    };
  }
]);
