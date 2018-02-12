const express = require('express');
const openingRoutes = require('./opening');
const customRoutes = require('./custom');
const CONSTANTS = require('../../../config/constants');

const router = express.Router();
function authenticator(req, res, next) {
  if (
    req.user &&
    (req.user.role === CONSTANTS.USER_ROLES.COMPANY_HEAD ||
      req.user.role === CONSTANTS.USER_ROLES.COMPANY_USER) &&
    req.user.verification_status ===
      CONSTANTS.ENUMS.USER.VERIFICATION_STATUS.OTP_VERIFIED
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
router.use('/custom', customRoutes);
module.exports = router;
