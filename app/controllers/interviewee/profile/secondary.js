const express = require('express');
const secondaryLib = require('../../../../lib/interviewee/profile/secondary');

const router = express.Router();

/**
 * Function to update Secondary Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function updateSecondaryDetails(req, res, next) {
  secondaryLib.updateSecondaryOfInterviewee(
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

router.put('/', updateSecondaryDetails);

module.exports = router;
