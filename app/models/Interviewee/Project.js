const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const projectSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
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
            default: Date.now(),
        },
        description: {
            type: String,
            required: true,
            maxlength: 400,
        },
        url: {
            type: String,
        },
    },
);

module.exports = projectSchema;