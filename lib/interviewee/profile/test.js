const async = require('async');
const mongoose = require('mongoose');
const Models = require('../../../app/models');
const Interviewee = Models.Interviewee;
const userHelper = require('../../../app/helpers/user');
const CONSTANTS = require('../../../config/constants');

/**
 * Function to add new Test Details of logged Interviewee
 * @param {ObjectId} userId user Id
 * @param {Object} testData having Test Data
 * @param {Object} callback has two parameters first errorInSave and Saved Interviewee Details
 */
function addTestOfInterviewee(userId, testData, callback) {
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
        fetchedInterviewee.tests.push(testData);
        fetchedInterviewee.save(function(errInSave, savedInterviewee) {
          if (errInSave) {
            waterfallCallback({
              type: CONSTANTS.ERROR_TYPES.DB_ERROR,
              msg: 'Unable to add new Test Details',
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
 * Function to update existing Test Details of logged Interviewee
 * @param {ObjectId} userId user Id
 * @param {Object} testData having newly generated Test Data for existing Test Id
 * @param {Object} callback has two parameters first errorInSave and Saved Interviewee Details
 */
function updateTestOfInterviewee(userId, testData, callback) {
  Interviewee.findOneAndUpdate(
    {
      userId: userId,
      tests: {
        $elemMatch: {
          _id: mongoose.Types.ObjectId(testData._id),
        },
      },
    },
    {
      $set: {
        'tests.$.name': testData.name,
        'tests.$.score': testData.score,
        'tests.$.date': testData.date,
      },
    },
    function(errInSave, returnedInstance) {
      if (errInSave) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg: 'Unable to update existing Test Details',
          errorDetail: JSON.stringify(errInSave),
        });
      } else {
        callback(null, returnedInstance);
      }
    }
  );
}

/**
 * Function to delete existing Test Details of logged Interviewee
 * @param {ObjectId} userId user Id
 * @param {ObjectId} testId having existing Test Id
 * @param {Object} callback has two parameters first errorInSave and Saved Interviewee Details
 */
function deleteTestOfInterviewee(userId, testId, callback) {
  Interviewee.findOneAndUpdate(
    {
      userId: userId,
    },
    {
      $pull: {
        tests: {
          _id: mongoose.Types.ObjectId(testId),
        },
      },
    },
    {
      multi: true,
    },
    function(errInSave, returnedInstance) {
      if (errInSave) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg: 'Unable to delete existing Test Details',
          errorDetail: JSON.stringify(errInSave),
        });
      } else {
        callback(null, returnedInstance);
      }
    }
  );
}

module.exports = {
  addTestOfInterviewee: addTestOfInterviewee,
  updateTestOfInterviewee: updateTestOfInterviewee,
  deleteTestOfInterviewee: deleteTestOfInterviewee,
};
