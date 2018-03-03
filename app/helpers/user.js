const Models = require('../models');
const CONSTANTS = require('../../config/constants');

const User = Models.User;
const Company = Models.Company;
const Interviewee = Models.Interviewee;

/**
 * This function is used to create new user
 * @param {Object} userData object having user detail
 * @param {Function} callback having two parameters first being error and second being saved user
 */

function registerUser(userData, callback) {
  const newUser = new User({
    first_name: userData.fName,
    last_name: userData.lName,
    phone: userData.phone,
    email: userData.email,
    password: userData.password,
    role: userData.role,
  });

  newUser.save(function(savedUserError, savedUser) {
    if (savedUserError) {
      callback({
        type: CONSTANTS.ERROR_TYPES.DB_ERROR,
        msg: 'Unable to create user account',
        errorDetail: JSON.stringify(savedUserError),
      });
    } else {
      callback(null, savedUser);
    }
  });
}

/**
 * Function get user details by ID
 * @param {objectId} userId user objectId
 * @param {Function} callback function two param err and fetched user
 */
function fetchUser(userId, callback) {
  User.findById(userId).exec(function(err, user) {
    if (err) {
      callback({
        type: CONSTANTS.ERROR_TYPES.DB_ERROR,
        msg: 'Unable to fetch user details from database',
        errorDetail: JSON.stringify(err),
      });
    } else {
      callback(null, user);
    }
  });
}

/**
 * Function to get company details from userId
 * @param {objectId} userId user objectId
 * @param {Function} callback function two param err and fetched user
 */
function getCompanyDetailsFromUser(userId, callback) {
  Company.findOne({
    users: userId,
  }).exec(function(companyFetchError, companyDetails) {
    if (companyFetchError) {
      callback({
        type: CONSTANTS.ERROR_TYPES.DB_ERROR,
        msg: 'Unable to fetch company details from database',
        errorDetail: String(companyFetchError),
      });
    } else if (!companyDetails) {
      callback({
        type: CONSTANTS.ERROR_TYPES.INVALID_RECORD,
        msg: 'Invalid Record,No company found with the given Id',
        errorDetail: 'Invalid User ID.',
      });
    } else {
      callback(null, companyDetails);
    }
  });
}

function getIntervieweeDetails(userId, callback) {
  Interviewee.findOne(
    {
      userId: userId,
    },
    function(errInFetch, fetchedInterviewe) {
      if (errInFetch) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg: 'Unable to get interviewee details from database',
          errorDetail: JSON.stringify(errInFetch),
        });
      } else {
        callback(null, fetchedInterviewe);
      }
    }
  );
}

function getTotalExperience(userId, callback) {
  Interviewee.aggregate(
    [
      {
        $match: {
          userId: userId,
        },
      },
      {
        $unwind: {
          path: '$jobs',
        },
      },
      {
        $project: {
          duration: {
            $divide: [
              {
                $subtract: ['$jobs.end_date', '$jobs.start_date'],
              },
              1000 * 60 * 60 * 24 * 365,
            ],
          },
        },
      },
      {
        $group: {
          _id: '$_id',
          total_experience: {
            $sum: '$duration',
          },
        },
      },
    ],
    function(errInFetch, experience) {
      if (errInFetch) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg: 'Unable to calculate experience',
          errorDetail: JSON.stringify(errInFetch),
        });
      } else if (experience.length === 0) {
        experience = { total_experience: 0 };
        callback(null, experience);
      } else {
        callback(null, experience[0]);
      }
    }
  );
}

module.exports = {
  registerUser: registerUser,
  fetchUser: fetchUser,
  getCompanyDetailsFromUser: getCompanyDetailsFromUser,
  getIntervieweeDetails: getIntervieweeDetails,
  getTotalExperience: getTotalExperience,
};
