const express = require('express');
const certificationLib = require('../../../../lib/interviewee/profile/certification');

const router = express.Router();

/**
 * Function to add new Certification Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function addCertificationDetails(req, res, next) {
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

/**
 * Function to update Certification Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function updateCertificationDetails(req, res, next) {
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

/**
 * Function to delete existing Certification Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function deleteCertificationDetails(req, res, next) {
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

router.post('/add', addCertificationDetails);
router.post('/update', updateCertificationDetails);
router.delete('/delete', deleteCertificationDetails);

module.exports = router;
