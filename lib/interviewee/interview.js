const async = require('async');
const mongoose = require('mongoose');
const Models = require('../../app/models');
const openingHelper = require('../../app/helpers/opening_helper');
const populateHelper = require('../../app/helpers/populate');
const questionHelper = require('../../app/helpers/question_helper');
const CONSTANTS = require('../../config/constants');
const KEYS = require('../../config/keys');

/**
 * Function to get track details
 * @param {objectId} userId _id of the user
 * @param {objectId} trackId _id of the track
 * @param {Function} callback function with err and track details
 */
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

/**
 * Function to start the test and return question in response
 * @param {objectId} userId _id of the user
 * @param {objectId} trackId _id of the track
 * @param {Function} callback function with err and question
 */
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

/**
 * function to get final score
 * @param {objectId} questionId _id of the question
 * @param {object} gotScore object having user text analytics score
 * @param {Function} callback having err and final score
 */
function totalQuestionTags(questionId, gotScore, callback) {
  Models.Question.findById(questionId, function(err, fetchedQuestion) {
    if (err) {
      callback({
        type: CONSTANTS.ERROR_TYPES.DB_ERROR,
        msg: 'Unable to update score',
        errorDetail: String(err),
      });
    } else {
      const score = (
        gotScore.scored /
        fetchedQuestion.tags.length *
        10
      ).toFixed(2);
      const finalScore = {
        textAnalyticsScore: score,
      };
      callback(null, finalScore);
    }
  });
}

/**
 * Function to count matching tags
 * @param {ObjectId} questionId object id of the question
 * @param {Array} ansTags array of analysis tags
 * @param {Function} callback function having err and counted tags
 */
function countMatchingTags(questionId, ansTags, callback) {
  Models.Question.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(questionId),
      },
    },
    {
      $unwind: '$tags',
    },
    {
      $match: {
        tags: {
          $in: ansTags,
        },
      },
    },
  ]).exec(function(err, result) {
    if (err) {
      callback({
        type: CONSTANTS.ERROR_TYPES.DB_ERROR,
        msg: 'Unable to update score',
        errorDetail: String(err),
      });
    } else {
      const score = {
        scored: result.length,
      };
      callback(null, score);
    }
  });
}

/**
 * Function to give complete test
 * @param {objectId} userId _id of the user
 * @param {ObjectId} trackId _id the interview track
 * @param {String} userAns user ans for the question
 * @param {function} callback err and total score with next question
 */
function giveTest(userId, trackId, userAns, callback) {
  if (userAns.length > 1) {
    async.waterfall(
      [
        function(waterfallCallback) {
          getTrackDetails(userId, trackId, function(err, trackDetails) {
            waterfallCallback(err, trackDetails);
          });
        },

        function(trackDetails, waterfallCallback) {
          questionHelper.getAzureAnalytics(userAns, function(err, results) {
            console.log(results);
            let obj = JSON.parse(results);
            waterfallCallback(err, trackDetails, obj.documents[0].keyPhrases);
          });
        },
        function(trackDetails, analysisTags, waterfallCallback) {
          const questionId =
            trackDetails.questions[trackDetails.count].question_id;
          countMatchingTags(questionId, analysisTags, function(
            err,
            countedTags
          ) {
            waterfallCallback(err, countedTags, questionId, trackDetails);
          });
        },

        function(gotScore, questionId, trackDetails, waterfallCallback) {
          totalQuestionTags(questionId, gotScore, function(err, totalScore) {
            waterfallCallback(err, totalScore, trackDetails);
          });
        },

        function(totalScore, trackDetails, waterfallCallback) {
          questionHelper.getAzureSentimentAnalytics(userAns, function(
            err,
            sentimentResult
          ) {
            let obj = JSON.parse(sentimentResult);
            totalScore.sentimentAnalyticsScore = (
              obj.documents[0].score * 5
            ).toFixed(2);
            waterfallCallback(err, totalScore, trackDetails);
          });
        },

        function(totalScore, trackDetails, waterfallCallback) {
          trackDetails.questions[trackDetails.count].score =
            parseFloat(totalScore.textAnalyticsScore) +
            parseFloat(totalScore.sentimentAnalyticsScore);
          trackDetails.score =
            trackDetails.score +
            parseFloat(totalScore.textAnalyticsScore) +
            parseFloat(totalScore.sentimentAnalyticsScore);
          trackDetails.questions[trackDetails.count].answer = userAns;
          trackDetails.count = trackDetails.count + 1;

          if (trackDetails.count >= trackDetails.questions.length) {
            trackDetails.interview_status =
              CONSTANTS.ENUMS.USER.INTERVIEW_STATUS.GIVEN;
          }

          trackDetails.save(function(err, savedTrack) {
            if (err) {
              waterfallCallback({
                type: CONSTANTS.ERROR_TYPES.DB_ERROR,
                msg: 'Unable to proceed',
                errorDetail: String(err),
              });
            } else {
              waterfallCallback(null, savedTrack);
            }
          });
        },
      ],
      function(err, data) {
        callback(err, data);
      }
    );
  } else {
    async.waterfall(
      [
        function(waterfallCallback) {
          getTrackDetails(userId, trackId, function(err, trackDetails) {
            waterfallCallback(err, trackDetails);
          });
        },

        function(trackDetails, waterfallCallback) {
          trackDetails.questions[trackDetails.count].score = 0;
          trackDetails.score = trackDetails.score + 0;
          trackDetails.questions[trackDetails.count].answer = 'Not answered';
          trackDetails.count = trackDetails.count + 1;

          if (trackDetails.count >= trackDetails.questions.length) {
            trackDetails.interview_status =
              CONSTANTS.ENUMS.USER.INTERVIEW_STATUS.GIVEN;
          }

          trackDetails.save(function(err, savedTrack) {
            if (err) {
              waterfallCallback({
                type: CONSTANTS.ERROR_TYPES.DB_ERROR,
                msg: 'Unable to proceed',
                errorDetail: String(err),
              });
            } else {
              waterfallCallback(null, savedTrack);
            }
          });
        },
      ],
      function(err, data) {
        callback(err, data);
      }
    );
  }
}

module.exports = {
  startTest: startTest,
  giveTest: giveTest,
};
