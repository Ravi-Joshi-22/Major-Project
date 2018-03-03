const async = require('async');
const mongoose = require('mongoose');
const Models = require('../../app/models');
const Interviewee = Models.Interviewee;
const userHelper = require('../../app/helpers/user');
const mailHelper = require('../../app/helpers/mail_helper');
const CONSTANTS = require('../../config/constants');
const KEYS = require('../../config/keys');

/**
 * Function to update Secondary Details of logged Interviewee
 * @param {ObjectId} userId user Id
 * @param {Object} secondaryData having Secondary Education Data
 * @param {Object} callback has two parameters first errorInSave and Saved Interviewee Details
 */
function updateSecondaryOfInterviewee(userId, secondaryData, callback) {
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
        fetchedInterviewee.before_senior_sec.secondary = secondaryData;
        fetchedInterviewee.save(function(errInSave, savedInterviewee) {
          if (errInSave) {
            waterfallCallback({
              type: CONSTANTS.ERROR_TYPES.DB_ERROR,
              msg: 'Unable to update secondary Details, please try again',
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
 * Function to update Senior Secondary Details of logged Interviewee
 * @param {ObjectId} userId user Id
 * @param {Object} seniorSecondaryData having Senior Secondary Education Data
 * @param {Object} callback has two parameters first errorInSave and Saved Interviewee Details
 */
function updateSeniorSecondaryOfInterviewee(
  userId,
  seniorSecondaryData,
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
        fetchedInterviewee.before_senior_sec.senior_sec = seniorSecondaryData;
        fetchedInterviewee.save(function(errInSave, savedInterviewee) {
          if (errInSave) {
            waterfallCallback({
              type: CONSTANTS.ERROR_TYPES.DB_ERROR,
              msg:
                'Unable to update senior secondary Details, please try again',
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

// function updateDegreeOfInterviewee(userId, degreeData, callback) {
//   Interviewee.findOne(
//     {
//       userId: userId,
//       'after_senior_sec._id': mongoose.Types.ObjectId(degreeData._id),
//     },
//     function(errInSave, savedInterviewee) {
//       if (errInSave) {
//         callback({
//           type: CONSTANTS.ERROR_TYPES.DB_ERROR,
//           msg: 'Unable to update Degree Details',
//           errorDetail: JSON.stringify(errInSave),
//         });
//       } else {
//         callback(null, savedInterviewee);
//       }
//     }
//   );
// }

function updateDegreeOfInterviewee(userId, degreeData, callback) {
  async.waterfall(
    [
      function(waterfallCallback) {
        userHelper.getIntervieweeDetails(userId, function(
          err,
          fetchedInterviewee
        ) {
          console.log(fetchedInterviewee);
          waterfallCallback(err, fetchedInterviewee);
        });
      },

      function(fetchedInterviewee, waterfallCallback) {
        // fetchedInterviewee.aggregate(
        //   [
        //     {
        //       $match: {
        //         after_senior_sec: {
        //           $elemMatch: {
        //             _id: mongoose.Types.ObjectId(degreeData._id),
        //           },
        //         },
        //       },
        //     },
        //   ],
        // {
        //   $set: {
        //     'after_senior_sec.$.college': degreeData.college,
        //     'after_senior_sec.$.start_year': degreeData.start_year,
        //     'after_senior_sec.$.end_year': degreeData.end_year,
        //     'after_senior_sec.$.degree': degreeData.degree,
        //     'after_senior_sec.$.stream': degreeData.stream,
        //     'after_senior_sec.$.performance': degreeData.performance,
        //   },
        // },
        fetchedInterviewee.findOne(
          {
            'after_senior_sec._id': mongoose.Types.ObjectId(degreeData._id),
          },
          //   {
          //     college: degreeData.college,
          //     start_year: degreeData.start_year,
          //     end_year: degreeData.end_year,
          //     degree: degreeData.degree,
          //     stream: degreeData.stream,
          //     performance: degreeData.performance,
          //   },
          function(errInSave, savedInterviewee) {
            if (errInSave) {
              waterfallCallback({
                type: CONSTANTS.ERROR_TYPES.DB_ERROR,
                msg: 'Unable to update Degree Details, please try again',
                errorDetail: JSON.stringify(errInSave),
              });
            } else {
              waterfallCallback(null, savedInterviewee);
            }
          }
        );
      },
    ],
    function(err, data) {
      callback(err, data);
    }
  );
}

module.exports = {
  updateSecondaryOfInterviewee: updateSecondaryOfInterviewee,
  updateSeniorSecondaryOfInterviewee: updateSeniorSecondaryOfInterviewee,
  updateDegreeOfInterviewee: updateDegreeOfInterviewee,
};
