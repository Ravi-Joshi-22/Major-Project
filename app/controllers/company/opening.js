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

function deleteOpening(req, res, next) {
  const opening = req.query.openingId;
  openingLib.deleteOpeningOfCompany(req.user, opening, function(
    err,
    fetchedInstance
  ) {
    if (err) {
      res.status(500).json(err);
      return;
    } else {
      res.status(200).json(fetchedInstance);
    }
  });
}
/**
 * get all  openings
 * @param  {Object}   req  Request Object
 * @param  {Object}   res  Response Object
 * @param  {Function} next Function to pass control to the next middleware
 */

function getAllOpening(req, res, next) {
  openingLib.getAllOpeningsOfCompany(req.user, function(err, fetchedInstance) {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.status(200).json(fetchedInstance);
  });
}

/**
 * get result of all candidates applied in an opening after opening is closed
 * @param  {Object}   req  Request Object
 * @param  {Object}   res  Response Object
 * @param  {Function} next Function to pass control to the next middleware
 */
function getResult(req, res, next) {
  openingLib.getResult(req.user._id, req.query.openingId, function(
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
 * get hired and rejected candidates list and send mails to all applied candidates as per their interview status
 * @param  {Object}   req  Request Object
 * @param  {Object}   res  Response Object
 * @param  {Function} next Function to pass control to the next middleware
 */
function hiringCount(req, res, next) {
  openingLib.hiringCount(
    req.user._id,
    req.body.openingId,
    req.body.count,
    function(err, fetchedInstance) {
      if (err) {
        res.status(500).json(err);
        return;
      }
      res.status(200).json(fetchedInstance);
    }
  );
}

/**
 * Function to close opening based on changing end_date of opening
 * @param  {Object}   req  Request Object
 * @param  {Object}   res  Response Object
 * @param  {Function} next Function to pass control to the next middleware
 */
function closeHiring(req, res, next) {
  openingLib.closeHiring(req.query.openingId, req.user._id, function(
    err,
    updationResponse
  ) {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.status(200).json(updationResponse);
  });
}

router.post('/addCredits', addCredits);
router.post('/new', newOpening);
router.put('/', updateOpeningDetails);
router.delete('/', deleteOpening);
router.get('/', getAllOpening);
router.get('/result', getResult);
router.post('/hire', hiringCount);
router.put('/close', closeHiring);
module.exports = router;
