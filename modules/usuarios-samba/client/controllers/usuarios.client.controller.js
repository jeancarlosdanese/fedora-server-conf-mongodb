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
    vm.save = save;

    // Save Usuario
    function save(isValid) {
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
