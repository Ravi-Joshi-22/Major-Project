const express = require('express');
const dashboardProfileLib = require('../../../../lib/interviewee/profile/dashboardProfile');

const router = express.Router();

function getFullIntervieweeProfile(req, res, next) {
  dashboardProfileLib.getFullIntervieweeProfile(req.user._id, function(
    errInFetch,
    fetchedData
  ) {
    if (errInFetch) {
      res.status(500).json(errInFetch);
    } else {
      res.status(200).json(fetchedData);
    }
  });
}

router.get('/', getFullIntervieweeProfile);

module.exports = router;
