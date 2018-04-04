const express = require('express');
const seniorSecondaryLib = require('../../../../lib/interviewee/profile/seniorSecondary');
const CONSTANTS = require('../../../../config/constants');

const router = express.Router();

/**
 * Function to update Senior Secondary Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function updateSeniorSecondaryDetails(req, res, next) {
  if (req.body.hasOwnProperty('senior_secondary') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert senior_secondarys details for senior_secondarys data inside object of senior_secondary property',
      errorDetail: 'There exists no senior_secondary property for usage',
    };
    res.status(500).json(err);
  } else if (
    req.body.senior_secondary.hasOwnProperty('school') == false ||
    req.body.senior_secondary.hasOwnProperty('board') == false ||
    req.body.senior_secondary.hasOwnProperty('stream') == false ||
    req.body.senior_secondary.hasOwnProperty('year_of_comp') == false ||
    req.body.senior_secondary.hasOwnProperty('performance') == false
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert school, board, stream, year_of_comp and performance field(required) inside requested Objects senior_secondary property',
      errorDetail:
        'There exists either no school or board or stream or year_of_comp or performace property inside senior_secondary object for usage',
    };
    res.status(500).json(err);
  } else if (
    req.body.senior_secondary.performance.hasOwnProperty('scale') == false ||
    req.body.senior_secondary.performance.hasOwnProperty('value') == false
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert scale and value field(required) inside requested Objects senior_secondary property',
      errorDetail:
        'There exists either no scale or value property inside senior_secondary object for usage',
    };
    res.status(500).json(err);
  } else if (
    req.body.senior_secondary.school == '' ||
    req.body.senior_secondary.board == '' ||
    req.body.senior_secondary.year_of_comp == '' ||
    req.body.senior_secondary.stream == '' ||
    req.body.senior_secondary.performance.scale == '' ||
    req.body.senior_secondary.performance.value == ''
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert school, board, year_of_comp, scale and value field field(required) inside requested Objects senior_secondary property',
      errorDetail:
        'Either school or board or year_of_comp or performance(scale and value) or all fields are empty or 0 (Insert a specific different school from other senior_secondarys school)',
    };
    res.status(500).json(err);
  } else if (
    typeof req.body.senior_secondary.school != 'string' ||
    typeof req.body.senior_secondary.board != 'string' ||
    typeof req.body.senior_secondary.year_of_comp != 'number' ||
    typeof req.body.senior_secondary.performance.scale != 'string' ||
    typeof req.body.senior_secondary.performance.value != 'number'
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert correct values for property to be stored',
      errorDetail:
        'There exists some incorrect value for some property inside object requested',
    };
    res.status(500).json(err);
  } else {
    seniorSecondaryLib.updateSeniorSecondaryOfInterviewee(
      req.user._id,
      req.body.senior_secondary,
      function(errInUpdation, updatedInstance) {
        if (errInUpdation) {
          res.status(500).json(errInUpdation);
        } else {
          res.status(200).json(updatedInstance);
        }
      }
    );
  }
}

/**
 * Function to delete Senior Secondary Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function deleteSeniorSecondaryDetails(req, res, next) {
  seniorSecondaryLib.deleteSeniorSecondaryOfInterviewee(req.user._id, function(
    errInUpdation,
    updatedInstance
  ) {
    if (errInUpdation) {
      res.status(500).json(errInUpdation);
    } else {
      res.status(200).json(updatedInstance);
    }
  });
}

router.put('/', updateSeniorSecondaryDetails);
router.delete('/', deleteSeniorSecondaryDetails);

module.exports = router;
