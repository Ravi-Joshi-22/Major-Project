const mongoose = require('mongoose');
const CONSTANTS = require('../../config/constants');
const educationSchema = require('./Education');
const jobDescriptionSchema = require('./JobDescription');
const certificationSchema = require('./Certification');
const projectSchema = require('./Project')

const Schema = mongoose.Schema;
const intervieweeSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        educations: educationSchema,
        jobs: [
            jobDescriptionSchema,
        ],
        internships: [
            jobDescriptionSchema,
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
            certificationSchema,
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
            projectSchema,
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