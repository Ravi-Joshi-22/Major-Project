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

router.post('/updateSecondaryDetails', updateSecondaryDetails);
router.post('/updateDegreeDetails', updateDegreeDetails);

module.exports = router;
