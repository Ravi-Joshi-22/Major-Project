const express = require('express');
const additionalLib = require('../../../../lib/interviewee/profile/additional');
const CONSTANTS = require('../../../../config/constants');

const router = express.Router();

/**
 * Function to add new Additional Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function addAdditionalDetails(req, res, next) {
  if (req.body.hasOwnProperty('additional') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert description details for additional data inside object of additional property',
      errorDetail: 'There exists no additional property for usage',
    };
    res.status(500).json(err);
  } else if (req.body.additional.hasOwnProperty('description') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert description details for additional data inside object of additional property',
      errorDetail:
        'There exists no description propert inside additional object of requested body',
    };
    res.status(500).json(err);
  } else if (req.body.additional.description == '') {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'The syntax to be used for request is correct. But you need to enter some string to be used in description field',
      errorDetail:
        'The description field is empty (Enter some of your additional achievements and hobbies)',
    };
    res.status(500).json(err);
  } else if (typeof req.body.additional.description != 'string') {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'The syntax to be used for request is correct. But you need to enter some string to be used in description field',
      errorDetail: ' The data entered inside description field is NUMBER',
    };
    res.status(500).json(err);
  } else {
    additionalLib.addAdditionalOfInterviewee(
      req.user._id,
      req.body.additional,
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
 * Function to update Additional Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function updateAdditionalDetails(req, res, next) {
  if (req.body.hasOwnProperty('additional') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert Description details for additional data inside object of additional property',
      errorDetail: 'There exists no additional property for usage',
    };
    res.status(500).json(err);
  } else if (req.body.additional.hasOwnProperty('_id') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert _id property inside additional to update any stored data',
      errorDetail:
        'There exists no _id property inside additional object of requested body',
    };
    res.status(500).json(err);
  } else if (req.body.additional._id === '') {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert _id property inside additional to update any stored data',
      errorDetail:
        '_id property is empty and doesnot contain any ObjectId string with a type as STRING',
    };
    res.status(500).json(err);
  } else if (req.body.additional.hasOwnProperty('description') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert Description details for additional data inside object of additional property',
      errorDetail:
        'There exists no description property inside additional object of requested body',
    };
    res.status(500).json(err);
  } else if (req.body.additional.description == '') {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'The syntax to be used for request is correct. But you need to enter some string to be used in description field',
      errorDetail:
        'The description field is empty (Enter some of your additional achievements and hobbies)',
    };
    res.status(500).json(err);
  } else if (typeof req.body.additional.description != 'string') {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'The syntax to be used for request is correct. But you need to enter some string to be used in description field',
      errorDetail: ' The data entered inside description field is NUMBER',
    };
    res.status(500).json(err);
  } else {
    additionalLib.updateAdditionalOfInterviewee(
      req.user._id,
      req.body.additional,
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
 * Function to delete existing Additional Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function deleteAdditionalDetails(req, res, next) {
  if (req.body.hasOwnProperty('additional') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert _id detail inside object of additional property',
      errorDetail: 'There exists no additional property for usage',
    };
    res.status(500).json(err);
  } else if (req.body.additional.hasOwnProperty('_id') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert _id propert inside additional to delete any stored data',
      errorDetail:
        'There exists no _id propert inside additional object of requested body',
    };
    res.status(500).json(err);
  } else if (req.body.additional._id === '') {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert _id propert inside additional to delete any stored data',
      errorDetail:
        '_id property is empty and doesnot contain any ObjectId string with a type as STRING',
    };
    res.status(500).json(err);
  } else {
    additionalLib.deleteAdditionalOfInterviewee(
      req.user._id,
      req.body.additional._id,
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

router.post('/', addAdditionalDetails);
router.put('/', updateAdditionalDetails);
router.delete('/', deleteAdditionalDetails);

module.exports = router;
