(function () {
  'use strict';

  angular
    .module('dispositivos')
    .controller('DispositivosListController', DispositivosListController);

  DispositivosListController.$inject = ['DispositivosService'];

  function DispositivosListController(DispositivosService) {
    var vm = this;

    vm.dispositivos = DispositivosService.query();
  }
})();
