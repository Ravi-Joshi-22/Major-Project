const mongoose = require('mongoose');
const CONSTANTS = require('../../../../config/constants');

const Schema = mongoose.Schema;
const beforeSeniorSecSchema = new Schema(
  {
    secondary: {
      year_of_comp: {
        type: Number,
        required: true,
      },
      board: {
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
      school: {
        type: String,
        required: true,
      },
    },
    senior_sec: {
      year_of_comp: {
        type: Number,
      },
      board: {
        type: String,
      },
      performance: {
        scale: {
          type: String,
          enum: [
            CONSTANTS.ENUMS.USER.PERFORMANCE_SCALE.PERCENTAGE,
            CONSTANTS.ENUMS.USER.PERFORMANCE_SCALE.CGPA,
          ],
          default: CONSTANTS.ENUMS.USER.PERFORMANCE_SCALE.PERCENTAGE,
        },
        value: {
          type: Number,
        },
      },
      stream: {
        type: String,
        enum: [
          CONSTANTS.ENUMS.USER.STREAM_VALUE.SCIENCE,
          CONSTANTS.ENUMS.USER.STREAM_VALUE.COMMERCE,
          CONSTANTS.ENUMS.USER.STREAM_VALUE.ARTS,
        ],
      },
      school: {
        type: String,
      },
    },
  },
  {
    _id: false,
  }
);

module.exports = beforeSeniorSecSchema;
