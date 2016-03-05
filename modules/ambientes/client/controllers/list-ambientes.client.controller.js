(function () {
  'use strict';

  angular
    .module('ambientes')
    .controller('AmbientesListController', AmbientesListController);

  AmbientesListController.$inject = ['AmbientesService'];

  function AmbientesListController(AmbientesService) {
    var vm = this;

    vm.ambientes = AmbientesService.query();
  }
})();
