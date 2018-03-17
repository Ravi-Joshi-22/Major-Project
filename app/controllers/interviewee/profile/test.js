const express = require('express');
const testLib = require('../../../../lib/interviewee/profile/test');
const CONSTANTS = require('../../../../config/constants');

const router = express.Router();

/**
 * Function to add new Test Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function addTestDetails(req, res, next) {
  if (req.body.hasOwnProperty('test') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert tests details for tests data inside object of test property',
      errorDetail: 'There exists no test property for usage',
    };
    res.status(500).json(err);
  } else if (
    req.body.test.hasOwnProperty('name') == false ||
    req.body.test.hasOwnProperty('score') == false
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert name and score field(required) inside requested Objects test property',
      errorDetail:
        'There exists no property either name or score or both inside test object for usage',
    };
    res.status(500).json(err);
  } else if (req.body.test.name === '' || req.body.test.score === '') {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert name and score field(required) inside requested Objects test property',
      errorDetail: 'name or score or both fields are empty',
    };
    res.status(500).json(err);
  } else if (
    typeof req.body.test.name != 'string' ||
    typeof req.body.test.score != 'string'
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert correct values for property to be stored',
      errorDetail:
        'There exists some incorrect value for some property inside object requested',
    };
    res.status(500).json(err);
  } else {
    testLib.addTestOfInterviewee(req.user._id, req.body.test, function(
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
 * Function to update Test Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function updateTestDetails(req, res, next) {
  if (req.body.hasOwnProperty('test') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert tests details for tests data inside object of test property',
      errorDetail: 'There exists no test property for usage',
    };
    res.status(500).json(err);
  } else if (req.body.test.hasOwnProperty('_id') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert _id property inside requested Objects test property to update details of a test',
      errorDetail: 'There exists no _id property inside test object for usage',
    };
    res.status(500).json(err);
  } else if (req.body.test._id === '') {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert _id property inside test to update any stored data',
      errorDetail:
        '_id property is empty and doesnot contain any ObjectId string with a type as STRING',
    };
    res.status(500).json(err);
  } else if (
    req.body.test.hasOwnProperty('name') == false ||
    req.body.test.hasOwnProperty('score') == false
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert name and score field(required) inside requested Objects test property',
      errorDetail:
        'There exists no property either name or score or both inside test object for usage',
    };
    res.status(500).json(err);
  } else if (req.body.test.name === '' || req.body.test.score === '') {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert name and score field(required) inside requested Objects test property',
      errorDetail: 'name or score or both fields are empty',
    };
    res.status(500).json(err);
  } else if (
    typeof req.body.test.name != 'string' ||
    typeof req.body.test.score != 'string'
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert correct values for property to be stored',
      errorDetail:
        'There exists some incorrect value for some property inside object requested',
    };
    res.status(500).json(err);
  } else {
    testLib.updateTestOfInterviewee(req.user._id, req.body.test, function(
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
 * Function to delete existing Test Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function deleteTestDetails(req, res, next) {
  if (req.body.hasOwnProperty('test') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert tests details for tests data inside object of test property',
      errorDetail: 'There exists no test property for usage',
    };
    res.status(500).json(err);
  } else if (req.body.test.hasOwnProperty('_id') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert _id property inside requested Objects test property to delete details of a test',
      errorDetail: 'There exists no _id property inside test object for usage',
    };
    res.status(500).json(err);
  } else if (req.body.test._id === '') {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert _id property inside test to delete any stored data',
      errorDetail:
        '_id property is empty and doesnot contain any ObjectId string with a type as STRING',
    };
    res.status(500).json(err);
  } else {
    testLib.deleteTestOfInterviewee(req.user._id, req.body.test._id, function(
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

router.post('/', addTestDetails);
router.put('/', updateTestDetails);
router.delete('/', deleteTestDetails);
module.exports = router;
