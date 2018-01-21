const mongoose = require('mongoose');
const CONSTANTS = require('../../../../config/constants');

const Schema = mongoose.Schema;
const afterSeniorSecSchema = new Schema(
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
);

module.exports = afterSeniorSecSchema;