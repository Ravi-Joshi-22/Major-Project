const mongoose = require('mongoose');
const CONSTANTS = require('../../config/constants');

const Schema = mongoose.Schema;
const intervieweeSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        educations: {
            secondary: {
                year_of_completion: {
                    type: Number,
                    required: true,
                },
                board: {
                    type: String,
                    required: true,
                },
                performance: {
                    scale: {
                        type: String,
                        enum: [
                            CONSTANTS.ENUMS.USER.PERFORMANCE_SCALE.PERCENTAGE,
                            CONSTANTS.ENUMS.USER.PERFORMANCE_SCALE.CGPA,
                        ],
                        default: CONSTANTS.ENUMS.USER.PERFORMANCE_SCALE.CGPA,
                    },
                    value: {
                        type: Number,
                        required: true,
                    },
                },
                school: {
                    type: String,
                    required: true,
                },
            },
        },
        internships: [
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
                }
            },
        ],
    },
    {
        timestamps: true,
    },
);