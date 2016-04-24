angular.module('ProjectBarataria').config([
  '$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
      url: '/',
      controller: 'MapViewCtrl',
      templateProvider: ['$templateCache', function($templateCache) {
        return $templateCache.get('states/map-view/map-view.tpl.html');
      }]
    })

    .state('stats', {
      url: '/stats',
      controller: 'StatsViewCtrl',
      templateProvider: ['$templateCache', function($templateCache) {
        return $templateCache.get('states/stats-view/stats-view.tpl.html');
      }]
    });

    $urlRouterProvider.otherwise('/');
  }
]);
