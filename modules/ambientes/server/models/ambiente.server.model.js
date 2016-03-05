'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Ambiente Schema
 */
var AmbienteSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Ambiente name',
    trim: true
  },
  dispositivos: [{
    type: Schema.ObjectId, 
    ref: 'Dispositivo'
  }],
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Ambiente', AmbienteSchema);
