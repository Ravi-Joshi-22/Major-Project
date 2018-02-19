const express = require('express');
const appIntervieweeLib = require('../../../lib/app/interviewee');

const router = express.Router();

/**
 * Function for registering interviewee
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function registerNewInterviewee(req, res, next) {
  appIntervieweeLib.newInterviewee(
    req.body.user,
    req.body.before_senior_sec,
    req.body.after_senior_sec,
    req.body.jobs,
    req.body.internships,
    req.body.skills,
    req.body.courses,
    req.body.certifications,
    req.body.tests,
    req.body.projects,
    req.body.additionals,
    req.body.totalExp,
    function(errInRegistration, registeredInstance) {
      if (errInRegistration) {
        res.status(500).json(errInRegistration);
      } else {
        res.status(200).json(registeredInstance);
      }
    }
  );
}

const userHelper = require('../../helpers/user');
function getTotalExperience(req, res, next) {
  userHelper.getTotalExperience(req.user._id, function(
    errInFetching,
    fetchedInstance
  ) {
    if (errInFetching) {
      res.status(500).json(errInFetching);
    } else {
      res.status(200).json(fetchedInstance);
    }
  });
}

/**
 * Function to update Secondary Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function updateSecondaryDetails(req, res, next) {
  appIntervieweeLib.updateSecondaryOfInterviewee(
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
  appIntervieweeLib.updateDegreeOfInterviewee(
    req.user._id,
    req.body.degree,
    function(errInUpdation, updatedInstance) {
      if (errInUpdation) {
        res.status(500).json(errInUpdation);
      } else {
        res.status(200).json(updatedInstance);
      }
    }
  );
}

router.post('/', registerNewInterviewee);
router.get('/details', getTotalExperience);
router.post('/updateSecondaryDetails', updateSecondaryDetails);
router.post('/updateDegreeDetails', updateDegreeDetails);

module.exports = router;
