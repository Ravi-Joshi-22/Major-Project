const async = require('async');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Models = require('../../app/models');
const Company = Models.Company;
const userHelper = require('../../app/helpers/user');
const mailHelper = require('../../app/helpers/mail_helper');
const CONSTANTS = require('../../config/constants');
const KEYS = require('../../config/keys');

/**
 * Function to create new company
 * @param {Object} companyData having company data
 * @param {Objcet} addressData having user data
 * @param {object} callback having two parameters first being error and second being saved company
 */

function saveCompanyDetails(companyData, addressData, callback) {
  const newCompany = new Company({
    company_cin: companyData.number,
    company_name: companyData.name,
    company_phone: companyData.phone,
    company_logo: companyData.url,
    company_website: companyData.website,
    address: addressData, //inserting complete object has obtained from body
  });

  newCompany.save(function (companySaveError, savedCompany) {
    if (companySaveError) {
      callback({
        type: CONSTANTS.ERROR_TYPES.DB_ERROR,
        msg: 'Unable to create company account',
        errorDetail: JSON.stringify(companySaveError),
      });
    } else {
      callback(null, savedCompany);
    }
  });
}

/**
 * Function to save a newly created user in company
 * @param {objectId} companyId company unique Id
 * @param {objectId} userId  company user Id
 * @param {Function} callback having two parameters first being error and second being saved company
 */
function saveUserToCompany(companyId, userId, callback) {
  Company.findById(companyId, function (err, doc) {
    if (err) {
      callback({
        type: CONSTANTS.ERROR_TYPES.DB_ERROR,
        msg: 'Unable to find company with this ID',
        errorDetail: JSON.stringify(err),
      });
    }

    doc.users.push(userId);
    doc.save(function (errInSave, savedUser) {
      if (errInSave) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg: 'Failed to update a new user in company.',
          errorDetail: String(errInSave),
        });
        return;
      }
      callback(null, savedUser);
    });
  });
}

/**
 * Function to fully register company
 * @param {object} companyData company data
 * @param {object} addressData address data
 * @param {object} userData user data
 * @param {Function} callback err and new company
 */
function createNewCompany(companyData, addressData, userData, callback) {
  async.waterfall(
    [
      function (waterfallCallback) {
        saveCompanyDetails(companyData, addressData, function (
          err,
          savedCompany
        ) {
          waterfallCallback(err, savedCompany);
        });
      },

      function (savedCompany, waterfallCallback) {
        userHelper.registerUser(userData, function (err, savedUser) {
          waterfallCallback(err, savedUser, savedCompany);
        });
      },

      function (savedUser, savedCompany, waterfallCallback) {
        saveUserToCompany(savedCompany._id, savedUser._id, function (
          err,
          newCompany
        ) {
          waterfallCallback(err, newCompany, savedUser);
        });
      },

      function (newCompany, savedUser, waterfallCallback) {
        const JWToken = jwt.sign(
          {
            userId: savedUser._id,
          },
          KEYS.SECRET.JWT_SECRET,
          {
            expiresIn: KEYS.SECRET.EXPIRE,
          }
        );

        const sendmailObj = {
          url: `${
            KEYS.HOSTNAME.URI
            }/smarthyre/api/v1/app/verifyEmail?token=${JWToken}`,
          email: savedUser.email,
          firstName: savedUser.first_name,
        };
        mailHelper.sendVerificationMail(sendmailObj, function (
          errInSent,
          sentMail
        ) {
          waterfallCallback(errInSent, newCompany);
        });
      },
    ],
    function (err, createdCompany) {
      callback(err, createdCompany);
    }
  );
}

module.exports = {
  createNewCompany: createNewCompany,
};
