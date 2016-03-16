(function () {
  'use strict';

  angular
    .module('principal')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('principal', {
        url: '/principal',
        templateUrl: 'modules/principal/client/views/principal.client.view.html',
        controller: 'PrincipalController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Fedora Server Conf'
        }
      })
      .state('principal.view', {
        url: '',
        templateUrl: 'modules/principal/client/views/principal.client.view.html',
        controller: 'PrincipalViewController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Fedora Server Conf'
        }
      });
  } 

})();
