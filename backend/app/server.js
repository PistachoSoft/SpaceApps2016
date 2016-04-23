var express  = require('express');      // Route management framework
var parser   = require('body-parser');  // Parser for requests' body
var mongoose = require('mongoose');     // MongoDB driver for node
var morgan   = require('morgan');       // Log requests

//Internal dependencies
var routes = require('./router');
var config = require('../config');


/* SERVER CONFIG */

var app  = express();
var port = process.env.PORT || config.port || 3000;

/* Middleware setup (ORDER DOES MATTER) */
// Log incoming requests
app.use(morgan('dev'));
// Middleware to decode request parameteres
app.use(parser.json());
app.use(parser.urlencoded({'extended': 'false'}));
app.use(parser.json({ type: 'application/vnd.api+json' }));
//Enable Cross Origin Requests (only for the API)
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
// Last, add the routes to the application
app.use('/', routes);


/* START AND SHUTDOWN FUNCTIONS */

var server;

function start(cb) {
  mongoose.connect(config.database.uri);
  server = app.listen(port, function() {
    if (cb) cb();
  });
}

function close(cb) {
  mongoose.connection.close(function() {
    server.close(function() {
      if (cb) cb();
    });
  });
}

module.exports = {
  start: start,
  close: close
};
