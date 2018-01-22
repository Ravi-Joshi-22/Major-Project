/**
 * This file contain all the secret keys and code used across the application within
 * production phase
 */

module.exports = {
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  COOKIE_KEY: process.env.COOKIE_KEY,
  MAIL: {
    SERVICE: 'gmail',
    USER: process.env.MAIL_USER,
    PASS: process.env.MAIL_PASSWORD,
  },
  SECRET: {
    JWT_SECRET: process.env.JWT_SECRET,
    EXPIRE: process.env.JWT_EXPIRE,
  },
  HOSTNAME: {
    URI: process.env.HOST_URI,
  },
  OTP_AUTH_KEY: process.env.OTP_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
};
