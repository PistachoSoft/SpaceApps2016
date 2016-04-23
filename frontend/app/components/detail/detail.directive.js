/**
 * @typedef Link
 * @type {Object}
 * @property {string} name: display name of the link.
 * @property {string} url: the URL of the link.
 */

/**
 * @typedef Image
 * @type {Object}
 * @property {string} name: display name of the image.
 * @property {string} src: the src of the image.
 */

/**
 * Directive that renders details for an event.
 *
 * Receives as scope parameters:
 *
 * - {string} header: the header of the detail view.
 * - {string} description: the body of the detail view.
 * - {Array.<Link>} links: links to list.
 * - {Array.<Image>} images: list of images to display.
 */
angular.module('ProjectDulcinea').directive('detail', [
  '$templateCache',
  function($templateCache) {
    return {
      replace: true,
      restrict: 'A',
      scope: {
        title: '@',
        description: '@',
        links: '=',
        images: '=',
        visible: '='
      },
      template: $templateCache.get('components/detail/detail.tpl.html'),
      link: function(scope, element) {

      }
    };
  }
]);
