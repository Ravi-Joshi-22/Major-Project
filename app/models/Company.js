const mongoose = require('mongoose');
const CONSTANTS = require('../../config/constants');
const addressSchema = require('./Address');

const Schema = mongoose.Schema;
const companySchema = new Schema(
  {
    company_cin: {
      type: String,
      required: true,
      unique: true,
    },
    company_name: {
      type: String,
      required: true,
      default: '',
    },
    company_phone: {
      type: String,
    },
    company_logo: {
      type: String,
    },
    company_website: {
      type: String,
    },
    company_certificate: {
      type: String,
    },
    verification_status: {
      type: String,
      enum: [
        CONSTANTS.ENUMS.COMPANY.VERIFICATION_STATUS.IN_PROCESS,
        CONSTANTS.ENUMS.COMPANY.VERIFICATION_STATUS.CERTIFICATE_UPLOADED,
        CONSTANTS.ENUMS.COMPANY.VERIFICATION_STATUS.ADMIN_APPROVED,
        CONSTANTS.ENUMS.COMPANY.VERIFICATION_STATUS.ADMIN_DECLINED,
      ],
      default: CONSTANTS.ENUMS.COMPANY.VERIFICATION_STATUS.IN_PROCESS,
    },
    address: addressSchema,
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = companySchema;
