const express = require('express');
const customLib = require('../../../lib/company/custom');

const router = express.Router();
/**
 * get dashboard details
 * @param  {Object}   req  Request Object
 * @param  {Object}   res  Response Object
 * @param  {Function} next Function to pass control to the next middleware
 */

function getDashboard(req, res, next) {
  customLib.getDashboardDetails(req.user._id, function(
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

router.get('/dashboard', getDashboard);
module.exports = router;
