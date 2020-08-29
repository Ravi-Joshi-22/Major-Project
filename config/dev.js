/**
 * This file contain all the secret keys and code used across the application within
 * development phase
 */

module.exports = {
  MONGO_DB_URI: 'mongodb://localhost:27017/smartHyre',
  //MONGO_DB_URI: 'mongodb://shreya:shreya@ds249718.mlab.com:49718/smarthyre',
  COOKIE_KEY: 'sygfdjsnfjdsffrmtniioscnaqiwi2774',
  MAIL: {
    SERVICE: 'gmail',
    USER: 'smarthyre513@gmail.com',
    PASS: 'majorproject',
  },
  SECRET: {
    JWT_SECRET: 'asdfaiwuerbro27y3482bhjfbai34q2b4irajkshdfiq34t87trbfhbjksd',
    EXPIRE: 3600,
  },
  HOSTNAME: {
    URI: 'http://localhost:2000',
  },
  OTP_AUTH_KEY: '186133AyQXQfeIYD5a1fb8a3',
  stripeSecretKey: 'sk_test_v0xxVD1SH3kmcNHoguuhBLzH',
};
