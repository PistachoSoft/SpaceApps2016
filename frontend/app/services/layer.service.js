angular.module('ProjectBarataria').service('layerService', [
  '$rootScope', 'events',
  function($rootScope, events) {
    var layers = {
      base: null,
      marker: null
    };

    function setupBaseLayer() {
      layers.base = L.map('map', {
        zoomControl: false
      }).setView([41.659631, -0.907582], 13);

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(layers.base);

      layers.base.attributionControl.setPrefix('');

      layers.marker = L.marker([41.659631, -0.907582]);

      layers.marker.on('click', function() {
        $rootScope.$emit(events.area.clicked);
      });

      layers.marker.addTo(layers.base);

      new L.Control.Zoom({
        position: 'bottomleft'
      }).addTo(layers.base);
    }

    return {
      setupBaseLayer: setupBaseLayer
    };
  }
]);
