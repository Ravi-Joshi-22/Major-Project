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

/**
 * Function to retrieve all non-applied eligible openings
 * @param  {Object}   req  Request Object
 * @param  {Object}   res  Response Object
 * @param  {Function} next Function to pass control to the next middleware
 */
function eligibleOpenings(req, res, next) {
  openingLib.eligibleOpenings(req.user._id, function(err, fetchedOpenings) {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.status(200).json(fetchedOpenings);
  });
}

/**
 * Function to fetch all applied upcoming openings
 * @param  {Object}   req  Request Object
 * @param  {Object}   res  Response Object
 * @param  {Function} next Function to pass control to the next middleware
 */
function upcomingAppliedOpenings(req, res, next) {
  openingLib.upcomingAppliedOpenings(req.user._id, function(
    err,
    fetchedAppliedOpenings
  ) {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.status(200).json(fetchedAppliedOpenings);
  });
}

/**
 * Function to fetch all applied openings which are to be given today
 * @param  {Object}   req  Request Object
 * @param  {Object}   res  Response Object
 * @param  {Function} next Function to pass control to the next middleware
 */
function currentAppliedOpenings(req, res, next) {
  openingLib.currentAppliedOpenings(req.user._id, function(
    err,
    fetchedAppliedOpenings
  ) {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.status(200).json(fetchedAppliedOpenings);
  });
}

router.post('/apply', applyForOpening);
router.get('/eligible', eligibleOpenings);
router.get('/upcomingApplied', upcomingAppliedOpenings);
router.get('/currentApplied', currentAppliedOpenings);
module.exports = router;
