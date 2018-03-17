const express = require('express');
const degreeLib = require('../../../../lib/interviewee/profile/degree');
const CONSTANTS = require('../../../../config/constants');

const router = express.Router();

/**
 * Function to add new Degree Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function addDegreeDetails(req, res, next) {
  if (req.body.hasOwnProperty('degree') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert degrees details for degrees data inside object of degree property',
      errorDetail: 'There exists no degree property for usage',
    };
    res.status(500).json(err);
  } else if (
    req.body.degree.hasOwnProperty('college') == false ||
    req.body.degree.hasOwnProperty('start_year') == false ||
    req.body.degree.hasOwnProperty('end_year') == false ||
    req.body.degree.hasOwnProperty('degree') == false ||
    req.body.degree.hasOwnProperty('stream') == false ||
    req.body.degree.performance.hasOwnProperty('scale') == false ||
    req.body.degree.performance.hasOwnProperty('value') == false
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert college, start_year, end_year, degree, stream, scale and value fields(required) inside requested Objects degree property',
      errorDetail:
        'There exists no property either college or start_year or end_year or degree or stream or scale or value or all inside degree object for usage',
    };
    res.status(500).json(err);
  } else if (
    req.body.degree.college === '' ||
    req.body.degree.start_year === '' ||
    req.body.degree.end_year === '' ||
    req.body.degree.degree === '' ||
    req.body.degree.stream === '' ||
    req.body.degree.scale === '' ||
    req.body.degree.value === ''
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert college, start_year, end_year, degree, stream, scale and value fields(required) inside requested Objects degree property',
      errorDetail:
        'any of college or start_year or end_year or degree or stream or scale or value fields are empty or 0',
    };
    res.status(500).json(err);
  } else if (
    typeof req.body.degree.college != 'string' ||
    typeof req.body.degree.start_year != 'number' ||
    typeof req.body.degree.end_year != 'number' ||
    typeof req.body.degree.degree != 'string' ||
    typeof req.body.degree.stream != 'string' ||
    typeof req.body.degree.performance.scale != 'string' ||
    typeof req.body.degree.performance.value != 'number'
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert correct values for property to be stored',
      errorDetail:
        'There exists some incorrect value for some property inside object requested',
    };
    res.status(500).json(err);
  } else {
    degreeLib.addDegreeOfInterviewee(req.user._id, req.body.degree, function(
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
}

/**
 * Function to update Degree Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function updateDegreeDetails(req, res, next) {
  if (req.body.hasOwnProperty('degree') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert degrees details for degrees data inside object of degree property',
      errorDetail: 'There exists no degree property for usage',
    };
    res.status(500).json(err);
  } else if (req.body.degree.hasOwnProperty('_id') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert _id property inside requested Objects degree property to update details of a degree',
      errorDetail:
        'There exists no _id property inside degree object for usage',
    };
    res.status(500).json(err);
  } else if (req.body.degree._id === '') {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert _id property inside degree to update any stored data',
      errorDetail:
        '_id property is empty and doesnot contain any ObjectId string with a type as STRING',
    };
    res.status(500).json(err);
  } else if (
    req.body.degree.hasOwnProperty('college') == false ||
    req.body.degree.hasOwnProperty('start_year') == false ||
    req.body.degree.hasOwnProperty('end_year') == false ||
    req.body.degree.hasOwnProperty('degree') == false ||
    req.body.degree.hasOwnProperty('stream') == false ||
    req.body.degree.performance.hasOwnProperty('scale') == false ||
    req.body.degree.performance.hasOwnProperty('value') == false
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert college, start_year, end_year, degree, stream, scale and value fields(required) inside requested Objects degree property',
      errorDetail:
        'There exists no property either college or start_year or end_year or degree or stream or scale or value or all inside degree object for usage',
    };
    res.status(500).json(err);
  } else if (
    req.body.degree.college === '' ||
    req.body.degree.start_year === '' ||
    req.body.degree.end_year === '' ||
    req.body.degree.degree === '' ||
    req.body.degree.stream === '' ||
    req.body.degree.performance.scale === '' ||
    req.body.degree.performance.value === ''
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert college, start_year, end_year, degree, stream, scale and value fields(required) inside requested Objects degree property',
      errorDetail:
        'any of college or start_year or end_year or degree or stream or scale or value fields are empty or 0',
    };
    res.status(500).json(err);
  } else if (
    typeof req.body.degree.college != 'string' ||
    typeof req.body.degree.start_year != 'number' ||
    typeof req.body.degree.end_year != 'number' ||
    typeof req.body.degree.degree != 'string' ||
    typeof req.body.degree.stream != 'string' ||
    typeof req.body.degree.scale != 'string' ||
    typeof req.body.degree.value != 'number'
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert correct values for property to be stored',
      errorDetail:
        'There exists some incorrect value for some property inside object requested',
    };
    res.status(500).json(err);
  } else {
    degreeLib.updateDegreeOfInterviewee(req.user._id, req.body.degree, function(
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
}

/**
 * Function to delete Degree Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function deleteDegreeDetails(req, res, next) {
  if (req.body.hasOwnProperty('degree') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert degrees details for degrees data inside object of degree property',
      errorDetail: 'There exists no degree property for usage',
    };
    res.status(500).json(err);
  } else if (req.body.degree.hasOwnProperty('_id') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert _id property inside requested Objects degree property to delete details of a degree',
      errorDetail:
        'There exists no _id property inside degree object for usage',
    };
    res.status(500).json(err);
  } else if (req.body.degree._id === '') {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert _id property inside degree to delete any stored data',
      errorDetail:
        '_id property is empty and doesnot contain any ObjectId string with a type as STRING',
    };
    res.status(500).json(err);
  } else {
    degreeLib.deleteDegreeOfInterviewee(
      req.user._id,
      req.body.degree._id,
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

router.post('/', addDegreeDetails);
router.put('/', updateDegreeDetails);
router.delete('/', deleteDegreeDetails);

module.exports = router;
