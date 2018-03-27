const express = require('express');
const secondaryLib = require('../../../../lib/interviewee/profile/secondary');
const CONSTANTS = require('../../../../config/constants');

const router = express.Router();

/**
 * Function to update Secondary Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function updateSecondaryDetails(req, res, next) {
  if (req.body.hasOwnProperty('secondary') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert secondarys details for secondarys data inside object of secondary property',
      errorDetail: 'There exists no secondary property for usage',
    };
    res.status(500).json(err);
  } else if (
    req.body.secondary.hasOwnProperty('school') == false ||
    req.body.secondary.hasOwnProperty('board') == false ||
    req.body.secondary.hasOwnProperty('year_of_comp') == false ||
    req.body.secondary.hasOwnProperty('performance') == false
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert school, board, year_of_comp and performance field(required) inside requested Objects secondary property',
      errorDetail:
        'There exists either no school or board or year_of_comp or performace property inside secondary object for usage',
    };
    res.status(500).json(err);
  } else if (
    req.body.secondary.performance.hasOwnProperty('scale') == false ||
    req.body.secondary.performance.hasOwnProperty('value') == false
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert scale and value field(required) inside requested Objects secondary property',
      errorDetail:
        'There exists either no scale or value property inside secondary object for usage',
    };
    res.status(500).json(err);
  } else if (
    req.body.secondary.school == '' ||
    req.body.secondary.board == '' ||
    req.body.secondary.year_of_comp == '' ||
    req.body.secondary.performance.scale == '' ||
    req.body.secondary.performance.value == ''
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert school, board, year_of_comp, scale and value field field(required) inside requested Objects secondary property',
      errorDetail:
        'Either school or board or year_of_comp or performance(scale and value) or all fields are empty or 0 (Insert a specific different school from other secondarys school)',
    };
    res.status(500).json(err);
  } else if (
    typeof req.body.secondary.school != 'string' ||
    typeof req.body.secondary.board != 'string' ||
    typeof req.body.secondary.year_of_comp != 'number' ||
    typeof req.body.secondary.performance.scale != 'string' ||
    typeof req.body.secondary.performance.value != 'number'
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert correct values for property to be stored',
      errorDetail:
        'There exists some incorrect value for some property inside object requested',
    };
    res.status(500).json(err);
  } else {
    secondaryLib.updateSecondaryOfInterviewee(
      req.user._id,
      req.body.secondary,
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

router.put('/', updateSecondaryDetails);

module.exports = router;
