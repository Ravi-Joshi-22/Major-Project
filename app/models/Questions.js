const mongoose = require('mongoose');
const CONSTANTS = require('../../config/constants');

const Schema = mongoose.Schema;
const questionsSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      unique: true,
    },
    answer: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        required: true,
      },
    ],
    topic: {
      type: String,
      enum: [
        CONSTANTS.ENUMS.TOPIC.C,
        CONSTANTS.ENUMS.TOPIC.CPP,
        CONSTANTS.ENUMS.TOPIC.JAVA,
        CONSTANTS.ENUMS.TOPIC.JAVASCIRPT,
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = questionsSchema;
