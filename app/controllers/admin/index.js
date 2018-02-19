const express = require('express');
const questionRoutes = require('./questions');
const CONSTANTS = require('../../../config/constants');

const router = express.Router();
function authenticator(req, res, next) {
  if (req.user && req.user.role === CONSTANTS.USER_ROLES.ADMIN) {
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
router.use('/question', questionRoutes);
module.exports = router;
