const express = require('express');
const appIntervieweeLib = require('../../../lib/app/interviewee');

const router = express.Router();

/**
 * 
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
        function (errInRegistration, registeredInstance) {
            if (errInRegistration) {
                res.status(500).json(errInRegistration);
            } else {
                res.status(200).json(registeredInstance);
            }
        }
    );
}

router.post('/', registerNewInterviewee);
module.exports = router;