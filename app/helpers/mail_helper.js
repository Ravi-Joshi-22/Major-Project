const nodemailer = require('nodemailer');
const path = require('path');
const jwt = require('jsonwebtoken');
const MODELS = require('../models');
const CONSTANTS = require('../../config/constants');
const KEYS = require('../../config/keys');
const EmailTemplate = require('email-templates').EmailTemplate;
const async = require('async');
const User = MODELS.User;

const activationTemplateDir = path.join(
  __dirname,
  '../../templates',
  'activation'
);
const activation = new EmailTemplate(activationTemplateDir);

const openingTemplateDir = path.join(__dirname, '../../templates', 'opening');
const opening = new EmailTemplate(openingTemplateDir);

/**
 * Send mail using transporter
 * @param {Object} mailOptions //setup email data with unicode symbols
 * @param {Function}  callback The callback
 */
function transporterMail(mailOptions, callback) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: KEYS.MAIL.SERVICE,
    auth: {
      user: KEYS.MAIL.USER,
      pass: KEYS.MAIL.PASS,
    },
  });
  //send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      callback({
        type: CONSTANTS.ERROR_TYPES.SEND_MAIL_ERROR,
        msg:
          'An Error encountered while sending email ,make sure that you are connected to internet',
        errorDetail: String(error),
      });
      return;
    }
    callback(null, {
      status: 'mail Sent!',
      messageid: info.messageId,
      messageResponse: info.response,
    });
  });
}

/**
 * Sends an activation mail to seller.
 * @param {Object} recipientObject The receipent and url object.
 *        {
 *          url:  <String>,
 *         firstName:<String>,
 *        }
 * @param {Function}  callback The callback
 */
function sendVerificationMail(recipientObject, callback) {
  /**
   * Render Function of email-templates library .
   * renders html  ,text , subject also style as well.
   */

  activation.render(recipientObject, function(err, result) {
    if (err) {
      callback(err);
      return;
    }
    //setup email data with unicode symbols
    const mailOptions = {
      from: `"SmartHyre" <${KEYS.MAIL.USER}>`, // sender address
      to: recipientObject.email, // list of receivers
      subject: result.subject, // Subject line
      html: result.html, //rendered text goes here
    };
    transporterMail(mailOptions, function(errorInSending, sentMail) {
      callback(errorInSending, sentMail);
    });
  });
}

/**
 * Sends an activation mail to seller.
 * @param {Object} recipientObject The receipent and url object.
 *        {
 *          url:  <String>,
 *         firstName:<String>,
 *        }
 * @param {Function}  callback The callback
 */
function sendOpeningMail(recipientObject, callback) {
  /**
   * Render Function of email-templates library .
   * renders html  ,text , subject also style as well.
   */

  opening.render(recipientObject, function(err, result) {
    if (err) {
      callback(err);
      return;
    }
    //setup email data with unicode symbols
    const mailOptions = {
      from: `"SmartHyre" <${KEYS.MAIL.USER}>`, // sender address
      to: recipientObject.email, // list of receivers
      subject: result.subject, // Subject line
      html: result.html, //rendered text goes here
    };
    transporterMail(mailOptions, function(errorInSending, sentMail) {
      callback(errorInSending, sentMail);
    });
  });
}

/**
 * Function to decode JWT TOKEN
 * @param {token} jwtToken  token
 * @param {function} callback  Error and decoded user
 */
function _decodeJwt(jwtToken, callback) {
  jwt.verify(jwtToken, KEYS.SECRET.JWT_SECRET, function(err, decoded) {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        callback({
          type: CONSTANTS.ERROR_TYPES.JWT_ERROR,
          msg: 'Token has Expired ,Request for a new password reset link.',
          errorDetail: err,
        });
      } else {
        callback({
          type: CONSTANTS.ERROR_TYPES.JWT_ERROR,
          msg: 'Invalid token, Request for a new password reset link.',
          errorDetail: err,
        });
      }
    } else if (!decoded.userId) {
      callback({
        type: CONSTANTS.ERROR_TYPES.JWT_ERROR,
        msg: 'Invalid link, Request for a new password reset link.',
        errorDetail: 'UserId could not be located in the token',
      });
    } else {
      callback(null, decoded.userId);
    }
  });
}

/**
 * function to update user verification status
 * @param {objectId} userId user mongoDb Id
 * @param {Function} callback error and updated user
 */
function updateEmailVerifiactionStatus(userId, callback) {
  User.findById(userId).exec(function(errInFind, fetchUser) {
    if (errInFind) {
      callback({
        type: CONSTANTS.ERROR_TYPES.DB_ERROR,
        msg: 'Unable to get user details, please enter valid userID',
        errorDetail: JSON.stringify(errInFind),
      });
    } else {
      fetchUser.verification_status =
        CONSTANTS.ENUMS.USER.VERIFICATION_STATUS.EMAIL_VERIFIED;
      fetchUser.save(function(errInSave, savedUser) {
        if (errInSave) {
          callback({
            type: CONSTANTS.ERROR_TYPES.DB_ERROR,
            msg: 'Unable to save user details',
            errorDetail: JSON.stringify(errInSave),
          });
        } else {
          callback(null, savedUser);
        }
      });
    }
  });
}
/**
 * Function to verify email
 * @param {Token} jwtToken jwt token
 * @param {Function} callback having error and updated user
 */
function emailVerifier(jwtToken, callback) {
  async.waterfall(
    [
      function(waterfallCallback) {
        _decodeJwt(jwtToken, function(errInDecode, userId) {
          waterfallCallback(errInDecode, userId);
        });
      },
      function(userId, waterfallCallback) {
        updateEmailVerifiactionStatus(userId, function(
          errInUpdate,
          updatedUser
        ) {
          waterfallCallback(errInUpdate, updatedUser);
        });
      },
    ],
    function(err, user) {
      callback(err, user);
    }
  );
}

module.exports = {
  sendVerificationMail: sendVerificationMail,
  emailVerifier: emailVerifier,
  sendOpeningMail: sendOpeningMail,
};
