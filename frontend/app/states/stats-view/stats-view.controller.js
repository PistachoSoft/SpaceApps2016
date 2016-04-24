angular.module('ProjectBarataria').controller('StatsViewCtrl', [
  '$rootScope', '$scope', 'events',
  function($rootScope, $scope, events) {
    var subscribers = [];

    $scope.filterOpened = false;

    $scope.disastersPerYear = [
      {year: 1999, occurrences: 400},
      {year: 2001, occurrences: 3300},
      {year: 2002, occurrences: 50},
      {year: 2003, occurrences: 750},
      {year: 2004, occurrences: 7000},
    ];
    $scope.globalPercentage = [
      {disaster: 'earthquake1', percentages: 10},
      {disaster: 'earthquake2', percentages: 30},
      {disaster: 'earthquake3', percentages: 50},
      {disaster: 'earthquake4', percentages: 7},
      {disaster: 'earthquake5', percentages: 3},
    ];

    var charts = {};

    var WIDTH = 400;
    var HEIGHT = 300;
    var MARGIN = { top: 40, bottom: 40, left: 55, right: 45 };

    function loadDisastersPerYear(data) {

      if (charts.disastersPerYear) charts.disastersPerYear.remove();
      var chart = d3.selectAll('#disastersPerYear').append('svg')
          .attr('height', HEIGHT)
          .attr('width', WIDTH);
      charts.disastersPerYear = chart;

      var xRange = d3.scale.ordinal()
          .rangeRoundBands([MARGIN.left, WIDTH - MARGIN.right], 0.1)
          .domain(data.map(function(d) { return d.year; }));
      var yRange = d3.scale.linear()
          .range([HEIGHT - MARGIN.top, MARGIN.bottom])
          .domain([0, d3.max(data, function(d) { return d.occurrences; })]);

      var xAxis = d3.svg.axis()
          .scale(xRange)
          .tickSize(5)
          .tickSubdivide(true);
      var yAxis = d3.svg.axis()
          .scale(yRange)
          .tickSize(5)
          .orient('left')
          .tickSubdivide(true);

      chart.append('svg:g').call(xAxis)
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,260)');
      chart.append('svg:g').call(yAxis)
          .attr('class', 'y axis')
          .attr('transform', 'translate(55,0)');

      chart.selectAll('rect')
          .data(data)
          .enter()
          .append('rect')
          .attr('x', function(d) { return xRange(d.year); })
          .attr('y', function(d) { return yRange(d.occurrences); })
          .attr('width', xRange.rangeBand())
          .attr('height', function(d) {
            return ((HEIGHT - MARGIN.bottom) - yRange(d.occurrences));
          })
          .attr('fill', '#aa3322');
    }


    subscribers.push($rootScope.$on(events.filter.changed, function() {
      // TODO refreshStats()
    }));

    $scope.$on('$destroy', function() {
      subscribers.forEach(function(subscriber) {
        subscriber();
      })
    });


    loadDisastersPerYear($scope.disastersPerYear);
  }
]);
