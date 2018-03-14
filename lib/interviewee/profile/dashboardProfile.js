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
          count: {
            $add: [
              {
                $cond: [
                  { $not: [{ $not: ['$before_senior_sec'] }] },
                  {
                    $cond: [
                      {
                        $eq: ['$before_senior_sec', {}],
                      },
                      0,
                      1,
                    ],
                  },
                  0,
                ],
              },
              {
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
                      0,
                      1,
                    ],
                  },
                  0,
                ],
              },
              {
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
                      0,
                      1,
                    ],
                  },
                  0,
                ],
              },
              {
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
                      0,
                      1,
                    ],
                  },
                  0,
                ],
              },
              {
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
                      0,
                      1,
                    ],
                  },
                  0,
                ],
              },
              {
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
                      0,
                      1,
                    ],
                  },
                  0,
                ],
              },
              {
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
                      0,
                      1,
                    ],
                  },
                  0,
                ],
              },
              {
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
                      0,
                      1,
                    ],
                  },
                  0,
                ],
              },
              {
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
                      0,
                      1,
                    ],
                  },
                  0,
                ],
              },
              {
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
                      0,
                      1,
                    ],
                  },
                  0,
                ],
              },
            ],
          },
        },
      },
    ],
    function(errInFetch, fetchedInterviewee) {
      if (errInFetch) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg: 'Unable to get interviewee details from database',
          errorDetail: JSON.stringify(errInFetch),
        });
      } else if (fetchedInterviewee.length == 0) {
        callback({
          type: CONSTANTS.ERROR_TYPES.INVALID_RECORD,
          msg: 'No Interviewee professional Data Exist for the logged user',
          errorDetail: 'User does not have any professional data',
        });
      } else {
        let percent = fetchedInterviewee[0].count * 10;
        let obj = {
          percent: percent,
        };
        callback(null, obj);
      }
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
        percentageProfileFilled(userId, function(err, percentObj) {
          let newData = Object.assign({}, IntervieweeData._doc, percentObj);
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
