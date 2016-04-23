var app = angular.module('ProjectDulcinea');

app.directive('ngModalDialog', [
  '$templateCache',
  function($templateCache) {
    return {
      transclude: true,
      replace: true,
      restrict: 'E',
      template: $templateCache.get('components/modal/modal-dialog.tpl.html'),
      scope: {
        modalId: '@modalId',   // One way binding, expression expected
        title: '@',            // One way binding, expression expected
        show: '=modalVisible'  // Two way binding, variable name expected
      },
      link: function (scope, element, attrs) {
        // Set modalShow if not set
        if (!attrs.modalShow) attrs.modalShow = scope.modalId + "Visible";
        // Watch for changes on 'show' variable and change visibility
        // of the element through bootstrap javascript API
        scope.$watch('show', function(showValue) {
          console.log("Visibility changed to " + showValue);
          if (showValue) element.modal('show');
          else element.modal('hide');
        });
        // Update modalVisible value when it is opened via data attributes
        element.bind('shown.bs.modal', function() {
          console.log("Event 'shown.bs.modal' triggered");
          scope.$apply(function() {
            scope.$parent[attrs.modalVisible] = true;
          });
        });
        // Update modalVisible value when it is closed via data attributes
        element.bind('hidden.bs.modal', function() {
          console.log("Event 'hidden.bs.modal' triggered");
          scope.$apply(function() {
            scope.$parent[attrs.modalVisible] = false;
          });
        });
      }
    }
  }
]);
