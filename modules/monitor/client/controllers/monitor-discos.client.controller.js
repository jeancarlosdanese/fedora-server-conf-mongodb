(function () {
  'use strict';

  angular
    .module('monitor')
    .controller('MonitorDiscosController', MonitorDiscosController);

  MonitorDiscosController.$inject = ['$interval', '$state', 'Authentication', 'Socket', '$window'];

  function MonitorDiscosController($interval, $state, Authentication, Socket, $window) {
    var vm = this;
    var d3 = $window.d3;

    vm.piePercent1 = 75;

    vm.data = [{ key: 'Utilização da Discos', values: [] }];

    init();

    function init() {

      // If user is not signed in then redirect back home
      if (!Authentication.user) {
        $state.go('home');
      }

      // Make sure the Socket is connected
      if (!Socket.socket) {
        Socket.connect();
      }

      Socket.emit('start_monitor_discos');
      var intervaloTempoCpu = $interval(function () {
        Socket.emit('start_monitor_discos');
      }, 30000);

      Socket.on('utilizacao_discos', function(dadosDiscos){
        console.log(dadosDiscos);
      });

    }

    vm.pieOptions1 = {
      animate:{
        duration: 700,
        enabled: true
      },
      barColor: '#2C3E50',
      // trackColor: colors.byName('inverse'),
      scaleColor: false,
      lineWidth: 10,
      lineCap: 'circle'
    };

  }

})();
