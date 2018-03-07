const express = require('express');
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
/**
 * Function to update opening Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function updateOpeningDetails(req, res, next) {
  openingLib.updateOpeningOfCompany(req.user.id, req.body, function(
    errInUpdation,
    updatedInstance
  ) {
    if (errInUpdation) {
      res.status(500).json(errInUpdation);
    } else {
      res.status(200).json(updatedInstance);
    }
  });
}
router.post('/addCredits', addCredits);
router.post('/new', newOpening);
router.put('/', updateOpeningDetails);
module.exports = router;
