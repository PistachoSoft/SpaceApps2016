angular.module('ProjectBarataria').service('filterService', [
  '$rootScope', '$q', 'events', 'constants', 'apiService',
  function($rootScope, $q, events, constants, apiService) {
    var selectedFilters = null;

    function generateFilters(filterType) {
      var defer = $q.defer(),
        promises= {
          dates: apiService.getFilterDates(),
          countries: apiService.getFilterCountries(),
          events: apiService.getFilterEvents(filterType)
        };

      if (filterType === 'map') {
        promises.status = apiService.getFilterStatus();
      }

      $q.all(promises)
      .then(function(results) {
        var events = constants.eventsFilter,
          countries = constants.countriesFilter,
          dates = constants.datesFilter,
          status = constants.statusFilter,
          featured = constants.featureFilter,
          filters;

        events.values = results.events.map(function(event) {
          var _event = {};

          if (filterType === 'map') {
            _event.label = event.name;
            _event.id = event.id;
          } else {
            _event.label = event;
          }

          _event.checked = false;

          return _event;
        });

        events.values = _.sortBy(events.values, function(event) {
          return event.label;
        });

        countries.values = results.countries.map(function(country) {
          return {
            label: country.countryName,
            iso: country.iso,
            checked: false
          };
        });

        countries.values = _.sortBy(countries.values, function(country) {
          return country.label;
        });

        dates.value = {
          min: results.dates.min,
          max: results.dates.max,
          selected: [results.dates.min, results.dates.max]
        };

        if (filterType === 'map') {
          status.values = results.status.map(function(state) {
            return {
              label: _.capitalize(state),
              id: state,
              checked: false
            };
          });

          filters = [events, countries, status, featured, dates];
        } else {
          filters = [events, countries, dates];
        }

        defer.resolve(filters);
      });

      return defer.promise;
    }

    function getDefaultFilters(filterType) {
      var defer = $q.defer();

      generateFilters(filterType).then(function(filters) {
        defer.resolve(_.cloneDeep(filters));
      });

      return defer.promise;
    }

    function getCurrentFilters() {
      return selectedFilters;
    }

    function saveFilters(filters) {
      selectedFilters = _.cloneDeep(filters);

      $rootScope.$emit(events.filter.changed);
    }

    return {
      getDefaultFilters: getDefaultFilters,
      getCurrentFilters: getCurrentFilters,
      saveFilters: saveFilters
    };
  }
]);
