const express = require('express');
const passport = require('passport');
const mailHelper = require('../../helpers/mail_helper');

const router = express.Router();

/**
 * verify email
 * @param  {Object}   req  Request Object
 * @param  {Object}   res  Response Object
 * @param  {Function} next Function to pass control to the next middleware
 */

function verifyUserEmail(req, res, next) {
  const jwtToken = req.query.token;
  mailHelper.emailVerifier(jwtToken, function(err, verified) {
    if (err) {
      res.send('Unable to verify . Request a new verification link');
    } else {
      res.send('Your Email is succesfully verified');
    }
  });
}
/**
 * Relate routes and functions here. Functions are like callback functions and should be defined above.
 */
router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    res.status(200).json({ status: 'Successfully Logged In' });
  }
);

router.get('/verify/email', verifyUserEmail);

module.exports = router;
