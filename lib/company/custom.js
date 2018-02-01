const async = require('async');
const mongoose = require('mongoose');
const Models = require('../../app/models');
const Company = Models.Company;
const JobOpening = Models.JobOpening;
const userHelper = require('../../app/helpers/user');
const CONSTANTS = require('../../config/constants');
const KEYS = require('../../config/keys');

function getDashboardDetails(userId, callback) {
    callback(null, 'Hii ravi');
 }


module.exports = {
    getDashboardDetails: getDashboardDetails
}