const express = require('express');
const projectLib = require('../../../../lib/interviewee/profile/project');
const CONSTANTS = require('../../../../config/constants');

const router = express.Router();

/**
 * Function to add new Project Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function addProjectDetails(req, res, next) {
  if (req.body.hasOwnProperty('project') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert projects details for project data inside object of project property',
      errorDetail: 'There exists no project property for usage',
    };
    res.status(500).json(err);
  } else if (
    req.body.project.hasOwnProperty('title') == false ||
    req.body.project.hasOwnProperty('description') == false
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert a title and description field(required) inside requested Objects project property',
      errorDetail:
        'There exists no title or description or both property inside project object for usage',
    };
    res.status(500).json(err);
  } else if (
    req.body.project.title == '' ||
    req.body.project.description == ''
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert a title and description field(required) inside requested Objects project property',
      errorDetail:
        'The title or description or both fields are empty (Insert a specific different title from other projects title and a brief specific description of your project)',
    };
    res.status(500).json(err);
  } else if (
    typeof req.body.project.description != 'string' ||
    typeof req.body.project.title != 'string'
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert correct values for property to be stored',
      errorDetail:
        'There exists some incorrect value for some property inside object requested',
    };
    res.status(500).json(err);
  } else {
    projectLib.addProjectOfInterviewee(req.user._id, req.body.project, function(
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
 * Function to update Project Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function updateProjectDetails(req, res, next) {
  if (req.body.hasOwnProperty('project') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert projects details for project data inside object of project property',
      errorDetail: 'There exists no project property for usage',
    };
    res.status(500).json(err);
  } else if (req.body.project.hasOwnProperty('_id') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert _id property inside requested Objects project property to update details of a project',
      errorDetail:
        'There exists no _id property inside project object for usage',
    };
    res.status(500).json(err);
  } else if (req.body.project._id === '') {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert _id property inside project to update any stored data',
      errorDetail:
        '_id property is empty and doesnot contain any ObjectId string with a type as STRING',
    };
    res.status(500).json(err);
  } else if (
    req.body.project.hasOwnProperty('title') == false ||
    req.body.project.hasOwnProperty('description') == false
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert a title and description field(required) inside requested Objects project property',
      errorDetail:
        'There exists no title or description or both property inside project object for usage',
    };
    res.status(500).json(err);
  } else if (
    req.body.project.title == '' ||
    req.body.project.description == ''
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert a title and description field(required) inside requested Objects project property',
      errorDetail:
        'The title ot description or both fields are empty (Insert a specific different title from other projects title and a brief specific description of your project)',
    };
    res.status(500).json(err);
  } else if (
    typeof req.body.project.description != 'string' ||
    typeof req.body.project.title != 'string'
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert correct values for property to be stored',
      errorDetail:
        'There exists some incorrect value for some property inside object requested',
    };
    res.status(500).json(err);
  } else {
    projectLib.updateProjectOfInterviewee(
      req.user._id,
      req.body.project,
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
 * Function to delete existing Project Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function deleteProjectDetails(req, res, next) {
  if (req.body.hasOwnProperty('project') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert _id detail inside object of project property',
      errorDetail: 'There exists no project property for usage',
    };
    res.status(500).json(err);
  } else if (req.body.project.hasOwnProperty('_id') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert _id property inside requested Objects project property to delete details of a project',
      errorDetail:
        'There exists no _id property inside project object for usage',
    };
    res.status(500).json(err);
  } else if (req.body.project._id === '') {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert _id property inside project to delete any stored data',
      errorDetail:
        '_id property is empty and doesnot contain any ObjectId string with a type as STRING',
    };
    res.status(500).json(err);
  } else {
    projectLib.deleteProjectOfInterviewee(
      req.user._id,
      req.body.project._id,
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

router.post('/', addProjectDetails);
router.put('/', updateProjectDetails);
router.delete('/', deleteProjectDetails);

module.exports = router;
