
module.exports = {

  getDataFrom : function (dateFrom) {
    if(dateFrom==null || dateFrom.length == 0) {
     return 1900;
    }
    return dateFrom;
  },

  getDataTo : function (dateTo) {
    if(dateTo==null || dateTo.length == 0){
      return 2016;
    }
    return dateTo;
  },

  getOptionsJson : function (year,countries,disasters)
  {
    if(countries.length>0)
    {
      if(disasters.length>0)
      {
        return  {year: year,countryName : { $in:countries}, disasterType : { $in:disasters} };
      }
      else{
        return {year: year,countryName: { $in:countries} };
      }

    }
    else {
      if(disasters.length>0)
      {
        return {year: year, disasterType : { $in:disasters} };
      }
      else{
        return {year: year}
      }

    }
  },

  getEvents : function ()
  {
    return [
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
  },

}
