const async = require('async');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Models = require('../../app/models');
const Company = Models.Company;
const JobOpening = Models.JobOpening;
const userHelper = require('../../app/helpers/user');
const mailHelper = require('../../app/helpers/mail_helper');
const CONSTANTS = require('../../config/constants');
const KEYS = require('../../config/keys');
const stripe = require('stripe')(KEYS.stripeSecretKey);

/**
 * Function to add credits to company account
 * @param {object} company comapny object
 * @param {token} sourceToken authrozied token from user
 * @param {function} callback
 */
function addCredits(company, sourceToken, callback) {
  stripe.charges.create(
    {
      amount: 5000,
      currency: 'usd',
      description: '$50 for 10 openings',
      source: sourceToken,
    },
    function(err, charge) {
      if (!err) {
        company.credits += 50;
        company.save(function(saveCompanyError, savedCompany) {
          if (saveCompanyError) {
            callback({
              type: CONSTANTS.ERROR_TYPES.DB_ERROR,
              msg: 'Unable to add credits to your account',
              errorDetail: JSON.stringify(saveCompanyError),
            });
          } else {
            callback(null, savedCompany);
          }
        });
      }
    }
  );
}

/**
 * Fetch company and add credits to it
 * @param {object} userId
 * @param {string} token
 * @param {function} callback
 */
function addCreditsToCompany(userId, token, callback) {
  async.waterfall(
    [
      function(waterfallCallback) {
        userHelper.getCompanyDetailsFromUser(userId, function(
          err,
          fetchedCompany
        ) {
          waterfallCallback(err, fetchedCompany);
        });
      },

      function(fetchedCompany, waterfallCallback) {
        addCredits(fetchedCompany, token, function(err, savedCompany) {
          waterfallCallback(err, savedCompany);
        });
      },
    ],
    function(err, data) {
      callback(err, data);
    }
  );
}

/**
 * Function to insert new opening
 * @param {objectId} companyId object Id
 * @param {object} openingDetails having company details
 * @param {function} callback error and savedOpening
 */
function insertNewOpening(companyId, openingDetails, callback) {
  const newOpening = new JobOpening({
    company_id: companyId,
    position: openingDetails.position,
    responsibilities: openingDetails.responsibilities,
    skills: openingDetails.skills,
    qualifications: openingDetails.qualifications,
    experience_min: openingDetails.exMin,
    experience_max: openingDetails.exMax,
    location: openingDetails.location,
    salary: openingDetails.salary,
    start_date: openingDetails.sDate,
    end_date: openingDetails.eDate,
  });

  newOpening.save(function(openingSaveError, savedOpening) {
    if (openingSaveError) {
      callback({
        type: CONSTANTS.ERROR_TYPES.DB_ERROR,
        msg: 'Unable to create new opening , please enter valid information ',
        errorDetail: JSON.stringify(openingSaveError),
      });
    } else {
      callback(null, savedOpening);
    }
  });
}
/**
 * Function to create new openin
 * @param {object} userDetails  user details object
 * @param {object} openingDetail opening details object
 * @param {function} callback  function having error and saved opening
 */
function createNewOpening(userDetails, openingDetail, callback) {
  async.waterfall(
    [
      function(waterfallCallback) {
        userHelper.getCompanyDetailsFromUser(userDetails, function(
          err,
          fetchedCompany
        ) {
          waterfallCallback(err, fetchedCompany);
        });
      },

      function(fetchedCompany, waterfallCallback) {
        if (fetchedCompany.credits >= 5) {
          insertNewOpening(fetchedCompany._id, openingDetail, function(
            err,
            createdOpening
          ) {
            waterfallCallback(err, createdOpening, fetchedCompany);
          });
        } else {
          waterfallCallback({
            type: CONSTANTS.ERROR_TYPES.INVALID_RECORD,
            msg: 'You are not having sufficient credits to create an opening',
            errorDetail: 'Ýou require atleast 5 credits to create new opening',
          });
        }
      },

      function(createdOpening, fetchedCompany, waterfallCallback) {
        fetchedCompany.credits -= 5;
        fetchedCompany.save(function(saveError, savedCompany) {
          waterfallCallback(saveError, savedCompany, createdOpening);
        });
      },

      function(savedCompany, createdOpening, waterfallCallback) {
        const sendmailObj = {
          email: userDetails.email,
          companyName: savedCompany.company_name,
          postion: createdOpening.position,
          credits: savedCompany.credits,
        };
        mailHelper.sendOpeningMail(sendmailObj, function(errInSent, sentMail) {
          waterfallCallback(errInSent, createdOpening);
        });
      },
    ],
    function(err, data) {
      callback(err, data);
    }
  );
}
/**

 * Function to update job opening of company
 * @param {ObjectId} companyId company Id
 * @param {Object} openingData having job opening Data
 * @param {Object} callback has two parameters first errorInSave and Saved opening Details
 */

function updateJobOpening(companyId, openingData, callback) {
  JobOpening.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(openingData.openingId),
      company_id: companyId,
    },
    {
      $set: {
        company_id: companyId,
        position: openingData.position,
        responsibilities: openingData.responsibilities,
        skills: openingData.skills,
        qualifications: openingData.qualifications,
        experience_min: openingData.experience_min,
        experience_max: openingData.experience_max,
        location: openingData.location,
        salary: openingData.salary,
        start_date: openingData.start_date,
        end_date: openingData.end_date,
      },
    },
    function(errInSave, returnedInstance) {
      if (errInSave) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg: 'Unable to update existing Job Opening Details',
          errorDetail: JSON.stringify(errInSave),
        });
      } else if (!returnedInstance) {
        callback({
          type: CONSTANTS.ERROR_TYPES.INVALID_RECORD,
          msg: 'No such opening exist',
          errorDetail: 'invalid opening Id',
        });
      } else {
        callback(null, returnedInstance);
      }
    }
  );
}

/**
 * Function to delete existing opening of logged company
 * @param {objectId} companyId having existing company Id
 * @param {ObjectId} openingId having existing opening Id
 * @param {Object} callback has two parameters first errorInSave and Saved opening Details
 */
function deleteOpening(companyId, openingId, callback) {
  JobOpening.findOneAndRemove(
    {
      _id: mongoose.Types.ObjectId(openingId),
    },
    {
      company_id: companyId,
    }
  ).exec(function(errInSave, returnedInstance) {
    if (errInSave) {
      callback({
        type: CONSTANTS.ERROR_TYPES.DB_ERROR,
        msg: 'Unable to delete existing job opening ',
        errorDetail: JSON.stringify(errInSave),
      });
    } else if (!returnedInstance) {
      callback({
        type: CONSTANTS.ERROR_TYPES.INVALID_RECORD,
        msg: 'No such opening exist ',
      });
    } else {
      callback(null, returnedInstance);
    }
  });
}

function deleteOpeningOfCompany(userId, openingId, callback) {
  async.waterfall(
    [
      function(waterfallCallback) {
        userHelper.getCompanyDetailsFromUser(userId, function(
          err,
          fetchedCompany
        ) {
          waterfallCallback(err, fetchedCompany);
        });
      },

      function(fetchedCompany, waterfallCallback) {
        deleteOpening(fetchedCompany._id, openingId, function(
          err,
          savedCompany
        ) {
          waterfallCallback(err, savedCompany);
        });
      },
    ],
    function(err, data) {
      callback(err, data);
    }
  );
}

/**
 * Function to extract all the openings of the company
 * @param {ObjectId} companyId company Id
 * @param {Function} callback having error and Fetched data
 */
function getAllOpenings(companyId, callback) {
  JobOpening.find({
    company_id: companyId,
  }).exec(function(err, fetchedData) {
    if (err) {
      callback({
        type: CONSTANTS.ERROR_TYPES.DB_ERROR,
        msg: 'Failed to check record',
        errorDetail: JSON.stringify(err),
      });
    } else {
      callback(null, fetchedData);
    }
  });
}
/**
 * Function to extract all the openings of that company only
 * @param {ObjectId} userId user Id
 * @param {Function} callback having error and Fetched data
 */
function updateOpeningOfCompany(userId, openingData, callback) {
  async.waterfall(
    [
      function(waterfallCallback) {
        userHelper.getCompanyDetailsFromUser(userId, function(
          err,
          fetchedCompany
        ) {
          waterfallCallback(err, fetchedCompany);
        });
      },

      function(fetchedCompany, waterfallCallback) {
        updateJobOpening(fetchedCompany._id, openingData, function(
          err,
          savedCompany
        ) {
          waterfallCallback(err, savedCompany);
        });
      },
    ],
    function(err, data) {
      callback(err, data);
    }
  );
}

function getAllOpeningsOfCompany(userId, callback) {
  async.waterfall(
    [
      function(waterfallCallback) {
        userHelper.getCompanyDetailsFromUser(userId, function(
          err,
          fetchedCompany
        ) {
          waterfallCallback(err, fetchedCompany);
        });
      },
      function(fetchedCompany, waterfallCallback) {
        getAllOpenings(fetchedCompany._id, function(err, savedCompany) {
          waterfallCallback(err, savedCompany);
        });
      },
    ],
    function(err, data) {
      callback(err, data);
    }
  );
}

/**
 * Function to get opening Details and scores in descending order of all given and applied candidates with all his/her basic information in an opening
 * @param {ObjectId} companyId _id of Company
 * @param {ObjectId} openingId _id of opening
 * @param {Function} callback err and opening Details flooded with candidates basic information with score in descending order
 */
function getResultDetail(companyId, openingId, callback) {
  let ed = new Date();
  JobOpening.findOne({ company_id: companyId, _id: openingId })
    .populate({
      path: 'interviewees',
      select: 'user_id _id score interview_status',
      options: { sort: { score: -1 } },
      populate: {
        path: 'user_id',
        select: '-password -role -verification_status',
      },
    })
    .exec(function(err, fetchedOpening) {
      if (err) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg: 'Failed to fetch opening Details',
          errorDetail: JSON.stringify(err),
        });
      } else if (fetchedOpening.end_date >= ed) {
        callback({
          type: CONSTANTS.ERROR_TYPES.INVALID_RECORD,
          msg: 'Opening has not yet closed',
          errorDetail: 'Result will be generated after opening gets closed',
        });
      } else {
        callback(null, fetchedOpening);
      }
    });
}

/**
 * Function to get result
 * @param {ObjectId} userId _id of User
 * @param {ObjectId} openingId _id of Opening
 * @param {Function} callback err and err and opening Details flooded with candidates basic information with score in descending order
 */
function getResult(userId, openingId, callback) {
  async.waterfall(
    [
      function(waterfallCallback) {
        userHelper.getCompanyDetailsFromUser(userId, function(
          err,
          fetchedCompany
        ) {
          waterfallCallback(err, fetchedCompany);
        });
      },

      function(fetchedCompany, waterfallCallback) {
        getResultDetail(fetchedCompany._id, openingId, function(
          err,
          fetchedOpening
        ) {
          waterfallCallback(err, fetchedOpening);
        });
      },
    ],
    function(err, data) {
      callback(err, data);
    }
  );
}

/**
 * Function to change interview status of candidates who are selected in interview
 * @param {Array} selected array of interview tracks _id and email of selected candidates
 * @param {Function} callback Function with two parameters - err and updation Response
 */
function changeSelectedStatus(selected, callback) {
  Models.InterviewTrack.updateMany(
    { _id: { $in: selected } },
    {
      $set: {
        interview_status: CONSTANTS.ENUMS.USER.INTERVIEW_STATUS.SELECTED,
      },
    },
    function(err, updationResponse) {
      if (err) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg: 'Failed to fetch Interview Track Details',
          errorDetail: JSON.stringify(err),
        });
      } else if (selected.length != updationResponse.nModified) {
        callback({
          type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
          msg: 'Failed to modify interview status of some record',
          errorDetail: 'Some record was left unupdated in database',
        });
      } else {
        callback(null, updationResponse);
      }
    }
  );
}

/**
 * Function to change interview status of candidates who are rejected in interview
 * @param {Array} selected array of interview tracks _id and email of rejected candidates
 * @param {Function} callback Function with two parameters - err and updation Response
 */
function changeRejectedStatus(rejected, callback) {
  Models.InterviewTrack.updateMany(
    { _id: { $in: rejected } },
    {
      $set: {
        interview_status: CONSTANTS.ENUMS.USER.INTERVIEW_STATUS.REJECTED,
      },
    },
    function(err, updationResponse) {
      if (err) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg: 'Failed to fetch Interview Track Details',
          errorDetail: JSON.stringify(err),
        });
      } else if (rejected.length != updationResponse.nModified) {
        callback({
          type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
          msg: 'Failed to modify interview status of some record',
          errorDetail: 'Some record was left unupdated in database',
        });
      } else {
        callback(null, updationResponse);
      }
    }
  );
}

/**
 * Function to change interview status of all candidates applied in opening and send respective mails to them as per their status
 * @param {ObjectId} userId _id of User
 * @param {ObjectId} openingId _id of Opening
 * @param {Integer} count Number of candidates that company wants to hire
 * @param {*} callback Function with two parameters - err and Data
 */
function hiringCount(userId, openingId, count, callback) {
  async.waterfall(
    [
      function(waterfallCallback) {
        userHelper.getCompanyDetailsFromUser(userId, function(
          err,
          fetchedCompany
        ) {
          waterfallCallback(err, fetchedCompany);
        });
      },

      function(fetchedCompany, waterfallCallback) {
        getResultDetail(fetchedCompany._id, openingId, function(
          err,
          fetchedOpening
        ) {
          waterfallCallback(err, fetchedOpening);
        });
      },

      function(fetchedOpening, waterfallCallback) {
        let selected = [];
        let rejected = [];
        if (fetchedOpening.interviewees.length > count) {
          for (let i = 0; i < count; i++) {
            selected.push({
              _id: fetchedOpening.interviewees[i]._id,
              email: fetchedOpening.interviewees[i].user_id.email,
            });
          }
          for (let i = count; i < fetchedOpening.interviewees.length; i++) {
            rejected.push({
              _id: fetchedOpening.interviewees[i]._id,
              email: fetchedOpening.interviewees[i].user_id.email,
            });
          }
        } else {
          for (let i = 0; i < fetchedOpening.interviewees.length; i++) {
            selected.push({
              _id: fetchedOpening.interviewees[i]._id,
              email: fetchedOpening.interviewees[i].user_id.email,
            });
          }
        }
        let candidates = {
          selected: selected,
          rejected: rejected,
        };
        waterfallCallback(null, candidates);
      },

      function(candidates, waterfallCallback) {
        changeSelectedStatus(candidates.selected, function(
          err,
          updationResponse
        ) {
          waterfallCallback(err, candidates);
        });
      },

      function(candidates, waterfallCallback) {
        changeRejectedStatus(candidates.rejected, function(
          err,
          updationResponse
        ) {
          waterfallCallback(err, candidates);
        });
      },
    ],
    function(err, data) {
      callback(err, data);
    }
  );
}

module.exports = {
  addCreditsToCompany: addCreditsToCompany,
  createNewOpening: createNewOpening,
  updateOpeningOfCompany: updateOpeningOfCompany,
  deleteOpeningOfCompany: deleteOpeningOfCompany,
  getAllOpeningsOfCompany: getAllOpeningsOfCompany,
  getResult: getResult,
  hiringCount: hiringCount,
};
