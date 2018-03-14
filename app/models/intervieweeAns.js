const mongoose = require('mongoose');
const CONSTANTS = require('../../config/constants');

const Schema = mongoose.Schema;
const interviewAnsSchema = new Schema({
  question_id: {
    type: Schema.Types.ObjectId,
    ref: 'Questions',
  },
  answer: {
    type: String,
  },
  tags: [
    {
      type: String,
    },
  ],
  score: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = interviewAnsSchema;
