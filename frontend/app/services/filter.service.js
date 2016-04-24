angular.module('ProjectBarataria').service('filterService', [
  function() {
    var defaultFilters = [
        {
          label: 'Event Types',
          type: 'checkbox',
          values: [
            {
              label: 'Earthquakes'
            }, {
              label: 'Drought'
            }, {
              label: 'Wildfires'
            }
          ]
        }, {
          label: 'Countries',
          type: 'checkbox',
          values: [
            {
              label: 'Spain'
            }, {
              label: 'Mexico'
            }, {
              label: 'Japan'
            }
          ]
        }, {
          label: 'Date Range',
          type: 'date',
          value: {
            max: 2016,
            min: 1950,
            selected: [1950, 2016]
          }
        }
      ],
      selectedFilters = null;

    function getFilters() {
      return _.cloneDeep(selectedFilters || defaultFilters);
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
