const express = require('express');
const seniorSecondaryLib = require('../../../../lib/interviewee/profile/seniorSecondary');

const router = express.Router();

/**
 * Function to update Senior Secondary Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function updateSeniorSecondaryDetails(req, res, next) {
  seniorSecondaryLib.updateSeniorSecondaryOfInterviewee(
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
  seniorSecondaryLib.deleteSeniorSecondaryOfInterviewee(req.user._id, function(
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

router.put('/', updateSeniorSecondaryDetails);
router.delete('/', deleteSeniorSecondaryDetails);

module.exports = router;
