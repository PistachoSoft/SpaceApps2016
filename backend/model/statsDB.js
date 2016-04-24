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
      callback(err,res.sort());
    })

  },
  getDisasterList : function (callback)
  {
    var items = statsDB.find().distinct('disasterType');
    //items.select('countryName');
    items.exec( function(err,res){
      callback(err,res.sort());
    })
  },
  getDisasterPerYear : function (dateFrom, dateTo, country, callback)
  {
    if(dateFrom.length == 0) {
      dateFrom = 1900;
    }
    if(dateTo.length == 0) {
      dateTo = 2016
    }
    var jsonRes = [];
    var countries;
    if(country!=null && country.length!=0){
      countries = country.split(";");
    }
    else{
      countries = [];
    }

    var optionJson;
    var promises = [];
    for (var i = dateFrom; i<dateTo;i++) {
      (function(year) {
        promises.push(new Promise(function (resolve, reject) {

          if(countries.length>0)
          {
            optionJson = {year: year,countryName: { $in:countries} };
          }
          else {
            optionJson = {year: year}
          }
          statsDB.count(optionJson, function (err, res) {
            if (!err) {
              jsonRes.push({
                year: year,
                ocurrences: res
              });

              resolve();
            } else {
              reject(err);
            }
          });
        }));
      }(i));
    }
    Promise.all(promises).then(function() {
      callback(false,jsonRes);
    });
  },

  getDisasterEvolution : function (dateFrom, dateTo, country, callback)
  {
    if(dateFrom.length == 0) {
      dateFrom = 1900;
    }
    if(dateTo.length == 0) {
      dateTo = 2016
    }
    var jsonRes = [];
    var countries;
    if(country!=null && country.length!=0){
      countries = country.split(";");
    }
    else{
      countries = [];
    }

    var optionJson;
    var eventArr = [
      "Drought",
      "Epidemic",
      "Flood",
      "Storm",
      "Volcanic activity",
      "Earthquake",
      "Mass movement (dry)",
      "Landslide",
      "Wildfire",
      "Insect infestation",
      "Complex Disasters",
      "Extreme temperature ",
      "Impact",
      "Animal accident"
    ];
    
    var promises = [];
    for (var i = dateFrom; i<dateTo;i++) {

      (function (year) {
        var values = [];

        for (var j = 0; j < eventArr.length; j++) {
          (function (event) {
            promises.push(new Promise(function (resolve, reject) {

              if (countries.length > 0) {
                optionJson = {year: year, countryName: {$in: countries}, disasterType: eventArr[event]};
              }
              else {
                optionJson = {year: year, disasterType: eventArr[event]}
              }
              statsDB.count(optionJson, function (err, res) {
                if (!err) {
                  values.push({
                    event: eventArr[event],
                    ocurrences: res
                  });

                  resolve();
                } else {
                  reject(err);
                }
              });
            }));
          }(j));
        }

        jsonRes.push({
          year: year,
          values: values
        });

      }(i));
    }
    Promise.all(promises).then(function() {
      callback(false,jsonRes);
    });
  }





}
