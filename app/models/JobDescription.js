const mongoose = require('mongoose');
const CONSTANTS = require('../../config/constants');

const Schema = mongoose.Schema;
const jobDescriptionSchema = new Schema(
    {
        profile: {
            type: String,
        },
        organization: {
            type: String,
        },
        location: {
            type: String,
        },
        start_date: {
            type: Date,
        },
        end_date: {
            type: Date,
        },
        description: {
            type: String,
        },
    },
    {
        _id: false,
    }
);

module.exports = jobDescriptionSchema;