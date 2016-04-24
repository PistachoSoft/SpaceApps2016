angular.module('ProjectBarataria').service('filterService', [
  '$q', 'constants', 'apiService',
  function($q, constants, apiService) {
    var selectedFilters = null;

    function generateFilters() {
      var defer = $q.defer();

      $q.all({
        dates: apiService.getFilterDates(),
        countries: apiService.getFilterCountries(),
        events: apiService.getFilterEvents()
      })
      .then(function(results) {
        var events = constants.eventsFilter,
          countries = constants.countriesFilter,
          dates = constants.datesFilter;

        events.values = results.events.map(function(event) {
          return {
            label: event,
            checked: false
          };
        });

        countries.values = results.countries.map(function(country) {
          return {
            label: country,
            checked: false
          };
        });

        dates.value = {
          min: results.dates.min,
          max: results.dates.max,
          selected: [results.dates.min, results.dates.max]
        };

        defer.resolve([events, countries, dates])
      });

      return defer.promise;
    }

    function getFilters() {
      var defer = $q.defer();

      if (selectedFilters) {
        defer.resolve(_.cloneDeep(selectedFilters));
      } else {
        generateFilters().then(function(filters) {
          defer.resolve(_.cloneDeep(filters));
        });
      }

      return defer.promise;
    }

    function saveFilters(filters) {
      selectedFilters = _.cloneDeep(filters);
    }

    return {
      getFilters: getFilters,
      saveFilters: saveFilters
    };
  }
]);
