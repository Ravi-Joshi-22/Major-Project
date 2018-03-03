const mongoose = require('mongoose');
const async = require('async');
const Models = require('../../app/models');
const Question = Models.Question;
const questionHelper = require('../../app/helpers/question_helper');
const CONSTANTS = require('../../config/constants');
const KEYS = require('../../config/keys');

function insertQuestion(questionObj, ansTags, callback) {
  const newQuestion = new Question({
    question: questionObj.ques,
    answer: questionObj.ans,
    topic: questionObj.topic,
    tags: ansTags,
  });

  newQuestion.save(function(err, savedQues) {
    if (err) {
      callback({
        type: CONSTANTS.ERROR_TYPES.DB_ERROR,
        msg: 'The question you have entered is already present',
        errorDetail: JSON.stringify(err),
      });
    } else {
      callback(null, savedQues);
    }
  });
}
/**
 * Function to add new question by admn
 * @param {object} questionObj question object having question details
 * @param {function} callback  function having two params error and response
 */
function addNewQuestion(questionObj, callback) {
  async.waterfall(
    [
      function(waterfallCallback) {
        questionHelper.getAzureAnalytics(questionObj.ans, function(
          err,
          results
        ) {
          waterfallCallback(err, results);
        });
      },

      function(ansTags, waterfallCallback) {
        let obj = JSON.parse(ansTags);
        insertQuestion(questionObj, obj.documents[0].keyPhrases, function(
          err,
          insertedQues
        ) {
          waterfallCallback(err, insertedQues);
        });
      },
    ],
    function(err, data) {
      callback(err, data);
    }
  );
}

module.exports = {
  addNewQuestion: addNewQuestion,
};
