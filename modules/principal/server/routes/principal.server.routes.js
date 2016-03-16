'use strict';

/**
 * Module dependencies
 */
var principalPolicy = require('../policies/principal.server.policy'),
  principal = require('../controllers/principal.server.controller');

module.exports = function(app) {
  // Monitor Routes
  app.route('/api/principal/memory').all(principalPolicy.isAllowed)
    .get(principal.memory);

};
