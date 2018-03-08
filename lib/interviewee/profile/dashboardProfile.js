const async = require('async');
const mongoose = require('mongoose');
const Models = require('../../../app/models');
const Interviewee = Models.Interviewee;
const userHelper = require('../../../app/helpers/user');
const CONSTANTS = require('../../../config/constants');

/**
 * Function to calculate percentage of profile filled
 * @param {ObjectId} userId Users ObjectId
 * @param {Function} callback function having two parameters - error and calculated percentage of profile filled
 */
function percentageProfileFilled(userId, callback) {
  async.waterfall(
    [
      function(waterfallCallback) {
        Interviewee.aggregate(
          [
            {
              $match: {
                userId: userId,
              },
            },
            {
              $project: {
                userId: 1,
                before_senior_sec: {
                  $cond: [
                    {
                      $eq: ['$before_senior_sec', {}],
                    },
                    '$$REMOVE',
                    '$before_senior_sec',
                  ],
                },
                after_senior_sec: {
                  $cond: [
                    {
                      $eq: [
                        {
                          $size: '$after_senior_sec',
                        },
                        0,
                      ],
                    },
                    '$$REMOVE',
                    '$after_senior_sec',
                  ],
                },
                jobs: {
                  $cond: [
                    {
                      $eq: [
                        {
                          $size: '$jobs',
                        },
                        0,
                      ],
                    },
                    '$$REMOVE',
                    '$jobs',
                  ],
                },
                internships: {
                  $cond: [
                    {
                      $eq: [
                        {
                          $size: '$internships',
                        },
                        0,
                      ],
                    },
                    '$$REMOVE',
                    '$internships',
                  ],
                },
                skills: {
                  $cond: [
                    {
                      $eq: [
                        {
                          $size: '$skills',
                        },
                        0,
                      ],
                    },
                    '$$REMOVE',
                    '$skills',
                  ],
                },
                courses: {
                  $cond: [
                    {
                      $eq: [
                        {
                          $size: '$courses',
                        },
                        0,
                      ],
                    },
                    '$$REMOVE',
                    '$courses',
                  ],
                },
                certifications: {
                  $cond: [
                    {
                      $eq: [
                        {
                          $size: '$certifications',
                        },
                        0,
                      ],
                    },
                    '$$REMOVE',
                    '$certifications',
                  ],
                },
                tests: {
                  $cond: [
                    {
                      $eq: [
                        {
                          $size: '$tests',
                        },
                        0,
                      ],
                    },
                    '$$REMOVE',
                    '$tests',
                  ],
                },
                projects: {
                  $cond: [
                    {
                      $eq: [
                        {
                          $size: '$projects',
                        },
                        0,
                      ],
                    },
                    '$$REMOVE',
                    '$projects',
                  ],
                },
                additionals: {
                  $cond: [
                    {
                      $eq: [
                        {
                          $size: '$additionals',
                        },
                        0,
                      ],
                    },
                    '$$REMOVE',
                    '$additionals',
                  ],
                },
              },
            },
          ],
          function(errInFetch, fetchedInterviewee) {
            if (errInFetch) {
              waterfallCallback({
                type: CONSTANTS.ERROR_TYPES.DB_ERROR,
                msg: 'Unable to get interviewee details from database',
                errorDetail: JSON.stringify(errInFetch),
              });
            } else {
              waterfallCallback(null, fetchedInterviewee);
            }
          }
        );
      },

      function(fetchedInterviewee, waterfallCallback) {
        let count = Object.keys(fetchedInterviewee[0]).length - 2;
        let percent = count * 10;
        console.log(percent);
        waterfallCallback(null, percent);
      },
    ],
    function(err, data) {
      callback(err, data);
    }
  );
}

/**
 * Function to generate full User's profile if he/she is an interviewee with percentage of profile filled
 * @param {ObjectId} userId User's ObjectId
 * @param {function} callback Function having two parameters - error and Interviewee Details with percentage of rofile filled
 */
function getFullIntervieweeProfile(userId, callback) {
  async.waterfall(
    [
      function(waterfallCallback) {
        userHelper.getIntervieweeDetails(userId, function(
          errInFetch,
          IntervieweeData
        ) {
          waterfallCallback(errInFetch, IntervieweeData);
        });
      },

      function(IntervieweeData, waterfallCallback) {
        percentageProfileFilled(userId, function(err, percent) {
          let obj = { percent: percent };
          let newData = Object.assign({}, IntervieweeData._doc, obj);
          waterfallCallback(null, newData);
        });
      },
    ],
    function(err, data) {
      callback(err, data);
    }
  );
}

module.exports = {
  getFullIntervieweeProfile: getFullIntervieweeProfile,
};
