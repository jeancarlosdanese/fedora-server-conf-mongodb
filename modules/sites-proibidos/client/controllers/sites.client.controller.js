(function () {
  'use strict';

  // Sites controller
  angular
    .module('sites')
    .controller('SitesController', SitesController);

  SitesController.$inject = ['$scope', '$state', 'Authentication', 'siteResolve'];

  function SitesController ($scope, $state, Authentication, site) {
    var vm = this;

    vm.authentication = Authentication;
    vm.site = site;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Site
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.site.$remove($state.go('sites.list'));
      }
    }

    // Save Site
    function save(isValid) {

      console.log('entrou');

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.siteForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.site._id) {
        vm.site.$update(successCallback, errorCallback);
      } else {
        vm.site.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('sites.list', {
          siteId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();