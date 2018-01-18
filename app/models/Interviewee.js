const mongoose = require('mongoose');
const CONSTANTS = require('../../config/constants');
const educationSchema = require('./Education');
const jobDescriptionSchema = require('./JobDescription');

const Schema = mongoose.Schema;
const intervieweeSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        educations: educationSchema,
        jobs: [
            {
                jobDescriptionSchema,
            },
        ],
        internships: [
            {
                jobDescriptionSchema,
            },
        ],
        skills: [
            {
                name: {
                    type: String,
                },
                rate: {
                    type: String,
                    enum: [
                        CONSTANTS.ENUMS.USER.SKILLS_RATE.BEGINNER,
                        CONSTANTS.ENUMS.USER.SKILLS_RATE.INTERMEDIATE,
                        CONSTANTS.ENUMS.USER.SKILLS_RATE.ADVANCED,
                    ],
                    default: CONSTANTS.ENUMS.USER.SKILLS_RATE.BEGINNER,
                },
            },
        ],
        courses: [
            {
                name: {
                    type: String,
                },
                number: {
                    type: String,
                },
                description: {
                    type: String,
                    maxlength: 150,
                },
            },
        ],
        certifications: [
            {
                name: {
                    type: String,
                },
                authority: {
                    type: String,
                },
                lic_number: {
                    type: String,
                },
                url: {
                    type: String,
                },
            },
        ],
        tests: [
            {
                name: {
                    type: String,
                },
                score: {
                    type: String,
                },
                date: {
                    type: String,
                },
            },
        ],
        projects: [
            {
                title: {
                    type: String,
                },
                start_date: {
                    type: String,
                },
                currently_working: {
                    type: Boolean,
                },
                end_date: {
                    type: String,
                    required: function () {
                        return (!(this.currently_working == true));
                    },
                    default: CONSTANTS.CURRENT_DAY,
                },
                description: {
                    type: String,
                    maxlength: 250,
                },
                url: {
                    type: String,
                },
            },
        ],
        additionals: [
            {
                description: {
                    type: String,
                    maxlenght: 250,
                },
            },
        ],
    },
    {
        timestamps: true,
    },
);

module.exports = intervieweeSchema;