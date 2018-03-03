const express = require('express');
const degreeLib = require('../../../../lib/interviewee/profile/degree');

const router = express.Router();

/**
 * Function to add new Degree Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function addDegreeDetails(req, res, next) {
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

/**
 * Function to update Degree Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function updateDegreeDetails(req, res, next) {
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

/**
 * Function to delete Degree Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function deleteDegreeDetails(req, res, next) {
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

router.post('/', addDegreeDetails);
router.put('/', updateDegreeDetails);
router.delete('/', deleteDegreeDetails);

module.exports = router;
