const express = require('express');
const additionalLib = require('../../../../lib/interviewee/profile/additional');

const router = express.Router();

/**
 * Function to add new Additional Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function addAdditionalDetails(req, res, next) {
  additionalLib.addAdditionalOfInterviewee(
    req.user._id,
    req.body.additional,
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
 * Function to update Additional Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function updateAdditionalDetails(req, res, next) {
  additionalLib.updateAdditionalOfInterviewee(
    req.user._id,
    req.body.additional,
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
 * Function to delete existing Additional Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function deleteAdditionalDetails(req, res, next) {
  additionalLib.deleteAdditionalOfInterviewee(
    req.user._id,
    req.body.additional._id,
    function(errInUpdation, updatedInstance) {
      if (errInUpdation) {
        res.status(500).json(errInUpdation);
      } else {
        res.status(200).json(updatedInstance);
      }
    }
  );
}

router.post('/add', addAdditionalDetails);
router.post('/update', updateAdditionalDetails);
router.delete('/delete', deleteAdditionalDetails);

module.exports = router;
