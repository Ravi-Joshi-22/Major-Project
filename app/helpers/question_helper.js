const Models = require('../models');
const CONSTANTS = require('../../config/constants');
const KEYS = require('../../config/keys');
const request = require('request');
const async = require('async');

function getAzureAnalytics(answer, callback) {
  let documents = {
    documents: [{ id: '1', language: 'en', text: answer }],
  };
  const answerObj = {
    method: 'POST',
    url: `https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases`,
    headers: {
      'Ocp-Apim-Subscription-Key': 'e18719887ac24f63b306ea5ed4c06d55',
    },
    body: JSON.stringify(documents),
  };

  request(answerObj, function(error, res, body) {
    if (error) {
      callback({
        type: CONSTANTS.ERROR_TYPES.TYPE_ERROR,
        msg: 'An Error encountered, while sending request.',
        errorDetail: JSON.stringify(error),
      });
    } else if (body.error) {
      callback(body, null);
    } else {
      callback(null, body);
    }
  });
}

function getAzureSentimentAnalytics(answer, callback) {
  let documents = {
    documents: [{ id: '1', language: 'en', text: answer }],
  };
  const answerObj = {
    method: 'POST',
    url: `https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment`,
    headers: {
      'Ocp-Apim-Subscription-Key': 'e18719887ac24f63b306ea5ed4c06d55',
    },
    body: JSON.stringify(documents),
  };

  request(answerObj, function(error, res, body) {
    if (error) {
      callback({
        type: CONSTANTS.ERROR_TYPES.TYPE_ERROR,
        msg: 'An Error encountered, while sending request.',
        errorDetail: JSON.stringify(error),
      });
    } else if (body.error) {
      callback(body, null);
    } else {
      callback(null, body);
    }
  });
}

module.exports = {
  getAzureAnalytics: getAzureAnalytics,
  getAzureSentimentAnalytics: getAzureSentimentAnalytics,
};
