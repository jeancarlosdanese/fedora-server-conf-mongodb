'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  os = require('os'),
  _ = require('lodash');

var memTotal = os.totalmem();

exports.memory = function(req, res) {

  var memLivre = os.freemem();
  var memResumo = [memTotal, memLivre];

  res.jsonp(memResumo);

};
