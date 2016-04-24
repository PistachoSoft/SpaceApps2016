angular.module('ProjectBarataria').service('apiService', [
  '$http', 'api',
  function($http, api) {
    function requestParse(options) {
      var result = {};

      if (options.bounds) {
        result.box = {
          bottomLeft: [options.bounds._southWest.lat, options.bounds._southWest.lng],
          upperRight: [options.bounds._northEast.lat, options.bounds._northEast.lng]
        };
      }

      if (options.filters) {
        var countryOptions = _.find(options.filters, {
          label: 'Countries'
        });

        if (countryOptions) {
          result.country = countryOptions.values
          .filter(function(country) {
            return country.checked;
          })
          .map(function(country) {
            return country.iso.toLowerCase();
          });

          if (!result.country.length) {
            delete result.country;
          }
        }

        var eventOptions = _.find(options.filters, {
          label: 'Event Types'
        });

        if (eventOptions) {
          result.events = eventOptions.values
          .filter(function(event) {
            return event.checked;
          })
          .map(function(event) {
            return +event.id;
          });

          if (!result.events.length) {
            delete result.events;
          }
        }

        var statusOptions = _.find(options.filters, {
          label: 'Status'
        });

        if (statusOptions) {
          result.status = statusOptions.values
            .filter(function(status) {
              return status.checked;
            })
            .map(function(status) {
              return status.label.toLowerCase();
            });

          if (!result.status.length) {
            delete result.status;
          }
        }

        var featureOptions = _.find(options.filters, {
          label: 'Featured'
        });

        if (featureOptions) {
          result.featured = !!featureOptions.values
            .filter(function(feature) {
              return feature.checked;
            }).length;

          if (!result.featured) {
            delete result.featured;
          }
        }

        var dateOptions = _.find(options.filters, {
          label: 'Date Range'
        });

        if (dateOptions) {
          result.date = {
            from: dateOptions.value.selected[0] + '-01-01T00:00:00+00:00',
            to: dateOptions.value.selected[1] + '-01-01T00:00:00+00:00'
          };
        }
      }

      return result;
    }

    return {
      getFilterDates: function() {
        return $http.get(api.statsHost + api.rest.filterDates)
        .then(function(response) {
          return response.data;
        })
        .catch(function() {
          return {};
        });
      },
      getFilterCountries: function() {
        return $http.get(api.statsHost + api.rest.filterCountries)
        .then(function(response) {
          return response.data;
        })
        .catch(function() {
          return [];
        });
      },
      getFilterStatus: function() {
        return $http.get(api.mapHost + api.rest.filterStatus)
        .then(function(response) {
          return response.data;
        })
        .catch(function() {
          return [];
        });
      },
      getFilterEvents: function(filterType) {
        return $http.get(api[filterType + 'Host'] + api.rest.filterEvents)
        .then(function(response) {
          return response.data;
        })
        .catch(function() {
          return [];
        });
      },
      getAllPoints: function(options) {
        var _options = requestParse(options);

        return $http.post(api.mapHost + api.rest.allPoints, _options)
        .then(function(response) {
          return response.data;
        });
      },
      // Get total number of disasters for each year in the interval
      getDisastersPerYear: function(startYear, endYear, country, disasters) {
        return $http.get(api.statsHost + api.rest.disastersPerYear, {
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
        return $http.get(api.statsHost + api.rest.globalPercentages, {
          from: startYear,
          to: endYear,
          countries: country,
          disasters: disasters
        });
      },
      // Get the percentage of events of each type for each year in the interval
      getDissastersPercentagePerYear: function(startYear, endYear, country, disasters) {
        return $http.get(api.statsHost + api.rest.perYearPercentages, {
          from: startYear,
          to: endYear,
          countries: country,
          disasters: disasters
        });
      },
      // Get the count of events of each type for each year in the interval
      getDisastersEvolution: function(startYear, endYear, country, disasters) {
        return $http.get(api.statsHost + api.rest.disastersEvolution, {
          from: startYear,
          to: endYear,
          countries: country,
          disasters: disasters
        });
      }
    };
  }
]);
