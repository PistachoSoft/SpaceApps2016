var mongoose = require('mongoose');

// DEFINE SCHEMA
var statsDBSchema = mongoose.Schema({
  year : { type: String},
  disasterType : { type: String},
  iso : { type: String},
  countryName : { type: String},
  occurrence : { type: String},
  totalDeaths : { type: String},
  affected : { type: String},
  injured : { type: String},
  homeless : { type: String},
  totalAffected : { type: String},
  totalDamage : { type: String}
});

var statsDB = mongoose.model('statsDB', statsDBSchema);

module.exports = {
  add: function (stats, callback) {
    var statsToADD = new statsDB(stats);
    statsToADD.save(function (err) {
      callback(err, statsToADD);
    });
  },
  findAll: function(callback){
    statsDB.find({},{_id:0, __v:0}, function(err, res){
      callback(err,res)
    });
  },
  getCountryList : function (callback)
  {
    var items = statsDB.find().distinct('countryName');
    //items.select('countryName');
    items.exec( function(err,res){
      callback(err,res);
    })

  },
  getDisasterList : function (callback)
  {
    var items = statsDB.find().distinct('disasterType');
    //items.select('countryName');
    items.exec( function(err,res){
      callback(err,res);
    })
  },
  getDisasterFromQuery : function (dateFrom, dateTo, country, callback)
  {
    if(dateFrom.length == 0)
      dateFrom = 1900;
    if(dateTo.length == 0)
      dateTo = 2016

    var data = {year :  { $gt: dateFrom, $lt: dateTo }};

    var items = statsDB.find(data);
    items.exec( function(err,res){
      callback(err,res);
    })
  }




}
