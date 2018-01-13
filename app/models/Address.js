const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const addressSchema = new Schema(
  {
    address_line: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
      default: 'IN',
    },
    pin: {
      type: String,
      validate: {
        validator: function(v) {
          return /^[1-9][0-9]{5}$/.test(v);
        },
        message: '{VALUE} is not a valid PIN code!',
      },
      required: [true, 'User PIN code required'],
    },
    state: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

module.exports = addressSchema;
