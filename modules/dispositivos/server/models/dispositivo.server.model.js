'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Dispositivo Schema
 */
var DispositivoSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Dispositivo name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Dispositivo', DispositivoSchema);
