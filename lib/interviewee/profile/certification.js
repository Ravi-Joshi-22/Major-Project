const async = require('async');
const mongoose = require('mongoose');
const Models = require('../../../app/models');
const Interviewee = Models.Interviewee;
const userHelper = require('../../../app/helpers/user');
const CONSTANTS = require('../../../config/constants');

/**
 * Function to add new Certification Details of logged Interviewee
 * @param {ObjectId} userId user Id
 * @param {Object} certificationData having Certification Data
 * @param {Object} callback has two parameters first errorInSave and Saved Interviewee Details
 */
function addCertificationOfInterviewee(userId, certificationData, callback) {
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
        fetchedInterviewee.certifications.push(certificationData);
        fetchedInterviewee.save(function(errInSave, savedInterviewee) {
          if (errInSave) {
            waterfallCallback({
              type: CONSTANTS.ERROR_TYPES.DB_ERROR,
              msg: 'Unable to add new Certification Details',
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
 * Function to update existing Certification Details of logged Interviewee
 * @param {ObjectId} userId user Id
 * @param {Object} certificationData having newly generated Certification Data for existing Certification Id
 * @param {Object} callback has two parameters first errorInSave and Saved Interviewee Details
 */
function updateCertificationOfInterviewee(userId, certificationData, callback) {
  Interviewee.findOneAndUpdate(
    {
      userId: userId,
      certifications: {
        $elemMatch: {
          _id: mongoose.Types.ObjectId(certificationData._id),
        },
      },
    },
    {
      $set: {
        'certifications.$.name': certificationData.name,
        'certifications.$.authority': certificationData.authority,
        'certifications.$.lic_number': certificationData.lic_number,
        'certifications.$.url': certificationData.url,
      },
    },
    function(errInSave, returnedInstance) {
      if (errInSave) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg: 'Unable to update existing Certification Details',
          errorDetail: JSON.stringify(errInSave),
        });
      } else {
        callback(null, returnedInstance);
      }
    }
  );
}

/**
 * Function to delete existing Certification Details of logged Interviewee
 * @param {ObjectId} userId user Id
 * @param {ObjectId} certificationId having existing Certification Id
 * @param {Object} callback has two parameters first errorInSave and Saved Interviewee Details
 */
function deleteCertificationOfInterviewee(userId, certificationId, callback) {
  Interviewee.findOneAndUpdate(
    {
      userId: userId,
    },
    {
      $pull: {
        certifications: {
          _id: mongoose.Types.ObjectId(certificationId),
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
          msg: 'Unable to delete existing Certification Details',
          errorDetail: JSON.stringify(errInSave),
        });
      } else {
        callback(null, returnedInstance);
      }
    }
  );
}

module.exports = {
  addCertificationOfInterviewee: addCertificationOfInterviewee,
  updateCertificationOfInterviewee: updateCertificationOfInterviewee,
  deleteCertificationOfInterviewee: deleteCertificationOfInterviewee,
};
