const mongoose = require('mongoose');
const CONSTANTS = require('../../config/constants');

const Schema = mongoose.Schema;
const jobOpeningSchema = new Schema(
    {
        company_id: {
            type: Schema.Types.ObjectId,
            ref: 'Company',
        },
        position: {
            type: String,
            required: true,
        },
        responsibilities: [
            {
                type: String,
            }
        ],
        skills: [
            {
                type: String,
                required: true,
            },
        ],
        qualifications: [
            {
                type: String,
            }
        ],
        experience_min: {
            type: Number,
            required: true,
            default: 0,
        },
        experience_max: {
            type: Number,
        },
        location: {
            type: String,
            required: true,
        },
        salary: {
            type: Number,
            required: true,
        },
        start_date: {
            type: Date,
            required: true,
        },
        end_date: {
            type: Date,
            required: true,
        },
        interviewees: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        timestamps: true,
    },
);

module.exports = jobOpeningSchema;