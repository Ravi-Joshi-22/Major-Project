const express = require('express');
const appCompanyLib = require('../../../lib/app/company');

const router = express.Router();

/**
 * Register New company
 * @param  {Object}   req  Request Object
 * @param  {Object}   res  Response Object
 * @param  {Function} next Function to pass control to the next middleware
 */

function registerNewComapny(req, res, next) {
  appCompanyLib.createNewCompany(
    req.body.company,
    req.body.address,
    req.body.user,
    function(errInCreation, createdInstance) {
      if (errInCreation) {
        res.status(500).json(errInCreation);
        return;
      }
      res.status(200).json(createdInstance);
    }
  );
}

/**
 * Relate routes and functions here. Functions are like callback functions and should be defined above.
 */
router.post('/', registerNewComapny);
module.exports = router;
