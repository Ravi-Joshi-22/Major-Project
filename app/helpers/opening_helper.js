const Models = require('../models');
const mongoose = require('mongoose');
const JobOpening = Models.JobOpening;

/**
 * Function to get required skills from job opening
 * @param {ObjectId} openingId objectId of opening
 * @param {function} callback having two params first being error and second skills
 */
function getSkillsFromOpening(openingId, callback) {
  JobOpening.findOne({
    _id: mongoose.Types.ObjectId(openingId),
  }).exec(function(err, fetchedData) {
    if (err) {
      callback({
        type: CONSTANTS.ERROR_TYPES.DB_ERROR,
        msg: 'Failed to check record',
        errorDetail: JSON.stringify(err),
      });
    } else {
      callback(null, fetchedData.skills);
    }
  });
}

/**
 * function to provide interview tract details of the user
 * @param {ObjectId} openingId _id of the opening
 * @param {ObjectId} userId _id of the user
 * @param {Function} callback two params error and interview track details
 */
function getInterviewTrackDetailsOfUSer(openingId, userId, callback) {
  JobOpening.findOne({
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
      } else if (fetchedData.interviewees.length === 0) {
        callback({
          type: CONSTANTS.ERROR_TYPES.INVALID_RECORD,
          msg: 'You have not applied for this opening',
          errorDetail: 'You need to apply for opening to give interview',
        });
      } else {
        callback(null, fetchedData);
      }
    });
}

module.exports = {
  getSkillsFromOpening: getSkillsFromOpening,
  getInterviewTrackDetailsOfUSer: getInterviewTrackDetailsOfUSer,
};
