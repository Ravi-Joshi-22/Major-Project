const async = require('async');
const mongoose = require('mongoose');
const Models = require('../../app/models');
const Company = Models.Company;
const JobOpening = Models.JobOpening;
const userHelper = require('../../app/helpers/user');
const CONSTANTS = require('../../config/constants');
const KEYS = require('../../config/keys');

/**
 * Function to get company details from userId
 * @param {objectId} userId user objectId
 * @param {Function} callback function two param err and fetched user
 */

function getDashboardDetails(userId, callback) {
  Company.find({
    users: userId,
  }).exec(function(fetchError, companyDetails) {
    if (fetchError) {
      callback({
        type: CONSTANTS.ERROR_TYPES.DB_ERROR,
        msg: 'Unable to fetch company details',
        errorDetail: String(fetchError),
      });
    } else if (!companyDetails) {
      callback({
        type: CONSTANTS.ERROR_TYPES.INVALID_RECORD,
        msg: 'No company with given id',
        errorDetail: 'Invalid User ID.',
      });
    } else {
      callback(null, companyDetails);
    }
  });
}

module.exports = {
  getDashboardDetails: getDashboardDetails,
};
