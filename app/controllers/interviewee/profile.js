const express = require('express');
const profileLib = require('../../../lib/interviewee/profile');

const router = express.Router();

/**
 * Function to update Secondary Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function updateSecondaryDetails(req, res, next) {
  profileLib.updateSecondaryOfInterviewee(
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

/**
 * Function to update Senior Secondary Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function updateSeniorSecondaryDetails(req, res, next) {
  profileLib.updateSeniorSecondaryOfInterviewee(
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

/**
 * Function to delete Senior Secondary Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function deleteSeniorSecondaryDetails(req, res, next) {
  profileLib.deleteSeniorSecondaryOfInterviewee(req.user._id, function(
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

/**
 * Function to add new Degree Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function newDegreeDetails(req, res, next) {
  profileLib.newDegreeOfInterviewee(req.user._id, req.body.degree, function(
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

/**
 * Function to update Degree Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function updateDegreeDetails(req, res, next) {
  profileLib.updateDegreeOfInterviewee(req.user._id, req.body.degree, function(
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

/**
 * Function to delete Degree Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function deleteDegreeDetails(req, res, next) {
  profileLib.deleteDegreeOfInterviewee(req.user._id, req.body._id, function(
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

router.post('/updateSecondaryDetails', updateSecondaryDetails);
router.post('/updateSeniorSecondaryDetails', updateSeniorSecondaryDetails);
router.delete('/deleteSeniorSecondaryDetails', deleteSeniorSecondaryDetails);
router.post('/newDegreeDetails', newDegreeDetails);
router.post('/updateDegreeDetails', updateDegreeDetails);
router.delete('/deleteDegreeDetails', deleteDegreeDetails);

module.exports = router;
