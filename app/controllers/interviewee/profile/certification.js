const express = require('express');
const certificationLib = require('../../../../lib/interviewee/profile/certification');
const CONSTANTS = require('../../../../config/constants');

const router = express.Router();

/**
 * Function to add new Certification Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function addCertificationDetails(req, res, next) {
  if (req.body.hasOwnProperty('certification') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert certifications details for certifications data inside object of certification property',
      errorDetail: 'There exists no certification property for usage',
    };
    res.status(500).json(err);
  } else if (
    req.body.certification.hasOwnProperty('name') == false ||
    req.body.certification.hasOwnProperty('authority') == false
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert name and authority field(required) inside requested Objects certification property',
      errorDetail:
        'There exists no property either name or authority or both inside certification object for usage',
    };
    res.status(500).json(err);
  } else if (
    req.body.certification.name === '' ||
    req.body.certification.authority === ''
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert name and authority field(required) inside requested Objects certification property',
      errorDetail: 'name or authority or both fields are empty',
    };
    res.status(500).json(err);
  } else if (
    typeof req.body.certification.name != 'string' ||
    typeof req.body.certification.authority != 'string'
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert correct values for property to be stored',
      errorDetail:
        'There exists some incorrect value for some property inside object requested',
    };
    res.status(500).json(err);
  } else {
    certificationLib.addCertificationOfInterviewee(
      req.user._id,
      req.body.certification,
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
 * Function to update Certification Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function updateCertificationDetails(req, res, next) {
  if (req.body.hasOwnProperty('certification') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert certifications details for certifications data inside object of certification property',
      errorDetail: 'There exists no certification property for usage',
    };
    res.status(500).json(err);
  } else if (req.body.certification.hasOwnProperty('_id') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert _id property inside requested Objects certification property to update details of a certification',
      errorDetail:
        'There exists no _id property inside certification object for usage',
    };
    res.status(500).json(err);
  } else if (req.body.certification._id === '') {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert _id property inside certification to update any stored data',
      errorDetail:
        '_id property is empty and doesnot contain any ObjectId string with a type as STRING',
    };
    res.status(500).json(err);
  } else if (
    req.body.certification.hasOwnProperty('name') == false ||
    req.body.certification.hasOwnProperty('authority') == false
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert name and authority field(required) inside requested Objects certification property',
      errorDetail:
        'There exists no property either name or authority or both inside certification object for usage',
    };
    res.status(500).json(err);
  } else if (
    req.body.certification.name === '' ||
    req.body.certification.authority === ''
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert name and authority field(required) inside requested Objects certification property',
      errorDetail: 'name or authority or both fields are empty',
    };
    res.status(500).json(err);
  } else if (
    typeof req.body.certification.name != 'string' ||
    typeof req.body.certification.authority != 'string'
  ) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert correct values for property to be stored',
      errorDetail:
        'There exists some incorrect value for some property inside object requested',
    };
    res.status(500).json(err);
  } else {
    certificationLib.updateCertificationOfInterviewee(
      req.user._id,
      req.body.certification,
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
 * Function to delete existing Certification Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function deleteCertificationDetails(req, res, next) {
  if (req.body.hasOwnProperty('certification') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert certifications details for certifications data inside object of certification property',
      errorDetail: 'There exists no certification property for usage',
    };
    res.status(500).json(err);
  } else if (req.body.certification.hasOwnProperty('_id') == false) {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg:
        'Insert _id property inside requested Objects certification property to update details of a certification',
      errorDetail:
        'There exists no _id property inside certification object for usage',
    };
    res.status(500).json(err);
  } else if (req.body.certification._id === '') {
    let err = {
      type: CONSTANTS.ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'Insert _id property inside certification to delete any stored data',
      errorDetail:
        '_id property is empty and doesnot contain any ObjectId string with a type as STRING',
    };
    res.status(500).json(err);
  } else {
    certificationLib.deleteCertificationOfInterviewee(
      req.user._id,
      req.body.certification._id,
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

router.post('/', addCertificationDetails);
router.put('/', updateCertificationDetails);
router.delete('/', deleteCertificationDetails);

module.exports = router;
