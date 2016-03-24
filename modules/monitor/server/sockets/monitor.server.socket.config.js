'use strict';

var os = require('os'),
  sprintf = require('sprintf-js').sprintf;

// var index = 20;
var interval = 3000;
var monitorCpuId;
var tempo = 0;

// Configuração de socket para monitoramento de desempenho
module.exports = function (io, socket) {

  var dadosCpusStart = dadosCpus();

  // gera series para o gráfico de monitoramento de processadores
  socket.on('start_monitor_cpu', function () {
    if(monitorCpuId === undefined) {
      monitorCpuId = setInterval(function() {
        // console.log(sprintf('%s', function() { return new Date().toString(); }));
        percentuaisUsoCpus(function(utilizacaoCpus) {
          io.emit('utilizacao_cpus', utilizacaoCpus);
        });
        dadosMemoria(function(utilizacaoMemoria) {
          io.emit('utilizacao_memoria', utilizacaoMemoria);
        });
      }, interval);
    }
  });

  // limpa o intervalo de monitoramento dos processadores
  socket.on('stop_monitor_cpu', function () {
    clearInterval(monitorCpuId);
    monitorCpuId = undefined;
  });

  // Emit the status event when a socket client is disconnected
  socket.on('disconnect', function () {
    clearInterval(monitorCpuId);
    monitorCpuId = undefined;
  });

  // Calcula e o percentual de uso das cpus retornando um array de utilizacaoCpus
  function percentuaisUsoCpus(callback) {
    var utilizacaoCpus = [];

    var dadosCpusEnd = dadosCpus();

    for(var i in dadosCpusEnd) {
      var diffTotalTimes = dadosCpusEnd[i].totalTimes - dadosCpusStart[i].totalTimes;
      var diffIdle = dadosCpusEnd[i].idle - dadosCpusStart[i].idle;

      var percentagem = 100 - (100 * (diffIdle / diffTotalTimes));
      utilizacaoCpus.push({ percentagem: percentagem });
    }
    callback(utilizacaoCpus);
    dadosCpusStart = dadosCpus();
  }

  // retorna um array de dadosCpus
  function dadosCpus() {
    var cpus = os.cpus();
    var dados = [];

    for(var i in cpus) {
      var totalIdle = 0, totalTimes = 0;
      var cpu = cpus[i];

      for(var t in cpu.times) {
        totalTimes += cpu.times[t];
      }

      totalIdle += cpu.times.idle;

      dados.push({ cpu: i, idle: totalIdle, totalTimes: totalTimes });

    }

    return dados;
  }

  function dadosMemoria(callback) {
    var memoriaTotal = os.totalmem();
    var memoriaLivre = os.freemem();

    callback({ 'memoriaTotal': memoriaTotal, 'memoriaLivre': memoriaLivre });
  }

};
