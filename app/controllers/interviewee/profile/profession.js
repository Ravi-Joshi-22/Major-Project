const express = require('express');
const professionLib = require('../../../../lib/interviewee/profile/profession');

const router = express.Router();

/**
 * Function to add new Profession Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function addProfessionDetails(req, res, next) {
  const profession = Object.keys(req.body)[0];
  professionLib.addProfessionOfInterviewee(
    req.user._id,
    req.body[profession],
    profession + 's',
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
 * Function to update existing Profession Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function updateProfessionDetails(req, res, next) {
  const profession = Object.keys(req.body)[0];
  professionLib.updateProfessionOfInterviewee(
    req.user._id,
    req.body[profession],
    profession + 's',
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
 * Function to delete existing Profession Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function deleteProfessionDetails(req, res, next) {
  const profession = Object.keys(req.body)[0];
  professionLib.deleteProfessionOfInterviewee(
    req.user._id,
    req.body[profession]._id,
    profession + 's',
    function(errInUpdation, updatedInstance) {
      if (errInUpdation) {
        res.status(500).json(errInUpdation);
      } else {
        res.status(200).json(updatedInstance);
      }
    }
  );
}

router.post('/add', addProfessionDetails);
router.post('/update', updateProfessionDetails);
router.delete('/delete', deleteProfessionDetails);
module.exports = router;
