const mongoose = require('mongoose');
const CONSTANTS = require('../../../config/constants');

const Schema = mongoose.Schema;
const certificationSchema = new Schema(
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
);

module.exports = certificationSchema;