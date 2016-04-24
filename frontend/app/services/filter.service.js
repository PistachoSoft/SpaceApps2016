angular.module('ProjectBarataria').service('filterService', [
  function() {
    var defaultFilters = [
        {
          label: 'Event Types',
          type: 'checkboxes',
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
          type: 'checkboxes',
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
          label: 'Start Date',
          type: 'date',
          value: null
        }, {
          label: 'End Date',
          type: 'date',
          value: null
        }
      ],
      selectedFilters = {
        types: []
      };

    function getDefaultFilters() {
      return _.cloneDeep(defaultFilters);
    }

    function getSelectedFilters() {
      return _.cloneDeep(selectedFilters);
    }

    return {
      getSelectedFilters: getSelectedFilters,
      getDefaultFilters: getDefaultFilters
    };
  }
]);
