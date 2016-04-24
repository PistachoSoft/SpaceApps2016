var express = require('express');
var request = require('request');
var routes = express.Router();
var config = require('../config');
var parser = require('./csvParser');
var db = require('../model/statsDB');
// API entry point
routes.get('/', function(req, res) {
  res.json({message: 'Welcome to the coolest API this side of the Mississippi!'});
});

routes.route('/parseCsv')
  .get(function (req,res) {
    parser.addDataToDB(function (callback) {
      res.json(callback);
    })
  })

routes.route('/find')
  .get(function (req,res)
  {
    db.findAll(function(err,result){

      res.send(result);
    });
  })

routes.route('/findCountry')
  .get(function (req,res)
  {
    db.getCountryList(function (err,result) {

      res.send(result)
    })
  })

routes.route('/findDisaster')
  .get(function (req,res)
  {
    db.getDisasterList(function (err,result){
      res.send(result);
    })
  })

routes.route('/disasters-per-year')
  .get(function (req,res)
  {
    var startYear = req.query.startYear;
    var endYear = req.query.endYear;
    var country = req.query.country;

    db.getDisasterFromQuery(startYear,endYear,country, function(err,result) {
      if(!err)
        res.json(result);
      else
        res.send(err);
    })
  })

module.exports = routes;
