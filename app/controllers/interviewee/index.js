const express = require('express');
const openingRoutes = require('./opening');
const profileRoutes = require('./profile');
const interviewRoutes = require('./interview');
const CONSTANTS = require('../../../config/constants');

const router = express.Router();
function authenticator(req, res, next) {
  if (req.user && req.user.role === CONSTANTS.USER_ROLES.INTERVIEWEE) {
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
router.use('/profile', profileRoutes);
router.use('/interview', interviewRoutes);
module.exports = router;
