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
  JobOpening.find({
    _id: mongoose.Types.ObjectId(openingId),
  })
    .populate({
      path: 'interviewees',
      match: { user_id: userId },
    })
    .exec(function(err, fetchedData) {
      if (err) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg: 'Failed to check record',
          errorDetail: JSON.stringify(err),
        });
      } else if (fetchedData[0].interviewees.length > 0) {
        callback({
          type: CONSTANTS.ERROR_TYPES.INVALID_RECORD,
          msg: 'You have already applied for the following opening.',
          errorDetail: 'You cant apply for any opening more than once.',
        });
      } else {
        callback(null, fetchedData);
      }
    });
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
        createNewTrack(userId, function(err, createdTrack) {
          waterfallCallback(err, createdTrack);
        });
      },

      function(createdTrack, waterfallCallback) {
        addTrack(openingId, createdTrack._id, function(err, addedTrack) {
          waterfallCallback(err, addedTrack);
        });
      },
    ],
    function(err, data) {
      callback(err, data);
    }
  );
}

function getAllOpeningsFromAppliedTracks(trackIds, callback) {
  JobOpening.find({
    interviewees: {
      $in: trackIds,
    },
  }).exec(function(err, fetchedData) {
    if (err) {
      callback({
        type: CONSTANTS.ERROR_TYPES.DB_ERROR,
        msg: 'Failed to find all openings',
        errorDetail: JSON.stringify(err),
      });
    } else {
      callback(null, fetchedData);
    }
  });
}

function getAllAppliedTracks(userId, callback) {
  InterviewTrack.find(
    {
      user_id: userId,
      interview_status: CONSTANTS.ENUMS.USER.INTERVIEW_STATUS.APPLIED,
    },
    {
      _id: 1,
    }
  ).exec(function(err, fetchedData) {
    if (err) {
      callback({
        type: CONSTANTS.ERROR_TYPES.DB_ERROR,
        msg: 'Failed to find tracks',
        errorDetail: JSON.stringify(err),
      });
    } else {
      callback(null, fetchedData);
    }
  });
}

function getAppliedOpenings(userId, callback) {
  async.waterfall(
    [
      function(waterfallCallback) {
        getAllAppliedTracks(userId, function(err, appliedTracksId) {
          waterfallCallback(err, appliedTracksId);
        });
      },
      function(appliedTracksId, waterfallCallback) {
        getAllOpeningsFromAppliedTracks(appliedTracksId, function(
          err,
          fetchedOpenings
        ) {
          waterfallCallback(err, fetchedOpenings);
        });
      },
    ],
    function(err, data) {
      callback(err, data);
    }
  );
}
module.exports = {
  applyForOpening: applyForOpening,
  getAppliedOpenings: getAppliedOpenings,
};
