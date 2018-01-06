/**
 * This file is going to contain only codes related to database connections
 */

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const KEYS = require('../config/keys');

module.exports = function() {
  mongoose.connect(KEYS.MONGO_DB_URI, function(err) {
    if (err) throw err;
  });

  mongoose.connection.on('connected', function() {
    console.log('Mongo DB Connected');
  });

  // If the connection throws an error
  mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ');
    console.log(err);
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', function() {
    console.log('Mongoose connection disconnected');
  });
};
