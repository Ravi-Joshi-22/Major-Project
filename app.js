const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const db_connect = require('./lib/db_connect')();
const keys = require('./config/keys');
const routes = require('./app/controllers');

const app = express();

app.use(
  morgan(
    '{"api_method": ":method", "api_url": ":url", "api_status": ":status",  " "api_response_time": ":response-time"}'
  )
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/smarthyre/api/v1', routes);

module.exports = app;
