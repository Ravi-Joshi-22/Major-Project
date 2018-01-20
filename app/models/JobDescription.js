const mongoose = require('mongoose');
const CONSTANTS = require('../../config/constants');

const Schema = mongoose.Schema;
const jobDescriptionSchema = new Schema(
    {
        profile: {
            type: String,
            required: true,
        },
        organization: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        start_date: {
            type: String,
            required: true,
        },
        currently_working: {
            type: Boolean,
        },
        end_date: {
            type: String,
            required: function () {
                return (!(this.currently_working == true));
            },
            default: Date.now(),
        },
        description: {
            type: String,
            maxlength: 200,
        },
    },
    {
        _id: false,
    }
);

module.exports = jobDescriptionSchema;