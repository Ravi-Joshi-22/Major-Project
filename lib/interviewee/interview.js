const async = require('async');
const mongoose = require('mongoose');
const Models = require('../../app/models');
const openingHelper = require('../../app/helpers/opening_helper');
const populateHelper = require('../../app/helpers/populate');
const CONSTANTS = require('../../config/constants');
const KEYS = require('../../config/keys');

function getTrackDetails(userId, trackId, callback) {
  Models.InterviewTrack.findOne({
    _id: mongoose.Types.ObjectId(trackId),
    user_id: mongoose.Types.ObjectId(userId),
    interview_status: CONSTANTS.ENUMS.USER.INTERVIEW_STATUS.APPLIED,
  }).exec(function(err, trackDetails) {
    if (err) {
      callback({
        type: CONSTANTS.ERROR_TYPES.DB_ERROR,
        msg: 'Unable to get your track',
        errorDetail: String(err),
      });
    } else if (!trackDetails) {
      callback({
        type: CONSTANTS.ERROR_TYPES.INVALID_RECORD,
        msg: 'No such interview exist',
        errorDetail: 'You need to have applied status to give interview',
      });
    } else {
      callback(null, trackDetails);
    }
  });
}

function startTest(userId, trackId, callback) {
  async.waterfall(
    [
      function(waterfallCallback) {
        getTrackDetails(userId, trackId, function(err, trackDetails) {
          waterfallCallback(err, trackDetails);
        });
      },

      function(trackDetails, waterfallCallback) {
        populateHelper._populateTrackWithQuestion(trackDetails, function(
          err,
          populatedQuestions
        ) {
          if (!err) {
            const resObj = {
              question:
                populatedQuestions.questions[populatedQuestions.count]
                  .question_id.question,
            };
            waterfallCallback(null, resObj);
          } else {
            waterfallCallback(err, populatedQuestions);
          }
        });
      },
    ],
    function(err, data) {
      callback(err, data);
    }
  );
}

module.exports = {
  startTest: startTest,
};
