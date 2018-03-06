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
      company_id: companyId,
      opening: {
        $elemMatch: {
          _id: mongoose.Types.ObjectId(openingData._id),
        },
      },
    },
    {
      $set: {
        'opening.$.company_id': openingData.company_id,
        'opening.$.position': openingData.position,
        'opening.$.responsibilities': openingData.responsibilities,
        'opening.$.skills': openingData.skills,
        'opening.$.qualifications': openingData.qualifications,
        'opening.$.experience_min': openingData.experience_min,
        'opening.$.experience_max': openingData.experience_max,
        'opening.$.location': openingData.location,
        'opening.$.salary': openingData.salary,
        'opening.$.start_date': openingData.start_date,
        'opening.$.end_date': openingData.end_date,
        'opening.$.interviewees': openingData.interviewees,
      },
    },
    function(errInSave, returnedInstance) {
      if (errInSave) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg: 'Unable to update existing Job Opening Details',
          errorDetail: JSON.stringify(errInSave),
        });
      } else {
        callback(null, returnedInstance);
      }
    }
  );
}

module.exports = {
  addCreditsToCompany: addCreditsToCompany,
  createNewOpening: createNewOpening,
  updateJobOpening: updateJobOpening,
};
