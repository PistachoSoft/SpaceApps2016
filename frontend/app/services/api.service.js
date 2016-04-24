angular.module('ProjectBarataria').service('apiService', [
  '$http', 'api',
  function($http, api) {
    return {
      getFilterDates: function() {
        return $http.get(api.host + api.rest.filterDates).then(function(response) {
          return response.data;
        });
      },
      getFilterCountries: function() {
        return $http.get(api.host + api.rest.filterCountries).then(function(response) {
          return response.data;
        });
      },
      getFilterEvents: function() {
        return $http.get(api.host + api.rest.filterEvents).then(function(response) {
          return response.data;
        });
      },
      // Get total number of disasters for each year in the interval
      getDisastersPerYear: function(startYear, endYear, country, disasters) {
        return $http.get(api.host + api.rest.disastersPerYear, {
          params: {
            from: startYear,
            to: endYear,
            countries: country,
            disasters: disasters
          }
        });
      },
      // Get the total percentage of events of each type for the whole interval
      getPercentageGlobal: function(startYear, endYear, country, disasters) {
        return $http.get(api.host + api.rest.globalPercentages, {
          from: startYear,
          to: endYear,
          countries: country,
          disasters: disasters
        });
      },
      // Get the percentage of events of each type for each year in the interval
      getDissastersPercentagePerYear: function(startYear, endYear, country, disasters) {
        return $http.get(api.host + api.rest.perYearPercentages, {
          from: startYear,
          to: endYear,
          countries: country,
          disasters: disasters
        });
      },
      // Get the count of events of each type for each year in the interval
      getDisastersEvolution: function(startYear, endYear, country, disasters) {
        return $http.get(api.host + api.rest.disastersEvolution, {
          from: startYear,
          to: endYear,
          countries: country,
          disasters: disasters
        });
      }
    };
  }
]);
