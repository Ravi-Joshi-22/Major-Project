const mongoose = require('mongoose');
const CONSTANTS = require('../../config/constants');

const Schema = mongoose.Schema;
const educationSchema = new Schema(
    {
        secondary: {
            year_of_comp: {
                type: Number,
            },
            board: {
                type: String,
            },
            performance: {
                scale: {
                    type: String,
                    enum: [
                        CONSTANTS.ENUMS.USER.PERFORMANCE_SCALE.PERCENTAGE,
                        CONSTANTS.ENUMS.USER.PERFORMANCE_SCALE.CGPA
                    ],
                    default: CONSTANTS.ENUMS.USER.PERFORMANCE_SCALE.CGPA,
                },
                value: {
                    type: Number,
                },
            },
            school: {
                type: String,
            },
            required: true,
        },
        senior_sec: {
            year_of_comp: {
                type: Number,
            },
            board: {
                type: String,
            },
            performance: {
                scale: {
                    type: String,
                    enum: [
                        CONSTANTS.ENUMS.USER.PERFORMANCE_SCALE.PERCENTAGE,
                        CONSTANTS.ENUMS.USER.PERFORMANCE_SCALE.CGPA
                    ],
                    default: CONSTANTS.ENUMS.USER.PERFORMANCE_SCALE.PERCENTAGE,
                },
                value: {
                    type: Number,
                },
            },
            stream: {
                type: String,
                enum: [
                    CONSTANTS.ENUMS.USER.STREAM_VALUE.SCIENCE,
                    CONSTANTS.ENUMS.USER.STREAM_VALUE.COMMERCE,
                    CONSTANTS.ENUMS.USER.STREAM_VALUE.ARTS,
                ],
            },
            school: {
                type: String,
            }
        },
        after_senior_sec: [
            {
                college: {
                    type: String,
                },
                start_year: {
                    type: Number,
                },
                end_year: {
                    type: Number,
                },
                degree: {
                    type: String,
                },
                stream: {
                    type: String,
                },
                performance: {
                    scale: {
                        type: String,
                        enum: [
                            CONSTANTS.ENUMS.USER.PERFORMANCE_SCALE.PERCENTAGE,
                            CONSTANTS.ENUMS.USER.PERFORMANCE_SCALE.CGPA
                        ],
                        default: CONSTANTS.ENUMS.USER.PERFORMANCE_SCALE.CGPA,
                    },
                    value: {
                        type: Number,
                    },
                },
            },
        ],
    },
    {
        _id: false,
    },
);

module.exports = educationSchema;