const async = require('async');
const mongoose = require('mongoose');
const Models = require('../../../app/models');
const Interviewee = Models.Interviewee;
const userHelper = require('../../../app/helpers/user');
const CONSTANTS = require('../../../config/constants');

/**
 * Function to add new Project Details of logged Interviewee
 * @param {ObjectId} userId user Id
 * @param {Object} projectData having Project Data
 * @param {Object} callback has two parameters first errorInSave and Saved Interviewee Details
 */
function addProjectOfInterviewee(userId, projectData, callback) {
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
        fetchedInterviewee.projects.push(projectData);
        fetchedInterviewee.save(function(errInSave, savedInterviewee) {
          if (errInSave) {
            waterfallCallback({
              type: CONSTANTS.ERROR_TYPES.DB_ERROR,
              msg: 'Unable to add new Project Details',
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
 * Function to update existing Project Details of logged Interviewee
 * @param {ObjectId} userId user Id
 * @param {Object} projectData having newly generated Project Data for existing Project Id
 * @param {Object} callback has two parameters first errorInSave and Saved Interviewee Details
 */
function updateProjectOfInterviewee(userId, projectData, callback) {
  Interviewee.findOneAndUpdate(
    {
      userId: userId,
      projects: {
        $elemMatch: {
          _id: mongoose.Types.ObjectId(projectData._id),
        },
      },
    },
    {
      $set: {
        'projects.$.title': projectData.title,
        'projects.$.start_date': projectData.start_date,
        'projects.$.currently_working': projectData.currently_working,
        'projects.$.end_date': projectData.end_date,
        'projects.$.description': projectData.description,
        'projects.$.url': projectData.url,
      },
    },
    function(errInSave, returnedInstance) {
      if (errInSave) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg: 'Unable to update existing Project Details',
          errorDetail: JSON.stringify(errInSave),
        });
      } else {
        callback(null, returnedInstance);
      }
    }
  );
}

/**
 * Function to delete existing Project Details of logged Interviewee
 * @param {ObjectId} userId user Id
 * @param {ObjectId} projectId having existing Project Id
 * @param {Object} callback has two parameters first errorInSave and Saved Interviewee Details
 */
function deleteProjectOfInterviewee(userId, projectId, callback) {
  Interviewee.findOneAndUpdate(
    {
      userId: userId,
    },
    {
      $pull: {
        projects: {
          _id: mongoose.Types.ObjectId(projectId),
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
          msg: 'Unable to delete existing Project Details',
          errorDetail: JSON.stringify(errInSave),
        });
      } else {
        callback(null, returnedInstance);
      }
    }
  );
}

module.exports = {
  addProjectOfInterviewee: addProjectOfInterviewee,
  updateProjectOfInterviewee: updateProjectOfInterviewee,
  deleteProjectOfInterviewee: deleteProjectOfInterviewee,
};
