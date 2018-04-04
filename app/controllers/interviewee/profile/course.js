const express = require('express');
const courseLib = require('../../../../lib/interviewee/profile/course');
const CONSTANTS = require('../../../../config/constants');

const router = express.Router();

/**
 * Function to add new Course Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function addCourseDetails(req, res, next) {
  if (req.body.hasOwnProperty('course') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert courses details for courses data inside object of course property',
      errorDetail: 'There exists no course property for usage',
    };
    res.status(500).json(err);
  } else if (req.body.course.hasOwnProperty('name') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert a name field(required) inside requested Objects course property',
      errorDetail:
        'There exists no name property inside course object for usage',
    };
    res.status(500).json(err);
  } else if (req.body.course.name === '') {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert a name field(required) inside requested Objects course property',
      errorDetail:
        'The name field is empty (Insert a specific different name from other courses name)',
    };
    res.status(500).json(err);
  } else if (typeof req.body.course.name !== 'string') {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert correct values for property to be stored',
      errorDetail:
        'There exists some incorrect value for some property inside object requested',
    };
    res.status(500).json(err);
  } else {
    courseLib.addCourseOfInterviewee(req.user._id, req.body.course, function(
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
 * Function to update Course Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function updateCourseDetails(req, res, next) {
  if (req.body.hasOwnProperty('course') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert courses details for courses data inside object of course property',
      errorDetail: 'There exists no course property for usage',
    };
    res.status(500).json(err);
  } else if (req.body.course.hasOwnProperty('_id') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert _id property inside requested Objects course property to update details of a course',
      errorDetail:
        'There exists no _id property inside course object for usage',
    };
    res.status(500).json(err);
  } else if (req.body.course._id === '') {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert _id property inside course to update any stored data',
      errorDetail:
        '_id property is empty and doesnot contain any ObjectId string with a type as STRING',
    };
    res.status(500).json(err);
  } else if (req.body.course.hasOwnProperty('name') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert a name field(required) inside requested Objects course property',
      errorDetail:
        'There exists no name property inside course object for usage',
    };
    res.status(500).json(err);
  } else if (req.body.course.name === '') {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert a name field(required) inside requested Objects course property',
      errorDetail:
        'The name field is empty (Insert a specific different name from other courses name)',
    };
    res.status(500).json(err);
  } else if (typeof req.body.course.name !== 'string') {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert correct values for property to be stored',
      errorDetail:
        'There exists some incorrect value for some property inside object requested',
    };
    res.status(500).json(err);
  } else {
    courseLib.updateCourseOfInterviewee(req.user._id, req.body.course, function(
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
 * Function to delete existing Course Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function deleteCourseDetails(req, res, next) {
  if (req.body.hasOwnProperty('course') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert _id detail inside object of course property',
      errorDetail: 'There exists no course property for usage',
    };
    res.status(500).json(err);
  } else if (req.body.course.hasOwnProperty('_id') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert _id property inside requested Objects course property to delete details of a course',
      errorDetail:
        'There exists no _id property inside course object for usage',
    };
    res.status(500).json(err);
  } else if (req.body.course._id === '') {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert _id property inside course to delete any stored data',
      errorDetail:
        '_id property is empty and doesnot contain any ObjectId string with a type as STRING',
    };
    res.status(500).json(err);
  } else {
    courseLib.deleteCourseOfInterviewee(
      req.user._id,
      req.body.course._id,
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

router.post('/', addCourseDetails);
router.put('/', updateCourseDetails);
router.delete('/', deleteCourseDetails);

module.exports = router;
