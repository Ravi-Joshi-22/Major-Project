const express = require('express');
const testLib = require('../../../../lib/interviewee/profile/test');

const router = express.Router();

/**
 * Function to add new Test Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function addTestDetails(req, res, next) {
  testLib.addTestOfInterviewee(req.user._id, req.body.test, function(
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

/**
 * Function to update Test Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function updateTestDetails(req, res, next) {
  testLib.updateTestOfInterviewee(req.user._id, req.body.test, function(
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

/**
 * Function to delete existing Test Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function deleteTestDetails(req, res, next) {
  testLib.deleteTestOfInterviewee(req.user._id, req.body.test._id, function(
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

router.post('/add', addTestDetails);
router.post('/update', updateTestDetails);
router.delete('/delete', deleteTestDetails);

module.exports = router;
