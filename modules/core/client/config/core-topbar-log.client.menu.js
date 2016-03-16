(function () {
  'use strict';

  angular
    .module('core')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // TOP MENU BAR ITEM
    //Log
    Menus.addMenuItem('topbar', {
      title: 'Log',
      state: 'logs',
      type: 'dropdown',
      roles: ['admin', 'user']
    });

    //TOP BAR SUBMENU ITEM
    Menus.addSubMenuItem('topbar', 'logs', {
      title: 'Listar logs',
      state: 'logs.list'
    });

    //autenticacao
    Menus.addSubMenuItem('topbar', 'logs', {
      title: 'Autenticação',
      state: 'logs.list-autenticacao'
    });

    //eventos
    Menus.addSubMenuItem('topbar', 'logs', {
      title: 'Eventos',
      state: 'logs.list-eventos'
    });

    //firewall
    Menus.addSubMenuItem('topbar', 'logs', {
      title: 'Firewall',
      state: 'logs.list-firewall'
    });

    //mrtg
    Menus.addSubMenuItem('topbar', 'logs', {
      title: 'Mrtg',
      state: 'logs.list-mrtg'
    });

    //mrtg
    Menus.addSubMenuItem('topbar', 'logs', {
      title: 'Sarg',
      state: 'logs.list-sarg'
    });
  }
})();