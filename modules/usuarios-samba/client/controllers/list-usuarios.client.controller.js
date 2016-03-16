(function () {
  'use strict';

  angular
    .module('usuarios')
    .controller('UsuariosListController', UsuariosListController);

  UsuariosListController.$inject = ['UsuariosService','Authentication'];

  function UsuariosListController(UsuariosService, Authentication) {
    var vm = this;

    vm.usuarios = UsuariosService.query();
    vm.authentication = Authentication;
  }
})();
