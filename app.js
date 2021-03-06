const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const passport = require('passport');
const db_connect = require('./lib/db_connect')();
const keys = require('./config/keys');
require('./app/helpers/passport');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  morgan(
    '{"api_method": ":method", "api_url": ":url", "api_status": ":status",  " "api_response_time": ":response-time"}'
  )
);
const routes = require('./app/controllers');

app.use('/smarthyre/api/v1', routes);

if (process.env.NODE_ENV === 'production') {
  //Express will serve up production assesst
  //like our main.js file and main.css file
  app.use(express.static('client/build'));
  //Express will serve index.html
  //if dont finds the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = app;
