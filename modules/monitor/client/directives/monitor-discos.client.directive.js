(function () {
  'use strict';

  // Directive monitor-discos
  angular
    .module('monitor')
    .directive('monitorDiscos', [function() {

      return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'modules/monitor/client/views/monitor-discos.template.html',
        controller: 'MonitorDiscosController',
        controllerAs: 'vm'
        /*link: function(scope, element, attrs) {

        }*/
      };
    }]);

})();
