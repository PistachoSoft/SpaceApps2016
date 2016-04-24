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
      }
    };
  }
]);
