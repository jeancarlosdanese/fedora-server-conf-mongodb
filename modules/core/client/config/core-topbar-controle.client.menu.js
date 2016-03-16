(function () {
  'use strict';

  angular
    .module('core')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // TOP MENU BAR ITEM
    //Controle
    Menus.addMenuItem('topbar', {
      title: 'Controle',
      state: 'controle',
      type: 'dropdown',
      roles: ['admin', 'user']
    });

    //TOP BAR SUBMENU ITEM
    //ambientes
    Menus.addSubMenuItem('topbar', 'controle', {
      title: 'Ambientes',
      state: 'ambientes.list'
    });

    //dispositivos
    Menus.addSubMenuItem('topbar', 'controle', {
      title: 'Dispositivos',
      state: 'dispositivos.list'
    });

    //downloads
    Menus.addSubMenuItem('topbar', 'controle', {
      title: 'Downloads',
      state: 'downloads.list'
    });

    //firewal
    Menus.addSubMenuItem('topbar', 'controle', {
      title: 'Firewalls',
      state: 'firewalls.list'
    });

    //grupos
    Menus.addSubMenuItem('topbar', 'controle', {
      title: 'Grupos',
      state: 'grupos.list'
    });

    //monitor
    Menus.addSubMenuItem('topbar', 'controle', {
      title: 'Monitor',
      state: 'monitor.view'
    });

    //redes
    Menus.addSubMenuItem('topbar', 'controle', {
      title: 'Redes',
      state: 'redes.list'
    });

    //sites proibidos
    Menus.addSubMenuItem('topbar', 'controle', {
      title: 'Sites',
      state: 'sites.list'
    });

    //usuarios samba
    Menus.addSubMenuItem('topbar', 'controle', {
      title: 'Usuários samba',
      state: 'usuarios.list'
    });

  }
})();