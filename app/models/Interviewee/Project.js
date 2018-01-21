const mongoose = require('mongoose');
const CONSTANTS = require('../../../config/constants');

const Schema = mongoose.Schema;
const projectSchema = new Schema(
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
            /**    required: function () {
                    return (!(this.currently_working == true));
                },*/
            default: CONSTANTS.CURRENT_DAY,
        },
        description: {
            type: String,
            maxlength: 400,
        },
        url: {
            type: String,
        },
    },
    {
        _id: true,
    },
);

module.exports = projectSchema;