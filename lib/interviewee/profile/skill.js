const async = require('async');
const mongoose = require('mongoose');
const Models = require('../../../app/models');
const Interviewee = Models.Interviewee;
const userHelper = require('../../../app/helpers/user');
const CONSTANTS = require('../../../config/constants');

/**
 * Function to add new Skill Details of logged Interviewee
 * @param {ObjectId} userId user Id
 * @param {Object} skillData having Skill Data
 * @param {Object} callback has two parameters first errorInSave and Saved Interviewee Details
 */
function addSkillOfInterviewee(userId, skillData, callback) {
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
        fetchedInterviewee.skills.push(skillData);
        fetchedInterviewee.save(function(errInSave, savedInterviewee) {
          if (errInSave) {
            waterfallCallback({
              type: CONSTANTS.ERROR_TYPES.DB_ERROR,
              msg: 'Unable to add new Skill Details',
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
 * Function to update existing Skill Details of logged Interviewee
 * @param {ObjectId} userId user Id
 * @param {Object} skillData having newly generated Skill Data for existing Skill Id
 * @param {Object} callback has two parameters first errorInSave and Saved Interviewee Details
 */
function updateSkillOfInterviewee(userId, skillData, callback) {
  Interviewee.findOneAndUpdate(
    {
      userId: userId,
      skills: {
        $elemMatch: {
          _id: mongoose.Types.ObjectId(skillData._id),
        },
      },
    },
    {
      $set: {
        'skills.$.rate': skillData.rate,
        'skills.$.name': skillData.name,
      },
    },
    function(errInSave, returnedInstance) {
      if (errInSave) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg: 'Unable to update existing Skill Details',
          errorDetail: JSON.stringify(errInSave),
        });
      } else {
        callback(null, returnedInstance);
      }
    }
  );
}

/**
 * Function to delete existing Skill Details of logged Interviewee
 * @param {ObjectId} userId user Id
 * @param {ObjectId} skillId having existing Skill Id
 * @param {Object} callback has two parameters first errorInSave and Saved Interviewee Details
 */
function deleteSkillOfInterviewee(userId, skillId, callback) {
  Interviewee.findOneAndUpdate(
    {
      userId: userId,
    },
    {
      $pull: {
        skills: {
          _id: mongoose.Types.ObjectId(skillId),
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
          msg: 'Unable to delete existing Skill Details',
          errorDetail: JSON.stringify(errInSave),
        });
      } else {
        callback(null, returnedInstance);
      }
    }
  );
}

module.exports = {
  addSkillOfInterviewee: addSkillOfInterviewee,
  updateSkillOfInterviewee: updateSkillOfInterviewee,
  deleteSkillOfInterviewee: deleteSkillOfInterviewee,
};
