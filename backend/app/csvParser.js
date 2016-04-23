var statsDB = require('../model/statsDB');
var parse = require('csv-parse');
var allAllToDB = function (callback)
{

  var csv ='1900,Drought,CPV,"Cabo Verde",1,11000,,,,,';
  parse(csv, function(err,output){
    if(!err)
    {
      output.map(createDBJson);
      callback("Data added");
    }
    else
      callback("Error adding all csv data");
  });

}

function addItem (statToAdd, callback)
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
  allAllToDB :allAllToDB
}
