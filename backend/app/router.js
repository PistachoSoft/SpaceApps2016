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

routes.route('/filterCountries')
  .get(function (req,res)
  {
    db.getCountryList(function (err,result) {

      res.json(result)
    })
  })

routes.route('/filterEvents')
  .get(function (req,res)
  {
    db.getDisasterList(function (err,result){
      res.json(result);
    })
  })

routes.route('/filterDates')
  .get(function (req,res) {
    var json =
    {
      min : "1900",
      max : "2016"
    }
    res.json(json);
  })


routes.route('/disasters-per-year')
  .get(function (req,res)
  {
    var from = req.query.from;
    var to = req.query.to;
    var countries = req.query.countries;

    db.getDisasterFromQuery(from,to,countries, function(err,result) {
      if(!err)
        res.json(result);
      else
        res.send(err);
    })

  })

routes.route('disasters-percentage-global')
  .get (function (req,res) {

  })

routes.route('disasters-evolution')
  .get (function (req,res){

  })


module.exports = routes;
