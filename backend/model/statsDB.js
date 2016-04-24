var mongoose = require('mongoose');

// DEFINE SCHEMA
var statsDBschema = mongoose.Schema({
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

var statsDB = mongoose.model('statsDB', statsDBschema);

module.exports = {
  add: function (stats, callback) {
    var statsToADD = new statsDB(stats);
    statsToADD.save(function (err) {
      callback(err, statsToADD);
    });
  },
  findAll: function(callback){
    statsDB.find({}, function(err, res){
      callback(err,res)
    });
  }




}
