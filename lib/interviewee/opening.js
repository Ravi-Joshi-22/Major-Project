const async = require('async');
const mongoose = require('mongoose');
const Models = require('../../app/models');
const JobOpening = Models.JobOpening;
const Interviewee = Models.Interviewee;
const InterviewTrack = Models.InterviewTrack;
const userHelper = require("../../app/helpers/user");
const CONSTANTS = require('../../config/constants');
const KEYS = require('../../config/keys');

function getAllIntervieweeTracks(userId, callback) {
  InterviewTrack.find({ user_id: userId }, { _id: 1 }).exec(function (err, fetchedData) {
    if (err) {
      callback({
        type: CONSTANTS.ERROR_TYPES.DB_ERROR,
        msg: 'Failed to check record',
        errorDetail: JSON.stringify(err),
      });
    } else {
      console.log(fetchedData);
      callback(null, fetchedData);
    }
  });
}

function extractOpenings(intervieweeData, quaskills, tracks, callback) {
  /**JobOpening.aggregate([
    {
      $match: {
        $and: [
          {
            $gt: [
              {
                $size: {
                  "skills": {
                    $in: skills
                  }
                }
              }, 0
            ]
          },
          {
            $gt: [
              {
                $size: {
                  "interviewees": {
                    $nin: tracks
                  }
                }
              }, 0
            ]
          }
        ]
      }
    }
  ])*/
  const ed = new Date();
  JobOpening.find({
    "end_date": {
      $gte: ed
    },
    "interviewees": {
      $nin: tracks
    },
    "experience_min": {
      $lte: intervieweeData.total_experience
    },
    "experience_max": {
      $gte: intervieweeData.total_experience
    },
    "skills": {
      $in: quaskills.skills
    }
  }).sort({ "end_date": 1 })
    .exec(function (err, fetchedData) {
      if (err) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg: 'Failed to get records',
          errorDetail: JSON.stringify(err),
        });
      } else {
        callback(null, fetchedData);
      }
    });
}

function eligibleOpenings(userId, callback) {
  async.waterfall([

    function (waterfallCallback) {
      userHelper.getIntervieweeDetails(userId, function (err, fetchedInterviewee) {
        if (err) {
          waterfallCallback({
            type: CONSTANTS.ERROR_TYPES.DB_ERROR,
            msg: 'Failed to check record',
            errorDetail: JSON.stringify(err),
          });
        } else {
          waterfallCallback(null, fetchedInterviewee);
        }
      });
    },


    function (fetchedInterviewee, waterfallCallback) {
      getAllIntervieweeTracks(userId, function (err, tracks) {
        waterfallCallback(err, fetchedInterviewee, tracks);
      });
    },

    function (fetchedInterviewee, tracks, waterfallCallback) {
      const skills = fetchedInterviewee.skills.map(eachskill => eachskill.name);
      const qualifications = fetchedInterviewee.after_senior_sec.map(eachafter_senior_sec => eachafter_senior_sec.degree);
      const quaskills = {
        skills,
        qualifications
      };
      waterfallCallback(null, fetchedInterviewee, quaskills, tracks);
    },

    function (fetchedInterviewee, quaskills, tracks, waterfallCallback) {
      extractOpenings(fetchedInterviewee, quaskills, tracks, function (err, Opening) {
        waterfallCallback(err, Opening);
      });
    },

  ], function (err, data) {
    callback(err, data);
  })
}




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
    .exec(function (err, fetchedData) {
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

  newTrack.save(function (err, createdTrack) {
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
  JobOpening.findById(openingId, function (err, doc) {
    if (err) {
      callback({
        type: CONSTANTS.ERROR_TYPES.DB_ERROR,
        msg: 'Unable to find opening with this ID',
        errorDetail: JSON.stringify(err),
      });
    }

    doc.interviewees.push(trackId);
    doc.save(function (errInSave, savedTrack) {
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
      function (waterfallCallback) {
        checkIfApplied(openingId, userId, function (err, data) {
          waterfallCallback(err, data);
        });
      },

      function (data, waterfallCallback) {
        createNewTrack(userId, function (err, createdTrack) {
          waterfallCallback(err, createdTrack);
        });
      },

      function (createdTrack, waterfallCallback) {
        addTrack(openingId, createdTrack._id, function (err, addedTrack) {
          waterfallCallback(err, addedTrack);
        });
      },
    ],
    function (err, data) {
      callback(err, data);
    }
  );
}

module.exports = {
  applyForOpening: applyForOpening,
  eligibleOpenings: eligibleOpenings,
};
