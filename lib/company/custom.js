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

function _populateCompanyUsers(companyId, callback) {
  Company.find({
    _id: mongoose.Types.ObjectId(companyId),
  })
    .populate({
      path: 'users',
      select: { password: 0 },
    })
    .exec(function(err, fetchedData) {
      if (err) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg: 'Failed to check record',
          errorDetail: JSON.stringify(err),
        });
      } else {
        callback(null, fetchedData);
      }
    });
}

function getDashboardDetails(userId, callback) {
  async.waterfall(
    [
      function(waterfallCallback) {
        userHelper.getCompanyDetailsFromUser(userId, function(
          err,
          companyData
        ) {
          waterfallCallback(err, companyData);
        });
      },

      function(companyData, waterfallCallback) {
        _populateCompanyUsers(companyData._id, function(err, populatedData) {
          waterfallCallback(err, populatedData);
        });
      },
    ],
    function(err, data) {
      callback(err, data[0]);
    }
  );
}

module.exports = {
  getDashboardDetails: getDashboardDetails,
};
