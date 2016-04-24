var mongoose = require('mongoose');
var functions = require('../app/functions');
var _ = require('lodash');

// DEFINE SCHEMA
var statsDBSchema = mongoose.Schema({
  year: {type: String},
  disasterType: {type: String},
  iso: {type: String},
  countryName: {type: String},
  occurrence: {type: String},
  totalDeaths: {type: String},
  affected: {type: String},
  injured: {type: String},
  homeless: {type: String},
  totalAffected: {type: String},
  totalDamage: {type: String}
});

var statsDB = mongoose.model('statsDB', statsDBSchema);

module.exports = {
  add: function (stats, callback) {
    var statsToADD = new statsDB(stats);
    statsToADD.save(function (err) {
      callback(err, statsToADD);
    });
  },
  findAll: function (callback) {
    statsDB.find({}, {_id: 0, __v: 0}, function (err, res) {
      callback(err, res)
    });
  },
  getCountryList: function (callback) {
    var items = statsDB.find();


    //items.select('countryName');
    items.exec(function (err, res) {
      var result = _.uniqBy(res, 'iso').map(function (item) {
        return {
          iso: item.iso,
          countryName: item.countryName
        };
      });
      callback(err, result);
    })

  },
  getDisasterList: function (callback) {
    var items = statsDB.find().distinct('disasterType');
    //items.select('countryName');
    items.exec(function (err, res) {
      callback(err, res.sort());
    })
  },
  getDisasterPerYear: function (dateFrom, dateTo, country, disaster, callback) {
    var jsonRes = [];
    var countries;
    var disasters;
    if (country != null && country.length != 0) {
      countries = country.split(";");
    }
    else {
      countries = [];
    }

    if (disaster != null && disaster.length != 0) {
      disasters = disaster.split(";");
    }
    else {
      disasters = [];
    }

    var optionJson;
    var promises = [];
    for (var i = functions.getDataFrom(dateFrom); i < functions.getDataTo(dateTo); i++) {
      (function (year) {
        promises.push(new Promise(function (resolve, reject) {


          statsDB.count(functions.getOptionsJson(year, countries, disasters), function (err, res) {
            if (!err) {
              jsonRes.push({
                year: year,
                occurrences: res
              });

              resolve();
            } else {
              reject(err);
            }
          });
        }));
      }(i));
    }
    Promise.all(promises).then(function () {
      callback(false, jsonRes);
    });
  },

  getDisasterEvolution: function (dateFrom, dateTo, country, callback) {
    if (dateFrom.length == 0) {
      dateFrom = 1900;
    }
    if (dateTo.length == 0) {
      dateTo = 2016
    }
    var jsonRes = [];
    var countries;
    if (country != null && country.length != 0) {
      countries = country.split(";");
    }
    else {
      countries = [];
    }

    var optionJson;
    var eventArr = functions.getEvents();
    var promises = [];

    for (var i = dateFrom; i < dateTo; i++) {

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
                    occurrences: res
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
    Promise.all(promises).then(function () {
      callback(false, jsonRes);
    });
  },

  getGlobalPercentage: function (dateFrom, dateTo, country, disaster, callback) {

    var countries;
    var eventArr;
    if (country != null && country.length != 0) {
      countries = country.split(";");
    }
    else {
      countries = [];
    }

    if (disaster != null && disaster.length != 0) {
      eventArr = disaster.split(";");
    }
    else {
      eventArr = functions.getEvents();
    }

    var result = [];
    var eventPromises = [];

    eventArr.forEach(function(e) {

      (function(event) {
        eventPromises.push(new Promise(function(resolve, reject) {
          var promises = [];

          for (var i = functions.getDataFrom(dateFrom); i < functions.getDataTo(dateTo); i++) {
            (function(year) {
              var optionJson;

              if (countries.length) {
                optionJson = {year: year, countryName: {$in: countries}, disasterType: event};
              } else {
                optionJson = {year: year, disasterType: event}
              }

              promises.push(new Promise(function(resolve, reject) {
                statsDB.count(optionJson, function (err, res) {
                  if (!err) {
                    resolve(res);
                  }
                });
              }));
            }(i));
          }

          Promise.all(promises)
          .then(function(results) {
            var sum = results.reduce(function(a, b) {
              return a + b;
            });

            result.push({
              event: event,
              total: sum
            });

            resolve();
          });
        }));
      }(e));
    });

    Promise.all(eventPromises)
    .then(function() {
      callback(false, result);
    });

    // var jsonRes = [
    //   {
    //     disaster: "Drought",
    //     total: 23
    //   },
    //   {
    //     disaster: "Epidemic",
    //     total: 64
    //   },
    //   {
    //     disaster: "Flood",
    //     total: 16
    //   },
    //   {
    //     disaster: "Storm",
    //     total: 58
    //   },
    //   {
    //     disaster: "Volcanic activity",
    //     total: 16
    //   },
    //   {
    //     disaster: "Earthquake",
    //     total: 56
    //   },
    //   {
    //     disaster: "Mass movement (dry)",
    //     total: 43
    //   },
    //   {
    //     disaster: "Landslide",
    //     total: 32
    //   },
    //   {
    //     disaster: "Wildfire",
    //     total: 23
    //   },
    //   {
    //     disaster: "Insect infestation",
    //     total: 10
    //   },
    //   {
    //     disaster: "Complex Disasters",
    //     total: 2
    //   },
    //   {
    //     disaster: "Extreme temperature ",
    //     total: 13
    //   },
    //   {
    //     disaster: "Impact",
    //     total: 10
    //   },
    //   {
    //     disaster: "Animal accident",
    //     total: 1
    //   }
    // ]
  }

}


