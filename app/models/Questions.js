const mongoose = require('mongoose');
const CONSTANTS = require('../../config/constants');

const Schema = mongoose.Schema;
const questionsSchema = new Schema(
    {
        question: {
            type: String,
            required: true,
        },
        answer: {
            type: String,
            required: true,
        },
        tags: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = questionsSchema;