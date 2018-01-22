const async = require('async');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Models = require('../../app/models');
const Company = Models.Company;
const userHelper = require('../../app/helpers/user');
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
    stripe.charges.create({
        amount: 5000,
        currency: 'usd',
        description: '$50 for 10 openings',
        source: sourceToken,
    }, function (err, charge) {
        if (!err) {
            company.credits += 50;
            company.save(function (saveCompanyError, savedCompany) {
                if (saveCompanyError) {
                    callback({
                        type: CONSTANTS.ERROR_TYPES.DB_ERROR,
                        msg: 'Unable to add credits to your account',
                        errorDetail: JSON.stringify(saveCompanyError),
                    })
                } else {
                    callback(null, savedCompany);
                }
            });
        }
    });
}

/**
 * Fetch company and add credits to it
 * @param {*} userId 
 * @param {*} token 
 * @param {*} callback 
 */
function addCreditsToCompany(userId, token, callback) {
    async.waterfall([
        function (waterfallCallback) {
            userHelper.getCompanyDetailsFromUser(userId, function (err, fetchedCompany) {
                waterfallCallback(err, fetchedCompany);
            });
        },

        function (fetchedCompany, waterfallCallback) {
            addCredits(fetchedCompany, token, function (err, savedCompany) {
                waterfallCallback(err, savedCompany);
            });
        }
    ], function (err, data) {
        callback(err, data)
    });
}


module.exports = {
    addCreditsToCompany: addCreditsToCompany
}