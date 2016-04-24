angular.module('ProjectBarataria').controller('StatsViewCtrl', [
  '$rootScope', '$scope', 'events', 'apiService', 'filterService',
  function($rootScope, $scope, events, apiService, filterService) {
    var subscribers = [];

    $scope.filterOpened = false;

    $scope.disastersPerYear = [];
    $scope.globalPercentage = [];

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

    function loadGlobalPercentages(data) {

      if (charts.globalPercentage) charts.globalPercentage.remove();
      var chart = d3.selectAll('#globalPercentages').append('svg')
          .attr('height', HEIGHT)
          .attr('width', WIDTH);
      charts.globalPercentage = chart;

      var color = d3.scale.category20b();

      var xRange = d3.scale.ordinal()
          .rangeRoundBands([MARGIN.left, WIDTH - 3.5 * MARGIN.right], 0.1)
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
          .attr('fill', function(d, i) {
            return color(d.year);
          });

          var legendRectSize = 15;
          var legendSpacing = 4;
          var legend = chart.selectAll('.legend')
              .data(color.domain())
              .enter()
              .append('g')
              .attr('class', 'legend')
              .attr('transform', function(d, i) {
                var height = legendRectSize + legendSpacing;
                var offset =  height * color.domain().length / 2;
                var horz = WIDTH - 3 * MARGIN.right;
                // var vert = i * height - offset;
                var vert = (i * height) + MARGIN.top;
                return 'translate(' + horz + ',' + vert + ')';
              });

          legend.append('rect')
              .attr('width', legendRectSize)
              .attr('height', legendRectSize)
              .style('fill', color)
              .style('stroke', color);

          legend.append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .text(function(d) { return d; });
    } 
                
    subscribers.push($rootScope.$on(events.filter.changed, function() {
      loadCharts();
    }));

    $scope.$on('$destroy', function() {
      subscribers.forEach(function(subscriber) {
        subscriber();
      })
    });

    function loadCharts() {
      filterService.getFilters()
        .then(function(data) {
          var filters = {};
          for (var i = 0; i < data.length; i++) {
            if (data[i].label === 'Date Range') {
              filters.from = data[i].value.selected[0];
              filters.to = data[i].value.selected[1];
            } else if (data[i].label === 'Event Types') {
              filters.events = data[i].values
                  .filter(function(itm) { return itm.checked; })
                  .map(function(itm) { return itm.label })
                  .join(';');
            } else if (data[i].label === 'Countries') {
              filters.countries = data[i].values
                  .filter(function(itm) { return itm.checked; })
                  .map(function(itm) { return itm.label })
                  .join(';');
            }
          }
          apiService.getDisastersPerYear(filters.from, filters.to, filters.countries, filters.events)
              .then(function(response) {
                $scope.disastersPerYear = response.data;
                loadDisastersPerYear($scope.disastersPerYear);
              }, function(error) {
                console.log(error);
              });
          // apiService.getPercentageGlobal(filters.from, filters.to, filters.countries, filters.events)
          apiService.getDisastersPerYear(filters.from, filters.to, filters.countries, filters.events)
              .then(function(response) {
                $scope.globalPercentage = response.data.slice(0,5);
                loadGlobalPercentages($scope.globalPercentage);
              }, function(error) {
                console.log(error);
              });
        }, function(err) {
          console.log(err);
        });
    }

    loadCharts();

  }
]);
