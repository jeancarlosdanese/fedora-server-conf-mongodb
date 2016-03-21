'use strict';

var os = require('os');

var interval = 3000;
var index = 1;
var monitorCpuId;

// Create the chat configuration
module.exports = function (io, socket) {

  monitorCpuId = setInterval(function() {
    percentageUsoCpus(interval, function(usoCpus) {
      console.log(usoCpus);
      io.emit('cpu_usage', usoCpus);
    });
    index++;
  }, interval);

  socket.on('stop_monitor_cpu', function () {
    console.log('ba tche');
    clearInterval(monitorCpuId);
  });

  // Emit the status event when a socket client is disconnected
  socket.on('disconnect', function () {
    clearInterval(monitorCpuId);
    io.emit('cpu_usage', {
      type: 'status',
      text: 'disconnected',
      created: Date.now(),
      username: socket.request.user.username
    });
  });
};

function percentageUsoCpus(interval, callback) {
  var usoCpus = [];
  var dadosCpusStart = dadosCpus();

  setTimeout(function() {
    var dadosCpusEnd = dadosCpus();

    for(var i in dadosCpusEnd) {
      var diffTotalTimes = dadosCpusEnd[i].totalTimes - dadosCpusStart[i].totalTimes;
      var diffIdle = dadosCpusEnd[i].idle - dadosCpusStart[i].idle;

      var percentagem = (100 - (100 * (diffIdle / diffTotalTimes))).toFixed(2);
      usoCpus.push({ index: index, cpu: i, percentagem: percentagem });
    }
    callback(usoCpus);

  }, interval);
}

function dadosCpus() {
  var totalIdle = 0, totalTimes = 0;
  var cpus = os.cpus();
  var dados = [];

  for(var i in cpus) {
    var cpu = cpus[i];

    for(var t in cpu.times) {
      totalTimes += cpu.times[t];
    }

    totalIdle += cpu.times.idle;

    dados.push({ cpu: i, idle: totalIdle, totalTimes: totalTimes });

  }

  return dados;
}
