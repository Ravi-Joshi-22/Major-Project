const mongoose = require('mongoose');
const CONSTANTS = require('../../../config/constants');
const beforeSeniorSecSchema = require('./Education/BeforeSeniorSec');
const afterSeniorSecSchema = require('./Education/AfterSeniorSec');
const jobDescriptionSchema = require('./JobDescription');
const certificationSchema = require('./Certification');
const projectSchema = require('./Project');

const Schema = mongoose.Schema;
const intervieweeSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        before_senior_sec: beforeSeniorSecSchema,
        after_senior_sec: [
            afterSeniorSecSchema,
        ],
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
                    maxlength: 250,
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