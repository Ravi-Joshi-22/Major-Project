const async = require('async');
const mongoose = require('mongoose');
const Models = require('../../../app/models');
const Interviewee = Models.Interviewee;
const userHelper = require('../../../app/helpers/user');
const CONSTANTS = require('../../../config/constants');

/**
 * Function to update Senior Secondary Details of logged Interviewee
 * @param {ObjectId} userId user Id
 * @param {Object} seniorSecondaryData having Senior Secondary Education Data
 * @param {Object} callback has two parameters first errorInSave and Saved Interviewee Details
 */
function updateSeniorSecondaryOfInterviewee(
  userId,
  seniorSecondaryData,
  callback
) {
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
        fetchedInterviewee.before_senior_sec.senior_sec = seniorSecondaryData;
        fetchedInterviewee.save(function(errInSave, savedInterviewee) {
          if (errInSave) {
            waterfallCallback({
              type: CONSTANTS.ERROR_TYPES.DB_ERROR,
              msg: 'Unable to update senior secondary Details',
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

/**
 * Function to update Senior Secondary Details of logged Interviewee
 * @param {ObjectId} userId user Id
 * @param {Object} callback has two parameters first errorInSave and Saved Interviewee Details
 */
function deleteSeniorSecondaryOfInterviewee(userId, callback) {
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
        fetchedInterviewee.before_senior_sec.senior_sec = {
          school: '',
          board: '',
          stream: CONSTANTS.ENUMS.USER.STREAM_VALUE.SCIENCE,
          year_of_comp: null,
          performance: {
            scale: CONSTANTS.ENUMS.USER.PERFORMANCE_SCALE.CGPA,
            value: null,
          },
        };
        fetchedInterviewee.save(function(errInSave, savedInterviewee) {
          if (errInSave) {
            waterfallCallback({
              type: CONSTANTS.ERROR_TYPES.DB_ERROR,
              msg: 'Unable to delete senior secondary Details',
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
  updateSeniorSecondaryOfInterviewee: updateSeniorSecondaryOfInterviewee,
  deleteSeniorSecondaryOfInterviewee: deleteSeniorSecondaryOfInterviewee,
};
