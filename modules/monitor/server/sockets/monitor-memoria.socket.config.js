'use strict';

var os = require('os'),
  exec = require('child_process').exec,
  sprintf = require('sprintf-js').sprintf;

var monitorMemoriaId;

// Configuração de socket para monitoramento de desempenho
module.exports = function (io, socket) {

  /**  Métodos para monitoramento da memória */

  socket.on('start_monitor_memoria', function () {
    if(monitorMemoriaId === undefined) {
      atualizaPercentuaisMemoria();
      monitorMemoriaId = setInterval(function() {
        atualizaPercentuaisMemoria();
      }, 10000);
    }
  });

  socket.on('utilizacao_memoria', function() {
    atualizaPercentuaisMemoria();
  });

  function atualizaPercentuaisMemoria() {
    dadosMemoria(function(utilizacaoMemoria) {
      io.emit('utilizacao_memoria', utilizacaoMemoria);
    });
  }

  // limpa o intervalo de monitoramento de memória
  socket.on('stop_monitor_memoria', function () {
    stopMonitorMemoria();
  });

  function stopMonitorMemoria() {
    console.log('stop socket memória');
    clearInterval(monitorMemoriaId);
    monitorMemoriaId = undefined;
  }

  // Emit the status event when a socket client is disconnected
  socket.on('disconnect', function () {
    console.log('socket disconnect');
    stopMonitorMemoria();
  });

  function dadosMemoria(callback) {
    var memoriaTotal = os.totalmem();
    var memoriaLivre = os.freemem();

    callback({ 'memoriaTotal': memoriaTotal, 'memoriaLivre': memoriaLivre });
  }

};
