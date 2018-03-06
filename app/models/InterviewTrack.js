const mongoose = require('mongoose');
const interviewAnsScema = require('./intervieweeAns');
const CONSTANTS = require('../../config/constants');

const Schema = mongoose.Schema;
const interviewTrackSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    interview_status: {
      type: String,
      enum: [
        CONSTANTS.ENUMS.USER.INTERVIEW_STATUS.APPLIED,
        CONSTANTS.ENUMS.USER.INTERVIEW_STATUS.GIVEN,
        CONSTANTS.ENUMS.USER.INTERVIEW_STATUS.SELECTED,
        CONSTANTS.ENUMS.USER.INTERVIEW_STATUS.REJECTED,
      ],
    },
    score: {
      type: Number,
      default: 0,
    },
    questions: [
      {
        type: interviewAnsScema,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = interviewTrackSchema;
