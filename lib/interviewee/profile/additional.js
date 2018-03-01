const async = require('async');
const mongoose = require('mongoose');
const Models = require('../../../app/models');
const Interviewee = Models.Interviewee;
const userHelper = require('../../../app/helpers/user');
const CONSTANTS = require('../../../config/constants');

/**
 * Function to add new Additional Details of logged Interviewee
 * @param {ObjectId} userId user Id
 * @param {Object} additionalData having Additional Data
 * @param {Object} callback has two parameters first errorInSave and Saved Interviewee Details
 */
function addAdditionalOfInterviewee(userId, additionalData, callback) {
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
        fetchedInterviewee.additionals.push(additionalData);
        fetchedInterviewee.save(function(errInSave, savedInterviewee) {
          if (errInSave) {
            waterfallCallback({
              type: CONSTANTS.ERROR_TYPES.DB_ERROR,
              msg: 'Unable to add new Additional Details',
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
 * Function to update existing Additional Details of logged Interviewee
 * @param {ObjectId} userId user Id
 * @param {Object} additionalData having newly generated Additional Data for existing Additional Id
 * @param {Object} callback has two parameters first errorInSave and Saved Interviewee Details
 */
function updateAdditionalOfInterviewee(userId, additionalData, callback) {
  Interviewee.findOneAndUpdate(
    {
      userId: userId,
      additionals: {
        $elemMatch: {
          _id: mongoose.Types.ObjectId(additionalData._id),
        },
      },
    },
    {
      $set: {
        'additionals.$.description': additionalData.description,
      },
    },
    function(errInSave, returnedInstance) {
      if (errInSave) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg: 'Unable to update existing Additional Details',
          errorDetail: JSON.stringify(errInSave),
        });
      } else {
        callback(null, returnedInstance);
      }
    }
  );
}

/**
 * Function to delete existing Additional Details of logged Interviewee
 * @param {ObjectId} userId user Id
 * @param {ObjectId} additionalId having existing Additional Id
 * @param {Object} callback has two parameters first errorInSave and Saved Interviewee Details
 */
function deleteAdditionalOfInterviewee(userId, additionalId, callback) {
  Interviewee.findOneAndUpdate(
    {
      userId: userId,
    },
    {
      $pull: {
        additionals: {
          _id: mongoose.Types.ObjectId(additionalId),
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
          msg: 'Unable to delete existing Additional Details',
          errorDetail: JSON.stringify(errInSave),
        });
      } else {
        callback(null, returnedInstance);
      }
    }
  );
}

module.exports = {
  addAdditionalOfInterviewee: addAdditionalOfInterviewee,
  updateAdditionalOfInterviewee: updateAdditionalOfInterviewee,
  deleteAdditionalOfInterviewee: deleteAdditionalOfInterviewee,
};
