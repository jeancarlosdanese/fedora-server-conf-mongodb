'use strict';

var os = require('os'),
  spawn = require('child_process').spawn,
  sprintf = require('sprintf-js').sprintf;

// var index = 20;
var monitorCpuId;
var monitorDiscosId;

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
      }, 3000);
    }
  });

  socket.on('start_monitor_discos', function () {
    if(monitorDiscosId === undefined) {
      monitorDiscosId = setInterval(function() {
        dadosDisco(function(dadosDisco) {
          io.emit('utilizacao_discos', dadosDisco);
        });
      }, 6000);
    }
  });

  // limpa o intervalo de monitoramento dos processadores
  socket.on('stop_monitor_cpu', function () {
    clearInterval(monitorCpuId);
    monitorCpuId = undefined;
  });

  // limpa o intervalo de monitoramento dos processadores
  socket.on('stop_monitor_discos', function () {
    clearInterval(monitorDiscosId);
    monitorDiscosId = undefined;
  });

  // Emit the status event when a socket client is disconnected
  socket.on('disconnect', function () {
    io.emit('stop_monitor_cpu');
    io.emit('stop_monitor_discos');
    // clearInterval(monitorCpuId);
    // monitorCpuId = undefined;
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

  function dadosDisco(callback) {
    var df = spawn('df', ['-mT']);
    // var grep = spawn('grep', ['-e', '^\'/dev\'']);

    df.stdout.on('data', function (data) {
      // grep.stdin.write(data);
      var discos = [];
      var texto = '';
      for (var i = 0; i < data.length; i++) {
        texto += String.fromCharCode(data[i]);
      }

      var array = texto.split('\n');
      array.forEach(function(novaStr){
        if(novaStr.match(/^\/dev/g)) {
          var campos = novaStr.split(' ');
          var camposLimpos = [];
          campos.forEach(function(str) {
            str = str.trim();
            if(str !== '') {
              camposLimpos.push(str);
            }
          });

          var disco = { 'montagem': camposLimpos[0].trim(),
                      'tipo': camposLimpos[1].trim(),
                      'tamanho': camposLimpos[2].trim(),
                      'usado': camposLimpos[3].trim(),
                      'disponival': camposLimpos[4].trim(),
                      'uso': camposLimpos[5].trim(),
                      'particao': camposLimpos[6].trim()
                    };
          discos.push(disco);
        }
      });

      // var str = data.toString('utf8', 0, data.length);
      callback(discos);
    });

    df.stderr.on('data', function (data) {
      console.log('df stderr: ${data}');
    });

    df.on('close', function(code) {
      if (code !== 0) {
        console.log('df process exited with code ${code}');
      }
      // grep.stdin.end();
    });

    // grep.stdout.on('data', function (data) {
    //   console.log('${data}');
    //   callback(data);
    // });
    //
    // grep.stderr.on('data', function (data) {
    //   console.log('grep stderr: ${data}');
    // });
    //
    // grep.on('close', function (code) {
    //   if (code !== 0) {
    //     console.log('grep process exited with code ${code}');
    //   }
    // });

    /*exec('df -hT | grep -e ^\'/dev\'', function (err, stdout, stderr) {
      if (err) {
        console.error(err);
        return;
      }
      callback(stdout);
    });*/
  }

};
