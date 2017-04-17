var app = {
  apikey: "83132e6826514aaa5f3c2fd1ff6b0c2be6616363",
  map: L.map('map', { center: [40.75583970971843, -73.795166015625], zoom: 3 }),
  geojsonClient: new cartodb.SQL({ user: 'arobbins', format: 'geojson' }),
  drawnItems: new L.FeatureGroup()
};

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(app.map);

// The initial query by which we map the geojson representation of a table
app.geojsonClient.execute("SELECT * FROM geom_data") // 'LIMIT' should be added to the end of this line
  .done(function(data) {
    L.geoJson(data, {
      onEachFeature: function(feature, layer) {
        layer.on('click', function() { fillForm(feature.properties); });
      }
    }).addTo(app.map);
  })
  .error(function(errors) {
  });

// Leaflet draw setup
app.map.addLayer(app.drawnItems);

// Initialise the draw control and pass it the FeatureGroup of editable layers
app.map.addControl(
  new L.Control.Draw({
    edit: {
      featureGroup: app.drawnItems
    },
    draw: {
      rectangle: false,
      polyline: false,
      polygon: false,
      marker: false,
      circle: false
    }
  })
);

// Automatically fill the form on the left from geojson response
var fillForm = function(properties) {
  $('#cartodb_id').val(properties.cartodb_id);
  $('#name').val(properties.name);
};

// Handling the creation of Leaflet.Draw layers
// Note the use of drawnLayerID - this is the way you should approach remembering and removing layers
var drawnLayerID;
app.map.on('draw:created', function (e) {
  var type = e.layerType;
  var layer = e.layer;
  console.log('draw created:', e);
});
