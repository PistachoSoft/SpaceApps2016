var express = require('express');

var routes = express.Router();

// API entry point
routes.get('/', function(req, res) {
    res.json({message: "Welcome to the coolest API this side of the Mississippi!"});
});


module.exports = routes;
