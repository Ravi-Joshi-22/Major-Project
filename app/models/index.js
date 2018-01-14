const mongoose = require('mongoose');

const userSchema = require('./Users');
const companySchema = require('./Company');

/**
 * This file should import all the schema and register a mongoose model
 * here and export the same. This is the file which should be imported during
 * any of the database operation that needs to be done throughout our project
 */

module.exports = {
  User: mongoose.model('User', userSchema),
  Company: mongoose.model('Company', companySchema),
};
