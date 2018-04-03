const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const certificationSchema = new Schema({
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
  },
  url: {
    type: String,
  },
});

module.exports = certificationSchema;
