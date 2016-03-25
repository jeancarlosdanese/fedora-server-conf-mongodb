(function () {
  'use strict';

  angular
    .module('monitor')
    .controller('MonitorDiscosController', MonitorDiscosController);

  MonitorDiscosController.$inject = ['$interval', '$scope', '$state', 'Authentication', 'Socket', '$window'];

  function MonitorDiscosController($interval, $scope, $state, Authentication, Socket, $window) {
    var vm = this;
    var d3 = $window.d3;

    vm.piePercent1 = 75;

    vm.discos = [];

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
      var intervaloTempoDiscos = $interval(function () {
        Socket.emit('start_monitor_discos');
      }, 600000);

      Socket.on('utilizacao_discos', function(dadosDiscos){
        vm.discos = dadosDiscos;
        console.log(vm.discos);
      });

      $scope.$on('$destroy', function () {
        $interval.cancel(intervaloTempoDiscos);
        Socket.emit('stop_monitor_discos');
        Socket.removeListener('utilizacao_discos');
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
      lineWidth: 20,
      lineCap: 'circle'
    };

  }

})();
