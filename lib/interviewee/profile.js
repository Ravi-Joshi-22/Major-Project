const async = require('async');
const mongoose = require('mongoose');
const Models = require('../../app/models');
const Interviewee = Models.Interviewee;
const userHelper = require('../../app/helpers/user');
const mailHelper = require('../../app/helpers/mail_helper');
const CONSTANTS = require('../../config/constants');
const KEYS = require('../../config/keys');

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

/**
 * Function to add new Degree Details of logged Interviewee
 * @param {ObjectId} userId user Id
 * @param {Object} degreeData having After Senior Secondary Education Data
 * @param {Object} callback has two parameters first errorInSave and Saved Interviewee Details
 */
function newDegreeOfInterviewee(userId, degreeData, callback) {
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
          msg: 'Unable to update Degree Details',
          errorDetail: JSON.stringify(errInSave),
        });
      } else {
        callback(null, returnedInstance);
      }
    }
  );
}

module.exports = {
  updateSecondaryOfInterviewee: updateSecondaryOfInterviewee,
  updateSeniorSecondaryOfInterviewee: updateSeniorSecondaryOfInterviewee,
  deleteSeniorSecondaryOfInterviewee: deleteSeniorSecondaryOfInterviewee,
  newDegreeOfInterviewee: newDegreeOfInterviewee,
  updateDegreeOfInterviewee: updateDegreeOfInterviewee,
  deleteDegreeOfInterviewee: deleteDegreeOfInterviewee,
};
