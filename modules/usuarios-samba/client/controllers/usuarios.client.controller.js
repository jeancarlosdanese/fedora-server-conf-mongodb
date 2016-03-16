(function () {
  'use strict';

  // Usuarios controller
  angular
    .module('usuarios')
    .controller('UsuariosController', UsuariosController);

  UsuariosController.$inject = ['$scope', '$state', 'Authentication', 'usuarioResolve'];

  function UsuariosController ($scope, $state, Authentication, usuario) {
    var vm = this;

    vm.authentication = Authentication;
    vm.usuario = usuario;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Usuario
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.usuario.$remove($state.go('usuarios.list'));
      }
    }

    // Save Usuario
    function save(isValid) {

      console.log('entrou');

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.usuarioForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.usuario._id) {
        vm.usuario.$update(successCallback, errorCallback);
      } else {
        vm.usuario.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('usuarios.list', {
          usuarioId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
