const async = require('async');
const mongoose = require('mongoose');
const Models = require('../../app/models');
const Company = Models.Company;
const JobOpening = Models.JobOpening;
const userHelper = require('../../app/helpers/user');
const openingHelper = require('../../app/helpers/opening_helper');
const populateHelper = require('../../app/helpers/populate');
const CONSTANTS = require('../../config/constants');
const KEYS = require('../../config/keys');

/**
 * Function to find total number of openings created till now  by any company and average number of openings created per month
 * @param {ObjectId} companyId Company's ObjectId
 * @param {Function} callback Function having two paramters - error and gernated total openings and average openings by a company in a month
 */
function avgOpeningCreated(companyId, callback) {
  let ed = new Date();
  let running_year = ed.getFullYear();
  let last_year;
  let running_month = ed.getMonth() + 1;
  let last_month;
  if (running_month == 1) {
    last_month = 12;
  } else {
    last_month = running_month - 1;
  }
  if (last_month == 12) {
    last_year = running_year - 1;
  } else {
    last_year = running_year;
  }
  JobOpening.aggregate(
    [
      {
        $match: {
          company_id: mongoose.Types.ObjectId(companyId),
        },
      },
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' },
          },
          numberofopenings: { $sum: 1 },
        },
      },
      {
        $project: {
          temp: {
            id: '$_id',
            numberofopenings: '$numberofopenings',
          },
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          temps: {
            $addToSet: '$temp',
          },
        },
      },
      {
        $project: {
          _id: 0,
          total_openings: {
            $sum: '$temps.numberofopenings',
          },
          avg_openings_per_month: {
            $trunc: {
              $divide: [
                {
                  $sum: '$temps.numberofopenings',
                },
                '$count',
              ],
            },
          },
          running_month_openings_array: {
            $filter: {
              input: '$temps',
              as: 'temp',
              cond: {
                $and: [
                  {
                    $eq: ['$$temp.id.month', running_month],
                  },
                  {
                    $eq: ['$$temp.id.year', running_year],
                  },
                ],
              },
            },
          },
          last_month_openings_array: {
            $filter: {
              input: '$temps',
              as: 'temp',
              cond: {
                $and: [
                  {
                    $eq: ['$$temp.id.month', last_month],
                  },
                  {
                    $eq: ['$$temp.id.year', last_year],
                  },
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          total_openings: 1,
          avg_openings_per_month: 1,
          running_month_openings: {
            $arrayElemAt: ['$running_month_openings_array', 0],
          },
          last_month_openings: {
            $arrayElemAt: ['$last_month_openings_array', 0],
          },
        },
      },
      {
        $project: {
          total_openings: 1,
          avg_openings_per_month: 1,
          no_of_openings_created_in_running_month: {
            $cond: [
              {
                $not: [{ $not: ['$running_month_openings'] }],
              },
              '$running_month_openings.numberofopenings',
              0,
            ],
          },
          no_of_openings_created_in_last_month: {
            $cond: [
              {
                $not: [{ $not: ['$last_month_openings'] }],
              },
              '$last_month_openings.numberofopenings',
              0,
            ],
          },
        },
      },
    ],
    function(err, generatedInstance) {
      if (err) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg: 'Failed group openings based on month-year format !',
          errorDetail: JSON.stringify(err),
        });
      } else if (generatedInstance.length == 0) {
        const obj = {
          total_openings: 0,
          avg_openings_per_month: 0,
          no_of_openings_created_in_running_month: 0,
          no_of_openings_created_in_last_month: 0,
        };
        callback(null, obj);
      } else {
        callback(null, generatedInstance[0]);
      }
    }
  );
}

/**
 * Function to find total number of candidates applied till now and average number of candidates created per month and per opening
 * @param {ObjectId} companyId Company's ObjectId
 * @param {Function} callback Function having two paramters - error and generated total candidates applied to company and average candidates by a company in a month and in an opening
 */
function avgCandidatesAppliedPerMonth(companyId, callback) {
  JobOpening.aggregate(
    [
      {
        $match: {
          company_id: mongoose.Types.ObjectId(companyId),
        },
      },
      {
        $lookup: {
          from: 'interviewtracks',
          localField: 'interviewees',
          foreignField: '_id',
          as: 'interviewees',
        },
      },
      {
        $unwind: {
          path: '$interviewees',
        },
      },
      {
        $group: {
          _id: {
            month: { $month: '$interviewees.createdAt' },
            year: { $year: '$interviewees.createdAt' },
          },
          numberofcandidates: { $sum: 1 },
        },
      },
      {
        $project: {
          temp: {
            id: '$_id',
            numberofcandidates: '$numberofcandidates',
          },
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          temp: {
            $addToSet: '$temp',
          },
        },
      },
      {
        $project: {
          _id: 0,
          total_candidates: {
            $sum: '$temp.numberofcandidates',
          },
          avg_candidates_applied_per_month: {
            $trunc: {
              $divide: [
                {
                  $sum: '$temp.numberofcandidates',
                },
                '$count',
              ],
            },
          },
        },
      },
    ],
    function(err, generatedInstance) {
      if (err) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg: 'Failed group candidates who applied per month !',
          errorDetail: JSON.stringify(err),
        });
      } else if (generatedInstance.length == 0) {
        const obj = {
          total_candidates: 0,
          avg_candidates_applied_per_month: 0,
        };
        callback(null, obj);
      } else {
        callback(null, generatedInstance[0]);
      }
    }
  );
}

/**
 * Function to find average number of candidates created per opening
 * @param {ObjectId} companyId Company's ObjectId
 * @param {Function} callback Function having two paramters - error and generated total candidates applied to company and average candidates by a company in a month and in an opening
 */
function avgCandidatesAppliedPerOpening(companyId, callback) {
  JobOpening.aggregate(
    [
      {
        $match: {
          company_id: mongoose.Types.ObjectId(companyId),
        },
      },
      {
        $project: {
          numberofcandidates: {
            $size: '$interviewees',
          },
        },
      },
      {
        $project: {
          temp: {
            id: '$_id',
            numberofcandidates: '$numberofcandidates',
          },
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          temp: {
            $addToSet: '$temp',
          },
        },
      },
      {
        $project: {
          _id: 0,
          avg_candidates_per_opening: {
            $trunc: {
              $divide: [
                {
                  $sum: '$temp.numberofcandidates',
                },
                '$count',
              ],
            },
          },
        },
      },
    ],
    function(err, generatedInstance) {
      if (err) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg: 'Failed group candidates applied based on openings !',
          errorDetail: JSON.stringify(err),
        });
      } else if (generatedInstance.length == 0) {
        const obj = {
          avg_candidates_per_opening: 0,
        };
        callback(null, obj);
      } else {
        callback(null, generatedInstance[0]);
      }
    }
  );
}

/**
 * Function to calculate number of upcoming and ongoing(current) openings created by a company
 * @param {ObectId} companyId Company's ObjectId
 * @param {Function} callback Function having two parameters - error and an Object holding number of openings - upcoming and ongoing(current)
 */
function upcomingAndCurrentOpenings(companyId, callback) {
  let ed = new Date();
  async.waterfall(
    [
      function(waterfallCallback) {
        JobOpening.find({
          company_id: mongoose.Types.ObjectId(companyId),
          start_date: {
            $gt: ed,
          },
          end_date: {
            $gt: ed,
          },
        })
          .count()
          .exec(function(err, upcomings) {
            if (err) {
              waterfallCallback({
                type: CONSTANTS.ERROR_TYPES.DB_ERROR,
                msg:
                  'Failed to retrieve upcoming openings from storage for these company !',
                errorDetail: JSON.stringify(err),
              });
            } else {
              waterfallCallback(null, upcomings);
            }
          });
      },

      function(upcomings, waterfallCallback) {
        JobOpening.find({
          company_id: mongoose.Types.ObjectId(companyId),
          start_date: {
            $lte: ed,
          },
          end_date: {
            $gte: ed,
          },
        })
          .count()
          .exec(function(err, current) {
            if (err) {
              waterfallCallback({
                type: CONSTANTS.ERROR_TYPES.DB_ERROR,
                msg:
                  'Failed to retrieve current openings from storage for these company !',
                errorDetail: JSON.stringify(err),
              });
            } else {
              waterfallCallback(null, upcomings, current);
            }
          });
      },

      function(upcomings, current, waterfallCallback) {
        let obj = {
          no_of_upcoming_openings: upcomings,
          no_of_current_openings: current,
        };
        waterfallCallback(null, obj);
      },
    ],
    function(err, data) {
      callback(err, data);
    }
  );
}

/**
 * Function to calculate number of persons giving interviews in the interval user has logged
 * @param {ObjectId} companyId Company's ObjectId
 * @param {Function} callback Function having two parameter - error and obtained array of openings going on with number of candidates giving interview
 */
function numberOfCandidatesGivingInterview(companyId, callback) {
  JobOpening.aggregate(
    [
      {
        $match: {
          company_id: mongoose.Types.ObjectId(companyId),
        },
      },
      {
        $lookup: {
          from: 'interviewtracks',
          localField: 'interviewees',
          foreignField: '_id',
          as: 'interviewees',
        },
      },
      {
        $unwind: {
          path: '$interviewees',
        },
      },
      {
        $group: {
          _id: {
            openingId: '$_id',
            position: '$position',
          },
          numberofcandidates: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    '$interviewees.interview_status',
                    CONSTANTS.ENUMS.USER.INTERVIEW_STATUS.GIVING,
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
    ],
    function(err, generatedInstance) {
      if (err) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg:
            'Failed group candidates who are giving interview over these time !',
          errorDetail: JSON.stringify(err),
        });
      } else {
        callback(null, generatedInstance);
      }
    }
  );
}

/**
 * Function asynchronously used to response all information of company with its representatives information and some analytics
 * @param {ObjectId} userId logged User's ObjectId
 * @param {Function} callback Function holding two paramters - error and Object holding all information of company
 */
function getDashboardDetails(userId, callback) {
  async.waterfall(
    [
      function(waterfallCallback) {
        userHelper.getCompanyDetailsFromUser(userId, function(
          err,
          companyData
        ) {
          waterfallCallback(err, companyData);
        });
      },

      function(companyData, waterfallCallback) {
        populateHelper._populateCompanyUsers(companyData._id, function(
          err,
          populatedData
        ) {
          waterfallCallback(err, populatedData[0]);
        });
      },

      function(populatedData, waterfallCallback) {
        avgOpeningCreated(populatedData._id, function(err, generatedData) {
          let newData = Object.assign({}, populatedData._doc, generatedData);
          waterfallCallback(err, newData);
        });
      },

      function(populatedData, waterfallCallback) {
        avgCandidatesAppliedPerMonth(populatedData._id, function(
          err,
          generatedData
        ) {
          let newData = Object.assign({}, populatedData, generatedData);
          waterfallCallback(err, newData);
        });
      },

      function(populatedData, waterfallCallback) {
        avgCandidatesAppliedPerOpening(populatedData._id, function(
          err,
          generatedData
        ) {
          let newData = Object.assign({}, populatedData, generatedData);
          waterfallCallback(err, newData);
        });
      },

      function(populatedData, waterfallCallback) {
        upcomingAndCurrentOpenings(populatedData._id, function(
          err,
          generatedData
        ) {
          let newData = Object.assign({}, populatedData, generatedData);
          waterfallCallback(err, newData);
        });
      },

      function(populatedData, waterfallCallback) {
        numberOfCandidatesGivingInterview(populatedData._id, function(
          err,
          generatedData
        ) {
          let obj = {
            no_of_candidates_giving_interview_per_opening: generatedData.length,
          };
          let newData = Object.assign({}, populatedData, obj);
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
  getDashboardDetails: getDashboardDetails,
};
