angular.module('ProjectBarataria').constant('api', {
  host: 'http://10.10.11.46:3000',
  rest: {
    filterDates: '/filterDates',
    filterCountries: '/filterCountries',
    filterEvents: '/filterEvents'
  }
});
