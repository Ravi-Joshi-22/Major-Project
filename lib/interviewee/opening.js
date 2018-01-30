const async = require('async');
const mongoose = require('mongoose');
const Models = require('../../app/models');
const JobOpening = Models.JobOpening;
const InterviewTrack = Models.InterviewTrack;
const CONSTANTS = require('../../config/constants');
const KEYS = require('../../config/keys');

/**
 * Function to check if user has already applied or not
 * @param {ObjectId} openingId opening table object Id
 * @param {ObjectId} userId user Id
 * @param {Function} callback  having error and data
 */
function checkIfApplied(openingId, userId, callback) {
  JobOpening.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(openingId),
      },
    },
    { $unwind: '$interviewees' },
    {
      $lookup: {
        from: 'InterviewTrack',
        localField: 'interviewees',
        foreignField: '_id',
        as: 'applied_interviewees',
      },
    },
  ]).exec(function(err, fetchedData) {
    callback(err, fetchedData);
  });
}

//Populate
function _populateIntervieweeTrackInfo(openingData, userId, callback) {
  Models.InterviewTrack.populate(
    openingData,
    {
      path: 'interviewees',
      match: { user_id: userId },
      select: { user_id: 1 },
    },
    function(trackPopulationError, resultPopulatedTracks) {
      if (trackPopulationError) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg: 'Failed to provide track details',
          errorDetail: JSON.stringify(trackPopulationError),
        });
      } else {
        callback(null, resultPopulatedTracks);
      }
    }
  );
}
/**
 * To create new Opening
 * @param {objectId} userId having user _id
 * @param {Function} callback having error and created Interview Track
 */
function createNewTrack(userId, callback) {
  const newTrack = new InterviewTrack({
    user_id: userId,
    interview_status: CONSTANTS.ENUMS.USER.INTERVIEW_STATUS.APPLIED,
  });

  newTrack.save(function(err, createdTrack) {
    if (err) {
      callback({
        type: CONSTANTS.ERROR_TYPES.DB_ERROR,
        msg: 'Unable to create new track.',
        errorDetail: JSON.stringify(err),
      });
    } else {
      callback(null, createdTrack);
    }
  });
}

/**
 * function to add track to opening
 * @param {objectId} openingId _id of the new opening
 * @param {objectId} trackId _id of the new track
 * @param {Function} callback having err and companies new track
 */
function addTrack(openingId, trackId, callback) {
  JobOpening.findById(openingId, function(err, doc) {
    if (err) {
      callback({
        type: CONSTANTS.ERROR_TYPES.DB_ERROR,
        msg: 'Unable to find opening with this ID',
        errorDetail: JSON.stringify(err),
      });
    }

    doc.interviewees.push(trackId);
    doc.save(function(errInSave, savedTrack) {
      if (errInSave) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg: 'Failed to update a new track in opening',
          errorDetail: String(errInSave),
        });
        return;
      }
      callback(null, savedTrack);
    });
  });
}

/**
 * Function to apply for new opening
 * @param {objectId} openingId
 * @param {objectId} userId
 * @param {Function} callback
 */
function applyForOpening(openingId, userId, callback) {
  async.waterfall(
    [
      function(waterfallCallback) {
        checkIfApplied(openingId, userId, function(err, data) {
          waterfallCallback(err, data);
        });
      },

      function(data, waterfallCallback) {
        _populateIntervieweeTrackInfo(data, userId, function(err, res) {
          waterfallCallback(err, res);
        });
      },

      //   function(data, waterfallCallback) {
      //     createNewTrack(userId, function(err, createdTrack) {
      //       waterfallCallback(err, createdTrack);
      //     });
      //   },

      //   function(createdTrack, waterfallCallback) {
      //     addTrack(openingId, createdTrack._id, function(err, addedTrack) {
      //       waterfallCallback(err, addedTrack);
      //     });
      //   },
    ],
    function(err, data) {
      //console.log(data.length);
      callback(err, data);
    }
  );
}

module.exports = {
  applyForOpening: applyForOpening,
};
