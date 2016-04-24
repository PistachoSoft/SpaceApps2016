/**
 * Directive that renders details for an event.
 *
 * Receives as scope parameters:
 *
 * - {string} modal-id: id for the modal
 * - {string} title: title of the modal
 * - {boolean} visible: variable that will control the visibility of the view
 */
angular.module('ProjectBarataria').directive('modalDialog', [
  '$templateCache',
  function($templateCache) {
    return {
      transclude: true,
      replace: true,
      restrict: 'A',
      template: $templateCache.get('components/modal/modal-dialog.tpl.html'),
      scope: {
        modalId: '@',
        title: '@',
        visible: '='
      },
      link: function (scope, element, attrs) {
        // Set modalShow if not set
        if (!attrs.modalShow) attrs.modalShow = scope.modalId + 'Visible';
        // Watch for changes on 'show' variable and change visibility
        // of the element through bootstrap javascript API
        scope.$watch('visible', function(showValue) {
          element.modal(showValue ? 'show' : 'hide');
        });
        // Update modalVisible value when it is opened via data attributes
        element.bind('shown.bs.modal', function() {
          scope.$apply(function() {
            scope.$parent[attrs.visible] = true;
          });
        });
        // Update modalVisible value when it is closed via data attributes
        element.bind('hidden.bs.modal', function() {
          scope.$apply(function() {
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  }
]);
