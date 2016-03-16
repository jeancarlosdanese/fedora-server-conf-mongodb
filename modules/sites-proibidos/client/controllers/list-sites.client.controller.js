(function () {
  'use strict';

  angular
    .module('sites')
    .controller('SitesListController', SitesListController);

  SitesListController.$inject = ['SitesService'];

  function SitesListController(SitesService) {
    var vm = this;

    vm.sites = SitesService.query();
  }
})();
