'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Ambiente = mongoose.model('Ambiente'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Ambiente
 */
exports.create = function(req, res) {
  var ambiente = new Ambiente(req.body);
  ambiente.user = req.user;

  ambiente.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(ambiente);
    }
  });
};

/**
 * Show the current Ambiente
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var ambiente = req.ambiente ? req.ambiente.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  ambiente.isCurrentUserOwner = req.user && ambiente.user && ambiente.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(ambiente);
};

/**
 * Update a Ambiente
 */
exports.update = function(req, res) {
  var ambiente = req.ambiente ;

  ambiente = _.extend(ambiente , req.body);

  ambiente.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(ambiente);
    }
  });
};

/**
 * Delete an Ambiente
 */
exports.delete = function(req, res) {
  var ambiente = req.ambiente ;

  ambiente.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(ambiente);
    }
  });
};

/**
 * List of Ambientes
 */
exports.list = function(req, res) { 
  Ambiente.find().sort('-created').populate('user', 'displayName').exec(function(err, ambientes) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(ambientes);
    }
  });
};

/**
 * Ambiente middleware
 */
exports.ambienteByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Ambiente is invalid'
    });
  }

  Ambiente.findById(id).populate('user', 'displayName').populate('dispositivos').exec(function (err, ambiente) {
    if (err) {
      return next(err);
    } else if (!ambiente) {
      return res.status(404).send({
        message: 'No Ambiente with that identifier has been found'
      });
    }
    req.ambiente = ambiente;
    next();
  });
};
