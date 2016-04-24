var statsDB = require('../model/statsDB');
var parse = require('csv-parse');
var csvToArray = require('csv-to-array');
var config = require('../config');

var addDataToDB = function (callback)
{

  var columns =  ["year","disasterType","iso","countryName","occurrence","totalDeaths","affected","injured","homeless","totalAffected","totalDamage"];
  csvToArray({
      file: config.dataCsv,
      columns: columns
    }, function(err,output){
    if(!err)
    {
      output.forEach(addItem)
    }
    else
      callback(err);
  });

}

function addItem (statToAdd)
{
  statsDB.add(statToAdd, function (err,stat) {

  });
}

function createDBJson (jsonList)
{
  var json =
  {
    "year" : jsonList[0],
    "disasterType" : jsonList[1],
    "iso" : jsonList[2],
    "countryName" : jsonList[3],
    "occurrence" : jsonList[4],
    "totalDeaths" : jsonList[5],
    "affected" : jsonList[6],
    "injured" : jsonList[7],
    "homeless" : jsonList[8],
    "totalAffected" : jsonList[9],
    "totalDamage" : jsonList[10]
  };

  return json;
}

module.exports = {
  addDataToDB : addDataToDB
}
