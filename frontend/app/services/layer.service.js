angular.module('ProjectBarataria').service('layerService', [
  '$rootScope', 'events',
  function($rootScope, events) {
    var layers = {
      base: null,
      markers: null
    };

    function markerClick(props) {
      $rootScope.$emit(events.area.clicked, props);
    }

    function setupBaseLayer() {
      layers.base = L.map('map', {
        zoomControl: false
      }).setView([41.659631, -0.907582], 13);

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(layers.base);

      layers.base.attributionControl.setPrefix('');

      //layers.marker = L.marker([41.659631, -0.907582]);
      //
      //layers.marker.on('click', function() {
      //  $rootScope.$emit(events.area.clicked);
      //});
      //
      //layers.marker.addTo(layers.base);

      new L.Control.Zoom({
        position: 'bottomleft'
      }).addTo(layers.base);
    }

    function setMarkerLayer(data) {
      var markersList = [];

      if (layers.markers) {
        layers.markers.clearLayers();
      }

      markersList = data
      .filter(function(point) {
        return point.properties.title && point.properties.description;
      })
      .map(function(point) {
        var marker = new L.marker(point.geometry.coordinates.reverse());

        marker.on('click', function() {
          markerClick(point.properties);
        });

        return marker;
      });

      layers.markers = L.featureGroup(markersList).addTo(layers.base);

      //layers.markers.addLayers(markersList);
    }

    function getBounds() {
      return layers.base.getBounds();
    }

    return {
      setupBaseLayer: setupBaseLayer,
      setMarkerLayer: setMarkerLayer,
      getCurrentBounds: getBounds
    };
  }
]);
