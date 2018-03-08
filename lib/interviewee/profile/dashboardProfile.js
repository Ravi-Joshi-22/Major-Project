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
                _id: 0,
                before_senior_sec: {
                  $cond: [
                    { $not: [{ $not: ['$before_senior_sec'] }] },
                    {
                      $cond: [
                        {
                          $eq: ['$before_senior_sec', {}],
                        },
                        '$$REMOVE',
                        1,
                      ],
                    },
                    '$$REMOVE',
                  ],
                },
                after_senior_sec: {
                  $cond: [
                    { $not: [{ $not: ['$after_senior_sec'] }] },
                    {
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
                        1,
                      ],
                    },
                    '$$REMOVE',
                  ],
                },
                jobs: {
                  $cond: [
                    { $not: [{ $not: ['$jobs'] }] },
                    {
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
                        1,
                      ],
                    },
                    '$$REMOVE',
                  ],
                },
                internships: {
                  $cond: [
                    { $not: [{ $not: ['$internships'] }] },
                    {
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
                        1,
                      ],
                    },
                    '$$REMOVE',
                  ],
                },
                skills: {
                  $cond: [
                    { $not: [{ $not: ['$skills'] }] },
                    {
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
                        1,
                      ],
                    },
                    '$$REMOVE',
                  ],
                },
                courses: {
                  $cond: [
                    { $not: [{ $not: ['$courses'] }] },
                    {
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
                        1,
                      ],
                    },
                    '$$REMOVE',
                  ],
                },
                certifications: {
                  $cond: [
                    { $not: [{ $not: ['$certifications'] }] },
                    {
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
                        1,
                      ],
                    },
                    '$$REMOVE',
                  ],
                },
                tests: {
                  $cond: [
                    { $not: [{ $not: ['$tests'] }] },
                    {
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
                        1,
                      ],
                    },
                    '$$REMOVE',
                  ],
                },
                projects: {
                  $cond: [
                    { $not: [{ $not: ['$projects'] }] },
                    {
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
                        1,
                      ],
                    },
                    '$$REMOVE',
                  ],
                },
                additionals: {
                  $cond: [
                    { $not: [{ $not: ['$additionals'] }] },
                    {
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
                        1,
                      ],
                    },
                    '$$REMOVE',
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
              console.log(fetchedInterviewee);
              waterfallCallback(null, fetchedInterviewee);
            }
          }
        );
      },

      function(fetchedInterviewee, waterfallCallback) {
        let count = Object.keys(fetchedInterviewee[0]).length;
        let percent = count * 10;
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
          waterfallCallback(err, newData);
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
