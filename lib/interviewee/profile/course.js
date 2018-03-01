const async = require('async');
const mongoose = require('mongoose');
const Models = require('../../../app/models');
const Interviewee = Models.Interviewee;
const userHelper = require('../../../app/helpers/user');
const CONSTANTS = require('../../../config/constants');

/**
 * Function to add new Course Details of logged Interviewee
 * @param {ObjectId} userId user Id
 * @param {Object} courseData having Course Data
 * @param {Object} callback has two parameters first errorInSave and Saved Interviewee Details
 */
function addCourseOfInterviewee(userId, courseData, callback) {
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
        fetchedInterviewee.courses.push(courseData);
        fetchedInterviewee.save(function(errInSave, savedInterviewee) {
          if (errInSave) {
            waterfallCallback({
              type: CONSTANTS.ERROR_TYPES.DB_ERROR,
              msg: 'Unable to add new Course Details',
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
 * Function to update existing Course Details of logged Interviewee
 * @param {ObjectId} userId user Id
 * @param {Object} courseData having newly generated Course Data for existing Course Id
 * @param {Object} callback has two parameters first errorInSave and Saved Interviewee Details
 */
function updateCourseOfInterviewee(userId, courseData, callback) {
  Interviewee.findOneAndUpdate(
    {
      userId: userId,
      courses: {
        $elemMatch: {
          _id: mongoose.Types.ObjectId(courseData._id),
        },
      },
    },
    {
      $set: {
        'courses.$.name': courseData.name,
        'courses.$.number': courseData.number,
        'courses.$.description': courseData.description,
      },
    },
    function(errInSave, returnedInstance) {
      if (errInSave) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg: 'Unable to update existing Course Details',
          errorDetail: JSON.stringify(errInSave),
        });
      } else {
        callback(null, returnedInstance);
      }
    }
  );
}

/**
 * Function to delete existing Course Details of logged Interviewee
 * @param {ObjectId} userId user Id
 * @param {ObjectId} courseId having existing Course Id
 * @param {Object} callback has two parameters first errorInSave and Saved Interviewee Details
 */
function deleteCourseOfInterviewee(userId, courseId, callback) {
  Interviewee.findOneAndUpdate(
    {
      userId: userId,
    },
    {
      $pull: {
        courses: {
          _id: mongoose.Types.ObjectId(courseId),
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
          msg: 'Unable to delete existing Course Details',
          errorDetail: JSON.stringify(errInSave),
        });
      } else {
        callback(null, returnedInstance);
      }
    }
  );
}

module.exports = {
  addCourseOfInterviewee: addCourseOfInterviewee,
  updateCourseOfInterviewee: updateCourseOfInterviewee,
  deleteCourseOfInterviewee: deleteCourseOfInterviewee,
};
