const express = require('express');
const passport = require('passport');
const mailHelper = require('../../helpers/mail_helper');
const otpHelper = require('../../helpers/otp_helper');

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
      console.log(err);
      res.send('Unable to verify . Request a new verification link' + err);
    } else {
      res.send('Your Email is succesfully verified');
    }
  });
}

/**
 * request OTP
 * @param  {Object}   req  Request Object
 * @param  {Object}   res  Response Object
 * @param  {Function} next Function to pass control to the next middleware
 */
function sendOTP(req, res, next) {
  otpHelper.sendOtp(req.query.id, function(err, fetchedInstance) {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.status(200).json(fetchedInstance);
  });
}

/**
 * request OTP
 * @param  {Object}   req  Request Object
 * @param  {Object}   res  Response Object
 * @param  {Function} next Function to pass control to the next middleware
 */
function verifyOTP(req, res, next) {
  otpHelper.verifyOtp(req.body.otp, req.body.id, function(
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
 * Relate routes and functions here. Functions are like callback functions and should be defined above.
 */
router.post('/login', passport.authenticate('local'), function(req, res) {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(500).json('Email and Password did not matched');
  }
});

router.get('/fetchUser', (req, res) => {
  res.send(req.user);
});

router.get('/verifyEmail', verifyUserEmail);
router.get('/requestOTP', sendOTP);
router.post('/verifyOTP', verifyOTP);
module.exports = router;
