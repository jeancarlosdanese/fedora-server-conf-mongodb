'use strict';

/**
 * Module dependencies
 */
var monitorPolicy = require('../policies/monitor.server.policy'),
  monitor = require('../controllers/monitor.server.controller');

module.exports = function(app) {
  // Monitor Routes
  app.route('/api/monitor/memoria').all(monitorPolicy.isAllowed)
    .get(monitor.memoria);

};
