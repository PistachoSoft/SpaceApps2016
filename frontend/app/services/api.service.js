angular.module('ProjectBarataria').service('apiService', [
  '$http',
  function($http) {

    var STATS_SERVICE_URI = 'http://192.168.0.31:3000';

    return {
      // Get total number of disasters for each year in the interval
      getDisastersPerYear: function(startYear, endYear, country) {
        return $http.get(STATS_SERVICE_URI + '/disasters-per-year', {
          from: startYear,
          to: endYear,
          country: country
        });
      },
      // Get the total percentage of events of each type for the whole interval
      getDisastersPercentageGlobal: function(startYear, endYear, country) {
        return $http.get(STATS_SERVICE_URI + '/disasters-percentage-global', {
          from: startYear,
          to: endYear,
          country: country
        });
      },
      // Get the percentage of events of each type for each year in the interval
      getDissastersPercentagePerYear: function(startYear, endYear, country) {
        return $http.get(STATS_SERVICE_URI + '/disasters-percentage-by-year', {
          from: startYear,
          to: endYear,
          country: country
        });
      },
      // Get the count of events of each type for each year in the interval
      getDisastersEvolution: function(startYear, endYear, country) {
        return $http.get(STATS_SERVICE_URI + '/disasters-evolution', {
          from: startYear,
          to: endYear,
          country: country
        });
      },
      // Get all the available options to filter by country
      getFilterCountries: function() {
        return $http.get(STATS_SERVICE_URI + '/filter/countries');
      },
      // Get all the available options to filter by event
      getFilterEvents: function() {
        return $http.get(STATS_SERVICE_URI + '/filter/events');
      },
      // Get all the available options to filter by date
      getFilterDates: function() {
        return $http.get(STATS_SERVICE_URI + '/filter/dates');
      }


    };

  }
]);
