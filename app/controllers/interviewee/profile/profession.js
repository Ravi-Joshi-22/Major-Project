const express = require('express');
const professionLib = require('../../../../lib/interviewee/profile/profession');
const CONSTANTS = require('../../../../config/constants');

const router = express.Router();

/**
 * Function to add new Profession Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function addProfessionDetails(req, res, next) {
  const profession = Object.keys(req.body)[0];
  if (req.body.hasOwnProperty(profession) == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        "Insert jobs or internships details for job's or internship's data inside object of job or internship property",
      errorDetail: 'There exists no job or internship property for usage',
    };
    res.status(500).json(err);
  } else if (
    req.body[profession].hasOwnProperty('organization') == false ||
    req.body[profession].hasOwnProperty('start_date') == false ||
    req.body[profession].hasOwnProperty('currently_working') == false ||
    req.body[profession].hasOwnProperty('profile') == false
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert organization, profile, start_date and currently_working fields(required) inside requested Objects ' +
        profession +
        ' property',
      errorDetail:
        'There exists no property either organization or profile or start_date or currently_working or all inside ' +
        profession +
        ' object for usage',
    };
    res.status(500).json(err);
  } else if (
    req.body[profession].profile === '' ||
    req.body[profession].organization === '' ||
    req.body[profession].start_date === '' ||
    req.body[profession].currently_working === ''
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert organization, profile, start_date and currently_working fields(required) inside requested Objects ' +
        profession +
        ' property',
      errorDetail:
        'any of organization or profile or start_date or currently_working or all fields are empty or 0',
    };
    res.status(500).json(err);
  } else if (
    typeof req.body[profession].profile != 'string' ||
    typeof req.body[profession].organization != 'string' ||
    typeof req.body[profession].start_date != 'string' ||
    typeof req.body[profession].currently_working != 'string'
  ) {
    console.log(typeof req.body[profession].currently_working);
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert correct values for property to be stored',
      errorDetail:
        'There exists some incorrect value for some property inside object requested',
    };
    res.status(500).json(err);
  } else {
    professionLib.addProfessionOfInterviewee(
      req.user._id,
      req.body[profession],
      profession,
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
 * Function to update existing Profession Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function updateProfessionDetails(req, res, next) {
  const profession = Object.keys(req.body)[0];
  if (req.body.hasOwnProperty(profession) == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        "Insert jobs or internships details for job's or internship's data inside object of job or internship property",
      errorDetail: 'There exists no job or internship property for usage',
    };
    res.status(500).json(err);
  } else if (req.body[profession].hasOwnProperty('_id') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert _id property inside requested Objects ' +
        profession +
        ' property to update details of a ' +
        profession +
        '',
      errorDetail:
        'There exists no _id property inside ' +
        profession +
        ' object for usage',
    };
    res.status(500).json(err);
  } else if (req.body[profession]._id === '') {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert _id property inside ' +
        profession +
        ' to update any stored data',
      errorDetail:
        '_id property is empty and doesnot contain any ObjectId string with a type as STRING',
    };
    res.status(500).json(err);
  } else if (
    req.body[profession].hasOwnProperty('organization') == false ||
    req.body[profession].hasOwnProperty('start_date') == false ||
    req.body[profession].hasOwnProperty('currently_working') == false ||
    req.body[profession].hasOwnProperty('profile') == false
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert organization, profile, start_date and currently_working fields(required) inside requested Objects ' +
        profession +
        ' property',
      errorDetail:
        'There exists no property either organization or profile or start_date or currently_working or all inside ' +
        profession +
        ' object for usage',
    };
    res.status(500).json(err);
  } else if (
    req.body[profession].profile === '' ||
    req.body[profession].organization === '' ||
    req.body[profession].start_date === '' ||
    req.body[profession].currently_working === ''
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert organization, profile, start_date and currently_working fields(required) inside requested Objects ' +
        profession +
        ' property',
      errorDetail:
        'any of organization or profile or start_date or currently_working or all fields are empty or 0',
    };
    res.status(500).json(err);
  } else if (
    typeof req.body[profession].profile != 'string' ||
    typeof req.body[profession].organization != 'string' ||
    typeof req.body[profession].start_date != 'string' ||
    typeof req.body[profession].currently_working != 'string'
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert correct values for property to be stored',
      errorDetail:
        'There exists some incorrect value for some property inside object requested',
    };
    res.status(500).json(err);
  } else {
    professionLib.updateProfessionOfInterviewee(
      req.user._id,
      req.body[profession],
      profession,
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
 * Function to delete existing Profession Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function deleteProfessionDetails(req, res, next) {
  const profession = Object.keys(req.body)[0];
  if (req.body.hasOwnProperty(profession) == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        "Insert jobs or internships details for job's or internship's data inside object of job or internship property",
      errorDetail: 'There exists no job or internship property for usage',
    };
    res.status(500).json(err);
  } else if (req.body[profession].hasOwnProperty('_id') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert _id property inside requested Objects ' +
        profession +
        ' property to update details of a ' +
        profession +
        '',
      errorDetail:
        'There exists no _id property inside ' +
        profession +
        ' object for usage',
    };
    res.status(500).json(err);
  } else if (req.body[profession]._id === '') {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert _id property inside ' +
        profession +
        ' to update any stored data',
      errorDetail:
        '_id property is empty and doesnot contain any ObjectId string with a type as STRING',
    };
    res.status(500).json(err);
  } else {
    professionLib.deleteProfessionOfInterviewee(
      req.user._id,
      req.body[profession]._id,
      profession,
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

router.post('/', addProfessionDetails);
router.put('/', updateProfessionDetails);
router.delete('/', deleteProfessionDetails);
module.exports = router;
