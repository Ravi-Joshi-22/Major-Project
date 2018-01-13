const mongoose = require('mongoose');
const CONSTANTS = require('../../config/constants');

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      unique: true,
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [
        CONSTANTS.USER_ROLES.ADMIN,
        CONSTANTS.USER_ROLES.COMPANY_HEAD,
        CONSTANTS.USER_ROLES.COMPANY_USER,
        CONSTANTS.USER_ROLES.INTERVIEWEE,
      ],
      default: CONSTANTS.USER_ROLES.INTERVIEWEE,
    },
    verification_status: {
      type: String,
      enum: [
        CONSTANTS.ENUMS.USER.VERIFICATION_STATUS.IN_PROCESS,
        CONSTANTS.ENUMS.USER.VERIFICATION_STATUS.EMAIL_VERIFIED,
        CONSTANTS.ENUMS.USER.VERIFICATION_STATUS.OTP_VERIFIED,
      ],
      default: CONSTANTS.ENUMS.USER.VERIFICATION_STATUS.IN_PROCESS,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = userSchema;
