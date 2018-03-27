const express = require('express');
const skillLib = require('../../../../lib/interviewee/profile/skill');
const CONSTANTS = require('../../../../config/constants');

const router = express.Router();

/**
 * Function to add new Skill Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function addSkillDetails(req, res, next) {
  if (req.body.hasOwnProperty('skill') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert skills details for skills data inside object of skill property',
      errorDetail: 'There exists no skill property for usage',
    };
    res.status(500).json(err);
  } else if (
    req.body.skill.hasOwnProperty('name') == false ||
    req.body.skill.hasOwnProperty('rate') == false
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert a rate and name field(required) inside requested Objects skill property',
      errorDetail:
        'There exists no name or rate or both property inside skill object for usage',
    };
    res.status(500).json(err);
  } else if (req.body.skill.name === '' || req.body.skill.rate === '') {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert a rate and name field(required) inside requested Objects skill property',
      errorDetail:
        'The rate or name or both fields are empty (Insert a specific value for rate from enum having value - Beginner, Intermediate and Advanced)',
    };
    res.status(500).json(err);
  } else if (
    typeof req.body.skill.rate != 'string' ||
    typeof req.body.skill.name != 'string'
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert correct values for property to be stored',
      errorDetail:
        'There exists some incorrect value for some property inside object requested',
    };
    res.status(500).json(err);
  } else {
    skillLib.addSkillOfInterviewee(req.user._id, req.body.skill, function(
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
 * Function to update Skill Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function updateSkillDetails(req, res, next) {
  if (req.body.hasOwnProperty('skill') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert skills details for skills data inside object of skill property',
      errorDetail: 'There exists no skill property for usage',
    };
    res.status(500).json(err);
  } else if (req.body.skill.hasOwnProperty('_id') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert _id property inside requested Objects skill property to update details of a skill',
      errorDetail: 'There exists no _id property inside skill object for usage',
    };
    res.status(500).json(err);
  } else if (req.body.skill._id === '') {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert _id property inside skill to update any stored data',
      errorDetail:
        '_id property is empty and doesnot contain any ObjectId string with a type as STRING',
    };
    res.status(500).json(err);
  } else if (
    req.body.skill.hasOwnProperty('name') == false ||
    req.body.skill.hasOwnProperty('rate') == false
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert a rate and name field(required) inside requested Objects skill property',
      errorDetail:
        'There exists no name or rate or both property inside skill object for usage',
    };
    res.status(500).json(err);
  } else if (req.body.skill.name === '' || req.body.skill.rate === '') {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert a rate and name field(required) inside requested Objects skill property',
      errorDetail:
        'The rate or name  or both fields are empty (Insert a specific value from enum having value - Beginner, Intermediate and Advanced)',
    };
    res.status(500).json(err);
  } else if (
    typeof req.body.skill.rate != 'string' ||
    typeof req.body.skill.name != 'string'
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert correct values for property to be stored',
      errorDetail:
        'There exists some incorrect value for some property inside object requested',
    };
    res.status(500).json(err);
  } else {
    skillLib.updateSkillOfInterviewee(req.user._id, req.body.skill, function(
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
 * Function to delete existing Skill Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function deleteSkillDetails(req, res, next) {
  if (req.body.hasOwnProperty('skill') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert _id detail inside object of skill property',
      errorDetail: 'There exists no skill property for usage',
    };
    res.status(500).json(err);
  } else if (req.body.skill.hasOwnProperty('_id') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert _id property inside requested Objects skill property to delete details of a skill',
      errorDetail: 'There exists no _id property inside skill object for usage',
    };
    res.status(500).json(err);
  } else if (req.body.skill._id === '') {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert _id property inside skill to delete any stored data',
      errorDetail:
        '_id property is empty and doesnot contain any ObjectId string with a type as STRING',
    };
    res.status(500).json(err);
  } else {
    skillLib.deleteSkillOfInterviewee(
      req.user._id,
      req.body.skill._id,
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

router.post('/', addSkillDetails);
router.put('/', updateSkillDetails);
router.delete('/', deleteSkillDetails);

module.exports = router;
