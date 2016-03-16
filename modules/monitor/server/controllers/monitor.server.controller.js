'use strict';

/**
* Module dependencies.
*/
var path = require('path'),
  os = require('os'),
  sprintf = require('sprintf-js').sprintf,
  cp = require('child_process'),
  _ = require('lodash');

var memTotalGB = sprintf('%.2f', os.totalmem() / (1024 * 1024 * 1024));

exports.memoria = function(req, res) {

  var memLivreGB = sprintf('%.2f', os.freemem() / (1024 * 1024 * 1024));
  var memUsadaGB = sprintf('%.2f', memTotalGB - memLivreGB);
  var memResumo = [{ 'memTotal': memTotalGB }, { 'memUsada': memUsadaGB }, { 'memLivre': memLivreGB }];

  res.jsonp(memResumo);

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
