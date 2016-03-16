(function () {
  'use strict';

  angular
    .module('principal')
    .controller('PrincipalViewController', PrincipalViewController);

  PrincipalViewController.$inject = ['PrincipalService'];

  function PrincipalViewController(PrincipalService) {
    var vm = this;

    vm.principal = PrincipalService.query();
  }

  angular
    .module('principal')
    .controller('PrincipalController', PrincipalController);

  PrincipalController.$inject = ['$scope', '$http', '$interval'];

  function PrincipalController($scope, $http, $interval) {
    
  }


})();
