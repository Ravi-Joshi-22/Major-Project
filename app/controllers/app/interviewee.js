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

router.post('/', registerNewInterviewee);
router.get('/details', getTotalExperience);

module.exports = router;
