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
 * Function to fetch all applied openings which are to be given today
 * @param  {Object}   req  Request Object
 * @param  {Object}   res  Response Object
 * @param  {Function} next Function to pass control to the next middleware
 */
function appliedOpenings(req, res, next) {
  openingLib.appliedOpenings(req.user._id, function(
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
 * Function to fetch result of interviewee for a particular opening which is closed
 * @param  {Object}   req  Request Object
 * @param  {Object}   res  Response Object
 * @param  {Function} next Function to pass control to the next middleware
 */
function getResult(req, res, next) {
  openingLib.getResult(req.query.openingId, req.user._id, function(
    err,
    fetchedOpening
  ) {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.status(200).json(fetchedOpening);
  });
}

router.post('/apply', applyForOpening);
router.get('/eligible', eligibleOpenings);
router.get('/applied', appliedOpenings);
router.get('/result', getResult);
module.exports = router;
