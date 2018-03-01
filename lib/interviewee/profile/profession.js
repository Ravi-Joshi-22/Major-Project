const async = require('async');
const mongoose = require('mongoose');
const Models = require('../../../app/models');
const Interviewee = Models.Interviewee;
const userHelper = require('../../../app/helpers/user');
const CONSTANTS = require('../../../config/constants');

/**
 * Function to add new profession Details of logged Interviewee
 * @param {ObjectId} userId user Id
 * @param {Object} professionData having profession - Job Data or Internship Data
 * @param {String} professions having profession about which field is to be updated
 * @param {Object} callback has two parameters first errorInSave and Saved Interviewee Details
 */
function addProfessionOfInterviewee(
  userId,
  professionData,
  professions,
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
        fetchedInterviewee[professions].push(professionData);
        fetchedInterviewee.save(function(errInSave, savedInterviewee) {
          if (errInSave) {
            waterfallCallback({
              type: CONSTANTS.ERROR_TYPES.DB_ERROR,
              msg: 'Unable to add new ' + professions + ' Details',
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
 * Function to update existing Profession Details of logged Interviewee
 * @param {ObjectId} userId user Id
 * @param {Object} professionData having Job Data
 * @param {String} professions having profession about which field is to be updated
 * @param {Object} callback has two parameters first errorInSave and Saved Interviewee Details
 */
function updateProfessionOfInterviewee(
  userId,
  professionData,
  professions,
  callback
) {
  Interviewee.findOneAndUpdate(
    {
      userId: userId,
      [professions]: {
        $elemMatch: {
          _id: mongoose.Types.ObjectId(professionData._id),
        },
      },
    },
    {
      $set: {
        [[professions] + '.$.profile']: professionData.profile,
        [[professions] + '.$.organization']: professionData.organization,
        [[professions] + '.$.location']: professionData.location,
        [[professions] + '.$.start_date']: professionData.start_date,
        [[professions] +
        '.$.currently_working']: professionData.currently_working,
        [[professions] + '.$.end_date']: professionData.end_date,
        [[professions] + '.$.description']: professionData.description,
      },
    },
    function(errInSave, returnedInstance) {
      if (errInSave) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg: 'Unable to update existing ' + professions + ' Details',
          errorDetail: JSON.stringify(errInSave),
        });
      } else {
        callback(null, returnedInstance);
      }
    }
  );
}

/**
 * Function to delete existing Job Details of logged Interviewee
 * @param {ObjectId} userId user Id
 * @param {ObjectId} professionId having existing Profession Id
 * @param {String} professions having profession about which field is to be updated
 * @param {Object} callback has two parameters first errorInSave and Saved Interviewee Details
 */
function deleteProfessionOfInterviewee(
  userId,
  professionId,
  professions,
  callback
) {
  Interviewee.findOneAndUpdate(
    {
      userId: userId,
    },
    {
      $pull: {
        [professions]: {
          _id: mongoose.Types.ObjectId(professionId),
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
          msg: 'Unable to delete existing ' + professions + 'Details',
          errorDetail: JSON.stringify(errInSave),
        });
      } else {
        callback(null, returnedInstance);
      }
    }
  );
}

module.exports = {
  addProfessionOfInterviewee: addProfessionOfInterviewee,
  updateProfessionOfInterviewee: updateProfessionOfInterviewee,
  deleteProfessionOfInterviewee: deleteProfessionOfInterviewee,
};
