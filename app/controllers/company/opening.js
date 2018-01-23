const express = require('express');
const passport = require('passport');
const openingLib = require('../../../lib/company/opening');

const router = express.Router();
/**
 * verify email
 * @param  {Object}   req  Request Object
 * @param  {Object}   res  Response Object
 * @param  {Function} next Function to pass control to the next middleware
 */

function addCredits(req, res, next) {
  openingLib.addCreditsToCompany(req.user, req.body.id, function(
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
 * create new opening
 * @param  {Object}   req  Request Object
 * @param  {Object}   res  Response Object
 * @param  {Function} next Function to pass control to the next middleware
 */

function newOpening(req, res, next) {
  openingLib.createNewOpening(req.user, req.body, function(
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

router.post('/addCredits', addCredits);
router.post('/new', newOpening);
module.exports = router;
