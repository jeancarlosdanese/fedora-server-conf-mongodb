'use strict';

/**
* Module dependencies.
*/
var path = require('path'),
  os = require('os'),
  sprintf = require('sprintf-js').sprintf,
  cp = require('child_process'),
  _ = require('lodash');

var memTotalGB = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2);

exports.memoria = function(req, res) {

  var memLivreGB = (os.freemem() / (1024 * 1024 * 1024)).toFixed(2);
  var memUsadaGB = (memTotalGB - memLivreGB).toFixed(2);
  var memResumo = [{ 'memTotal': memTotalGB }, { 'memUsada': memUsadaGB }, { 'memLivre': memLivreGB }];

  res.jsonp(memResumo);

};

exports.cpus = function(req, res) {

  var cpus = os.cpus();
  var percUsoCpu = [];
  var cpuNum = 0;

  for (var i = 0; i < cpus.length; i++) {
    var cpu = cpus[i].times;
    var usoCpu = { 'cpuNum': 'CPU-' + (i + 1), 'usoCpu': (((cpu.user + cpu.nice + cpu.sys) / (cpu.user + cpu.nice + cpu.sys + cpu.idle)) * 100).toFixed(2) };
    percUsoCpu.push(usoCpu);
  }

  console.log(percUsoCpu);

  res.jsonp(percUsoCpu);

};

exports.limpaMemoria = function(req, res) {
  cp.exec('su -c "cat /root/teste-exe-jean-boco.txt"', function (error, stdout, stderr) {
    if (error) {
      console.log(error.toString());
    } else if(stderr !== '') {
      console.log(stderr);
    } else {
      console.log('stdout' + stdout);
    }
  });
  res.end();
};
