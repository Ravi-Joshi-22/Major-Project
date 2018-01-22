const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const certificationSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        authority: {
            type: String,
            required: true,
        },
        lic_number: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
);

module.exports = certificationSchema;