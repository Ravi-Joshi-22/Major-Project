const async = require('async');
const mongoose = require('mongoose');
const Models = require('../../../app/models');
const Interviewee = Models.Interviewee;
const userHelper = require('../../../app/helpers/user');
const CONSTANTS = require('../../../config/constants');

/**
 * Function to update Secondary Details of logged Interviewee
 * @param {ObjectId} userId user Id
 * @param {Object} secondaryData having Secondary Education Data
 * @param {Object} callback has two parameters first errorInSave and Saved Interviewee Details
 */
function updateSecondaryOfInterviewee(userId, secondaryData, callback) {
  async.waterfall(
    [
      function(waterfallCallback) {
        userHelper.getIntervieweeDetails(userId, function(
          err,
          fetchedInterviewee
        ) {
          waterfallCallback(err, fetchedInterviewee);
        });
      },

      function(fetchedInterviewee, waterfallCallback) {
        fetchedInterviewee.before_senior_sec.secondary = secondaryData;
        fetchedInterviewee.save(function(errInSave, savedInterviewee) {
          if (errInSave) {
            waterfallCallback({
              type: CONSTANTS.ERROR_TYPES.DB_ERROR,
              msg: 'Unable to update secondary Details',
              errorDetail: JSON.stringify(errInSave),
            });
          } else {
            waterfallCallback(null, savedInterviewee);
          }
        });
      },
    ],
    function(err, data) {
      callback(err, data);
    }
  );
}

module.exports = {
  updateSecondaryOfInterviewee: updateSecondaryOfInterviewee,
};
