(function () {
  'use strict';

  // Downloads controller
  angular
    .module('downloads')
    .controller('DownloadsController', DownloadsController);

  DownloadsController.$inject = ['$scope', '$state', 'Authentication', 'downloadResolve'];

  function DownloadsController ($scope, $state, Authentication, download) {
    var vm = this;

    vm.authentication = Authentication;
    vm.download = download;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Download
    function remove() {
      if (confirm('Tem certeza de que deseja excluir?')) {
        vm.download.$remove($state.go('downloads.list'));
      }
    }

    // Save Download
    function save(isValid) {

      console.log('entrou');

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.downloadForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.download._id) {
        vm.download.$update(successCallback, errorCallback);
      } else {
        vm.download.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('downloads.list', {
          downloadId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
