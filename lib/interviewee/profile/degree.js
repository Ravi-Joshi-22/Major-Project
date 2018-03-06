const async = require('async');
const mongoose = require('mongoose');
const Models = require('../../../app/models');
const Interviewee = Models.Interviewee;
const userHelper = require('../../../app/helpers/user');
const CONSTANTS = require('../../../config/constants');

/**
 * Function to add new Degree Details of logged Interviewee
 * @param {ObjectId} userId user Id
 * @param {Object} degreeData having After Senior Secondary Education Data
 * @param {Object} callback has two parameters first errorInSave and Saved Interviewee Details
 */
function addDegreeOfInterviewee(userId, degreeData, callback) {
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
        fetchedInterviewee.after_senior_sec.push(degreeData);
        fetchedInterviewee.save(function(errInSave, savedInterviewee) {
          if (errInSave) {
            waterfallCallback({
              type: CONSTANTS.ERROR_TYPES.DB_ERROR,
              msg: 'Unable to add new Degree Details',
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
 * Function to update After Senior Secondary Education Details of logged Interviewee
 * @param {ObjectId} userId user Id
 * @param {Object} degreeData having After Senior Secondary Education Data
 * @param {Object} callback has two parameters first errorInSave and Saved Interviewee Details
 */
function updateDegreeOfInterviewee(userId, degreeData, callback) {
  Interviewee.findOneAndUpdate(
    {
      userId: userId,
      after_senior_sec: {
        $elemMatch: {
          _id: mongoose.Types.ObjectId(degreeData._id),
        },
      },
    },
    {
      $set: {
        'after_senior_sec.$.college': degreeData.college,
        'after_senior_sec.$.start_year': degreeData.start_year,
        'after_senior_sec.$.end_year': degreeData.end_year,
        'after_senior_sec.$.degree': degreeData.degree,
        'after_senior_sec.$.stream': degreeData.stream,
        'after_senior_sec.$.performance': degreeData.performance,
      },
    },
    function(errInSave, returnedInstance) {
      if (errInSave) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg: 'Unable to update Degree Details',
          errorDetail: JSON.stringify(errInSave),
        });
      } else {
        callback(null, returnedInstance);
      }
    }
  );
}

/**
 * Function to delete After Senior Secondary Education Details of logged Interviewee
 * @param {ObjectId} userId user Id
 * @param {Object} degreeData having After Senior Secondary Education Data
 * @param {Object} callback has two parameters first errorInSave and Saved Interviewee Details
 */
function deleteDegreeOfInterviewee(userId, degreeId, callback) {
  Interviewee.findOneAndUpdate(
    {
      userId: userId,
    },
    {
      $pull: {
        after_senior_sec: {
          _id: mongoose.Types.ObjectId(degreeId),
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
          msg: 'Unable to delete Degree Details',
          errorDetail: JSON.stringify(errInSave),
        });
      } else {
        callback(null, returnedInstance);
      }
    }
  );
}

module.exports = {
  addDegreeOfInterviewee: addDegreeOfInterviewee,
  updateDegreeOfInterviewee: updateDegreeOfInterviewee,
  deleteDegreeOfInterviewee: deleteDegreeOfInterviewee,
};
