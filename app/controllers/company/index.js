const express = require('express');
const testRoutes = require('./test');
const openingRoutes = require('./opening');
const CONSTANTS = require('../../../config/constants');

const router = express.Router();
function authenticator(req, res, next) {
  if (
    req.user &&
    (req.user.role === CONSTANTS.USER_ROLES.COMPANY_HEAD ||
      req.user.role === CONSTANTS.USER_ROLES.COMPANY_USER)
  ) {
    next();
  } else {
    res.status(403).json({
      type: CONSTANTS.ERROR_TYPES.AUTHENTICATION_ERROR,
      msg: 'Unauthorised',
      errorDetail: 'This user does not have access.',
    });
  }
}

router.use(authenticator);
router.use('/opening', openingRoutes);
module.exports = router;
