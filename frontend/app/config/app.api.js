angular.module('ProjectBarataria').constant('api', {
  statsHost: 'http://10.10.11.46:3000',
  mapHost: 'http://10.10.11.50:5000',
  rest: {
    filterDates: '/filterDates',
    filterCountries: '/filterCountries',
    filterStatus: '/filterStatus',
    filterEvents: '/filterEvents',
    allPoints: '/all',
    disastersPerYear: '/disasters-per-year',
    globalPercentages: '/global-percentages',
    perYearPercentages: '/per-year-percentages',
    disastersEvolution: '/disasters-evolution'
  }
});
