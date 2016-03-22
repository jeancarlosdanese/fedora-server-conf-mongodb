(function () {
  'use strict';

  angular
    .module('core')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // TOP MENU BAR ITEM
    //Cadastro
    Menus.addMenuItem('topbar', {
      title: 'Cadastrar',
      state: 'cadastro',
      type: 'dropdown',
      roles: ['admin', 'user']
    });

    //TOP BAR SUBMENU ITEM
    //ambiente
    Menus.addSubMenuItem('topbar', 'cadastro', {
      title: 'Ambiente',
      state: 'ambientes.create',
      roles: ['admin']
    });

    //dispositivo
    Menus.addSubMenuItem('topbar', 'cadastro', {
      title: 'Dispositivo',
      state: 'dispositivos.create',
      roles: ['admin']
    });

    //dowload
    Menus.addSubMenuItem('topbar', 'cadastro', {
      title: 'Download',
      state: 'downloads.create',
      roles: ['admin']
    });

    //firewal
    Menus.addSubMenuItem('topbar', 'cadastro', {
      title: 'Firewall',
      state: 'firewalls.create',
      roles: ['admin']
    });

    //grupo
    Menus.addSubMenuItem('topbar', 'cadastro', {
      title: 'Grupo',
      state: 'grupos.create',
      roles: ['admin']
    });

    //log
    Menus.addSubMenuItem('topbar', 'cadastro', {
      title: 'Log',
      state: 'logs.create',
      roles: ['admin']
    });

    //rede
    Menus.addSubMenuItem('topbar', 'cadastro', {
      title: 'Rede',
      state: 'redes.create',
      roles: ['admin']
    });

    //site proibido
    Menus.addSubMenuItem('topbar', 'cadastro', {
      title: 'Proibir site',
      state: 'sites.create',
      roles: ['admin']
    });

    //uusuario samba
    Menus.addSubMenuItem('topbar', 'cadastro', {
      title: 'Usuário samba',
      state: 'usuarios.create',
      roles: ['admin']
    });
  }
})();
