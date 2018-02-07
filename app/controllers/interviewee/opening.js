const express = require('express');
const openingLib = require('../../../lib/interviewee/opening');

const router = express.Router();
/**
 * apply for the opening
 * @param  {Object}   req  Request Object
 * @param  {Object}   res  Response Object
 * @param  {Function} next Function to pass control to the next middleware
 */

function applyForOpening(req, res, next) {
  openingLib.applyForOpening(req.body.openingId, req.user._id, function(
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

function getAppliedOpenings(req, res, next) {
  openingLib.getAppliedOpenings(req.user._id, function(err, fetchedInstance) {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.status(200).json(fetchedInstance);
  });
}

router.post('/apply', applyForOpening);
router.get('/applied', getAppliedOpenings);

module.exports = router;
