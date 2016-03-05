(function () {
  'use strict';

  // Ambientes controller
  var ambientesApp = angular.module('ambientes');
  
  ambientesApp.controller('AmbientesController', AmbientesController);

  AmbientesController.$inject = ['$scope', '$state', 'Authentication', 'ambienteResolve', 'DispositivosService', '$modal', '$log'];

  function AmbientesController ($scope, $state, Authentication, ambiente, DispositivosService, $modal, $log) {
    var vm = this;

    vm.authentication = Authentication;
    vm.ambiente = ambiente;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    vm.animationsEnabled = true;

    vm.toggleAnimation = function () {
      vm.animationsEnabled = !vm.animationsEnabled;
    };

    // Remove existing Ambiente
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.ambiente.$remove($state.go('ambientes.list'));
      }
    }

    // Save Ambiente
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.ambienteForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.ambiente._id) {
        vm.ambiente.$update(successCallback, errorCallback);
      } else {
        vm.ambiente.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('ambientes.view', {
          ambienteId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    // Open a modal window to create a simple customer record
    vm.modalCreateDispositivo = function (size, ambiente) {

      var modalInstance = $modal.open({
        animation: vm.animationsEnabled,
        templateUrl: 'modules/ambientes/client/views/create-dispositivo.client.view.html',
        controller: function($scope, $modalInstance) {

          var vm = this;

          vm.msg = 'Mensagem do jean';

          vm.ambiente = ambiente;
          console.log(vm.ambiente);

          vm.ok = function () {
            // if(customer.updateCustomerForm.$valid) {
            $modalInstance.close();  
            // }
          };

          vm.cancel = function () {
            $modalInstance.dismiss('cancel');
          };

        },
        controllerAs: 'vmModal',
        size: size
      });

      modalInstance.result.then(function (selectedItem) {
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    // Open a modal window to create a simple customer record
    vm.modalEditDispositivo = function (size, selectedDispositivo) {

      var modalInstance = $modal.open({
        animation: vm.animationsEnabled,
        templateUrl: 'modules/ambientes/client/views/edit-dispositivo.client.view.html',
        controller: function($scope, $modalInstance) {

          var vm = this;

          vm.selectedDispositivo = selectedDispositivo;

          vm.ok = function () {
            // if(customer.updateCustomerForm.$valid) {
            $modalInstance.close();  
            // }
          };

          vm.cancel = function () {
            $modalInstance.dismiss('cancel');
          };

        },
        controllerAs: 'vmModal',
        size: size,
        resolve: {
          dispositivo: function () {
            return selectedDispositivo;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selectedDispositivo = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    vm.removeDispositivo = function(dispositivo) {
      if(dispositivo) {

        for(var i in vm.ambiente.dispositivos) {
          if(vm.ambiente.dispositivos[i] === dispositivo) {
            if (confirm('Sem certeza que deseja excluir o dispositivo' + dispositivo.name + '?')) {
              dispositivo = new DispositivosService(vm.ambiente.dispositivos[i]);
              dispositivo.$remove();
              vm.ambiente.dispositivos.splice(i, 1);
            }
          }
        }
      }
    };

  }

  ambientesApp.controller('DispositivoModalCreateController', DispositivoModalCreateController);

  DispositivoModalCreateController.$inject = ['$scope', 'DispositivosService', 'Notify'];

  function DispositivoModalCreateController ($scope, DispositivosService, Notify) {
    
    var vm = this;

    vm.dispositivo = new DispositivosService({});
    vm.error = null;
    vm.form = {};
    vm.save = save;

    // Save Dispositivo
    function save(isValid, ambiente) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.dispositivoForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.dispositivo._id) {
        vm.dispositivo.$update(successCallback, errorCallback);
      } else {
        vm.dispositivo.$save(successCallback, errorCallback);
      }

      function successCallback(dispositivo) {
        ambiente.dispositivos = ambiente.dispositivos ? ambiente.dispositivos : [];
        ambiente.dispositivos.push(dispositivo._id);
        ambiente.$update(function(ambiente){
          Notify.sendMsg('AtualizarAmbiente', { 'id': ambiente._id });
        }, function(err) {
          console.log(err);
        });
      }

      function errorCallback(err) {
        vm.error = err.data.message;
      }
    }
    
  }

  ambientesApp.controller('DispositivoModalEditController', DispositivoModalEditController);

  DispositivoModalEditController.$inject = ['$scope', 'DispositivosService', 'Notify'];

  function DispositivoModalEditController ($scope, DispositivosService, Notify) {
    
    var vm = this;

    /* pega o dispositivo passado por parametro para modalEditDispositivo */
    vm.dispositivo = new DispositivosService($scope.$parent.vmModal.selectedDispositivo);
    vm.error = null;
    vm.form = {};
    vm.save = save;

    // Save Dispositivo
    function save(isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.dispositivoForm');
        return false;
      }

      vm.dispositivo.$update(successCallback, errorCallback);

      function successCallback(dispositivo) {
        Notify.sendMsg('AtualizarDispositivo', { 'id': dispositivo._id });
      }

      function errorCallback(err) {
        vm.error = err.data.message;
      }
    }
    
  }

  ambientesApp.directive('dispositivosList', ['AmbientesService', 'DispositivosService', 'Notify', function(AmbientesService, DispositivosService, Notify) {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'modules/ambientes/client/views/list-dispositivos.client.template.html',
      link: function(scope, element, attrs) {

        // quando adicionado um dispositivo, atualiza o ambiente, consequentemente a lista de dispositivos.
        Notify.getMsg('AtualizarAmbiente', function(event, data) {
          scope.vm.ambiente = AmbientesService.get(
            { ambienteId: scope.vm.ambiente._id }
          );
        });

        // quando adicionado um dispositivo, atualiza o ambiente, consequentemente a lista de dispositivos.
        /*Notify.getMsg('AtualizarDispositivo', function(event, data) {
          // console.log('Data: ' + data.id);
          var dispositivos = scope.vm.ambiente.dispositivos;
          for (var i = dispositivos.length - 1; i >= 0; i--) {
            var dispositivo = (dispositivos[i]);
            if(dispositivo._id === data.id) {
              dispositivo = DispositivosService.get({dispositivoId: data.id});
              dispositivos[i] = dispositivo;
            }
          }

          scope.vm.ambiente.dispositivos = dispositivos;
        });*/

        Notify.getMsg('AtualizarDispositivo', function(event, data) { 
          for (var i = scope.vm.ambiente.dispositivos.length - 1; i >= 0; i--) {
            if(scope.vm.ambiente.dispositivos[i]._id === data.id) {
              scope.vm.ambiente.dispositivos[i] = DispositivosService.get({ dispositivoId: data.id });
            }
          }
        });

      }
    };
  }]);

})();
