'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', 'Authentication', 'Menus', '$location',
  function ($scope, $state, Authentication, Menus, $location) {
    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;

    //indica se o usuario logado é admin
    if($scope.authentication && $scope.authentication.user) {
      $scope.authentication.user.isAdmin = $scope.authentication.user.roles.indexOf('admin') !== -1;
    }

    /*JOEL: testa se tem usuario, se tem vai para home ou outra url desejada pelo usuario
    se nao tem usuario logado direciona para a tela de login*/
    if ($scope.authentication.user) {

    }else {
      $location.path('/authentication/signin');
    }
    // Get the topbar menu
    $scope.menu = Menus.getMenu('topbar');

    // Toggle the menu items
    $scope.isCollapsed = false;
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });
  }
]);
