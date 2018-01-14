const Models = require('../models');
const CONSTANTS = require('../../config/constants');

const User = Models.User;

/**
 * This function is used to create new user
 * @param {Object} userData object having user detail
 * @param {Function} callback having two parameters first being error and second being saved user
 */

function registerUser(userData, callback) {
  const newUser = new User({
    first_name: userData.fName,
    last_name: userData.lName,
    phone: userData.phone,
    email: userData.email,
    password: userData.password,
    role: userData.role,
  });

  newUser.save(function(savedUserError, savedUser) {
    if (savedUserError) {
      callback({
        type: CONSTANTS.ERROR_TYPES.DB_ERROR,
        msg: 'Unable to create user account',
        errorDetail: JSON.stringify(savedUserError),
      });
    } else {
      callback(null, savedUser);
    }
  });
}

/**
 * Function get user details by ID
 * @param {objectId} userId user objectId
 * @param {Function} callback function two param err and fetched user
 */
function fetchUser(userId, callback) {
  User.findById(userId).exec(function(err, user) {
    if (err) {
      callback({
        type: CONSTANTS.ERROR_TYPES.DB_ERROR,
        msg: 'Unable to get user details',
        errorDetail: JSON.stringify(err),
      });
    } else {
      callback(null, user);
    }
  });
}
module.exports = {
  registerUser: registerUser,
  fetchUser: fetchUser,
};
