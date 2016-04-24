angular.module('ProjectBarataria').service('apiService', [
  '$http', '$q',
  function($http, $q) {
    return {
      getFilterDates: function() {
        return $q.resolve({
          max: 100,
          min: 10
        });
      },
      getFilterCountries: function() {
        return $q.resolve([
          'Spain',
          'Japan',
          'Mexico'
        ]);
      },
      getFilterEvents: function() {
        return $q.resolve([
          'Wildfires',
          'Derp'
        ]);
      }
    };
  }
]);
