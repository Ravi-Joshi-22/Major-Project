//This file will figure out what credentials to return
//based on the environment type

if (process.env.NODE_ENV === 'production') {
  //we are in production
  module.exports = require('./prod');
} else {
  //we are in dev
  module.exports = require('./dev');
}
