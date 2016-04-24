angular.module('ProjectBarataria').constant('constants', {
  eventsFilter: {
    label: 'Event Types',
    type: 'checkbox'
  },
  countriesFilter: {
    label: 'Countries',
    type: 'checkbox'
  },
  statusFilter: {
    label: 'Status',
    type: 'checkbox'
  },
  featureFilter: {
    label: 'Featured',
    type: 'checkbox',
    values: [
      {
        label: 'Featured',
        checked: false
      }
    ]
  },
  datesFilter: {
    label: 'Date Range',
    type: 'date'
  }
});
