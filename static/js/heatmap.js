
  var FEED = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';
  var NOW = new Date();

  // create map
  var map = L.map(document.querySelector('.map'));
  // center in Perth
  map.setView([31.9523, 115.8613], 2);
  // add basemap
  L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
      
      }).addTo(map);

  // add earthquake layer
  var earthquakes = L.geoJson([], {
    onEachFeature: function (feature, layer) {
      var props = feature.properties;

      layer.bindPopup('<a href="' + props.url + '">' + props.title + '</a>');
    },
    pointToLayer: function (feature, latlng) {
      var color,
          mag,
          radius;

      mag = feature.properties.mag;
      if (mag === null) {
        color = '#fff';
        radius = 2;
      } else {
        color = '#00f';
        radius = 2 * Math.max(mag, 1);
      }

      if (feature.properties.type === 'quarry blast') {
        color = '#f00';
      }

      return L.circleMarker(latlng, {
        color: color,
        radius: radius
      });
    }
  }).addTo(map);

  // load data asynchronously
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var results = JSON.parse(xhr.responseText);
    earthquakes.addData(results);
  };
  xhr.open('GET', FEED, true);
  xhr.send();
