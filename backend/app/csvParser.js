var statsDB = require('../model/statsDB');
var parse = require('csv-parse');
var allAllToDB = function (callback)
{

  var csv ='"1","2","3","4"\n"a","b","c","d"';
  parse(csv, function(err,output){
    callback(output[0]);
  });

}

function addItem (statToAdd)
{
  statsDB.add(statToAdd, function (err, res){
    if (!err)
    {
      callback(200);
    }
    else
    {
      callback(500);
    }
  })
}

module.exports = {
  allAllToDB :allAllToDB
}
