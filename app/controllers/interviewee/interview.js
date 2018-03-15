const express = require('express');
const interviewLib = require('../../../lib/interviewee/interview');

const router = express.Router();
/**
 * start the test
 * @param  {Object}   req  Request Object
 * @param  {Object}   res  Response Object
 * @param  {Function} next Function to pass control to the next middleware
 */

function startTheInterview(req, res, next) {
  interviewLib.startTest(req.user._id, req.query.openingTrackId, function(
    err,
    fetchedInstance
  ) {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.status(200).json(fetchedInstance);
  });
}

router.get('/start', startTheInterview);
module.exports = router;
