// Leaflet map setup
var map = L.map('map', {
  center: [30.941525, -7.214665],
  zoom: 3
});

var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

cartodb.createLayer(map, {
  user_name: 'arobbins',
  type: 'cartodb',
  sublayers: [{
   sql: 'select * from geom_data_js_v2',
   cartocss: '#geom_data_js_v2 {marker-fill: #ff7800; }',
   interactivity: 'iyear, imonth, iday, gname, city, weaptype1_txt, nkill'
  }]
})
.addTo(map)
.done(function(layer) {
  cdb.vis.Vis.addInfowindow(map, layer.getSubLayer(0), ['iyear', 'imonth', 'iday', 'gname', 'city', 'weaptype1_txt', 'nkill']);
});

//Download CSV with the data on click
$("#csv-download").click(function() {
    window.location = 'data.csv';
});

//Change data displayed when toggles are moved
$('#checkbox-1').change(function() {
  if($(this).is(":checked")) {
    console.log("checked");
  }
});

$('#checkbox-1').click(function() {
  if (!$(this).is(':checked')) {
    console.log("unchecked");
  }
});
