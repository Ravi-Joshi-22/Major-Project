/**
 * This helper is made to generate and verify OTP with the help of `sendotp` library
 * https://github.com/MSG91/sendotp-node
 */

//const speakeasy = require('speakeasy');
const request = require('request');
const async = require('async');
const CONSTANTS = require('../../config/constants');
const KEYS = require('../../config/keys');
const userHelper = require('./user');

/**
 * helper method which makes request to SMS service to send One Time Password to Users
 * @param {object} receiverDetails
 * @param {function} callback
 */

function otpMessageSender(receiverDetails, callback) {
  const otpObject = {
    method: 'POST',
    url: `http://control.msg91.com/api/sendotp.php?authkey=${
      KEYS.OTP_AUTH_KEY
      }&sender=${CONSTANTS.SENDER_ID}&mobile=${
      receiverDetails.phone
      }&otp_expiry=${CONSTANTS.OTP_EXPIRY}`,
    headers: {},
    json: true,
  };

  request(otpObject, function (error, res, body) {
    if (error) {
      callback({
        type: CONSTANTS.ERRORS.OTP_ERROR,
        msg: 'An Error encountered, while sending request.',
        errorDetail: JSON.stringify(error),
      });
    } else if (body.error) {
      callback(body, null);
    } else {
      callback(null, body);
    }
  });
}

/**
 * Verifies the otp message using secret by which the same otp is generated
 * @param {object} otpPayload
 */

function isOtpMessageVerified(otpPayload, callback) {
  const otpObject = {
    method: 'POST',
    url: `https://control.msg91.com/api/verifyRequestOTP.php?authkey=${
      KEYS.OTP_AUTH_KEY
      }&mobile=${otpPayload.phone}&otp=${otpPayload.otp}`,
    headers: {},
    json: true,
  };

  request(otpObject, function (error, res, body) {
    if (error) {
      callback({
        type: CONSTANTS.ERRORS.OTP_ERROR,
        msg: 'An Error encountered, while verifying otp.',
        errorDetail: JSON.stringify(error),
      });
    } else if (body.error) {
      callback(body, null);
    } else {
      callback(null, body);
    }
  });
}

/**
 * Send otp to use by his Id
 * @param {objectId} userId user objectId
 * @param {Function} callback function two param err and fetched user
 */
function sendOtp(userId, callback) {
  async.waterfall(
    [
      function (waterfallcallback) {
        userHelper.fetchUser(userId, function (err, user) {
          waterfallcallback(err, user);
        });
      },

      function (userDetail, waterfallcallback) {
        otpMessageSender(userDetail, function (otpError, sendOtp) {
          waterfallcallback(otpError, sendOtp);
        });
      },
    ],
    function (err, data) {
      callback(err, data);
    }
  );
}

/**
 * Function to verify user OTP
 * @param {Number} otp
 * @param {objectId} userId user objectId
 * @param {Function} callback function two param err and verified user
 */
function verifyOtp(otp, userId, callback) {
  async.waterfall(
    [
      function (waterfallcallback) {
        userHelper.fetchUser(userId, function (userError, userDetail) {
          waterfallcallback(userError, userDetail);
        });
      },

      function (userDetail, waterfallcallback) {
        const otpPayload = {
          phone: userDetail.phone,
          otp: otp,
        };
        isOtpMessageVerified(otpPayload, function (err, verified) {
          waterfallcallback(err, verified, userDetail);
        });
      },

      function (verified, userDetail, waterfallcallback) {
        if (verified.type === CONSTANTS.ENUMS.OTP_RESPONSE_TYPE.SUCCESS) {
          userDetail.verification_status =
            CONSTANTS.ENUMS.USER.VERIFICATION_STATUS.OTP_VERIFIED;
          userDetail.save(function (err, updatedUser) {
            waterfallcallback(err, updatedUser);
          });
        } else {
          const errorobj = {
            type: CONSTANTS.ERRORS.OTP_ERROR,
            msg: 'Please try with valid OTP',
          };
          waterfallcallback(errorobj);
        }
      },
    ],
    function (err, user) {
      callback(err, user);
    }
  );
}
module.exports = {
  sendOtp: sendOtp,
  verifyOtp: verifyOtp,
};
