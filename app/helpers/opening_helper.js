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

module.exports = {
  getSkillsFromOpening: getSkillsFromOpening,
};
