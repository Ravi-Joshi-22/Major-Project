const mongoose = require('mongoose');
const CONSTANTS = require('../../../../config/constants');

const Schema = mongoose.Schema;
const afterSeniorSecSchema = new Schema({
  college: {
    type: String,
    required: true,
  },
  start_year: {
    type: Number,
    required: true,
  },
  end_year: {
    type: Number,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  stream: {
    type: String,
    required: true,
  },
  performance: {
    scale: {
      type: String,
      enum: [
        CONSTANTS.ENUMS.USER.PERFORMANCE_SCALE.PERCENTAGE,
        CONSTANTS.ENUMS.USER.PERFORMANCE_SCALE.CGPA,
      ],
      default: CONSTANTS.ENUMS.USER.PERFORMANCE_SCALE.CGPA,
    },
    value: {
      type: Number,
      required: true,
    },
  },
});

module.exports = afterSeniorSecSchema;
