// Leaflet map setup
var map = L.map('map', {
  center: [30.941525, -7.214665],
  zoom: 3
});

var Stamen_TonerLite = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

cartodb.createLayer(map, {
  user_name: 'arobbins',
  type: 'cartodb',
  protocol:'https',
  sublayers: [{
   sql: 'select * from geom_data_js_v2',
   cartocss: '#aqa_data {marker-fill: #ff7800;} #kidnapping [hostinv=1]{marker-fill: #e52933;} #suicide [suicide=1]{marker-fill: #3d2885;} #west [wtarg=1] {marker-fill: #7462c9;} #state [statetarg=1] {marker-fill: #660066;}',
   interactivity: 'iyear, imonth, iday, gname, city, weaptype1_txt, nkill'
  }]
}, { https: true })
.addTo(map)
.done(function(layer) {
  cdb.vis.Vis.addInfowindow(map, layer.getSubLayer(0), ['iyear', 'imonth', 'iday', 'gname', 'city', 'weaptype1_txt', 'nkill']);
  layer.setInteraction(true);

$('#checkbox-1').click(function() {
   if (!$(this).is(':checked')) {
    layer.getSubLayer(0).setSQL('SELECT * FROM geom_data_js_v2');
  }
 });

 //Filter by kidnapping when toggle is selected
 $('#checkbox-2').click(function() {
   if($(this).is(":checked")) {
     layer.getSubLayer(0).setSQL('SELECT * FROM geom_data_js_v2 WHERE hostinv = 1');
   }
 });

 //Filter by suicide when second toggle is unchecked
 $('#checkbox-3').click(function() {
   if (!$(this).is(':checked')) {
     layer.getSubLayer(0).setSQL('SELECT * FROM geom_data_js_v2 WHERE suicide = 1');
   }
 });

 $('#checkbox-4').click(function() {
    if (!$(this).is(':checked')) {
     layer.getSubLayer(0).setSQL('SELECT * FROM geom_data_js_v2');
   }
  });

  //Filter by wtarg when toggle is selected
  $('#checkbox-5').click(function() {
    if (!$(this).is(':checked')) {
      layer.getSubLayer(0).setSQL('SELECT * FROM geom_data_js_v2 WHERE wtarg = 1');
    }
  });

  //Filter by statetarg when toggle is selected
  $('#checkbox-6').click(function() {
    if($(this).is(":checked")) {
      console.log("checked");
      layer.getSubLayer(0).setSQL('SELECT * FROM geom_data_js_v2 WHERE statetarg = 1');
    }
  });

});

//Download CSV with the data on click
$("#csv-download").click(function() {
    window.location = 'data.csv';
});

// TODO: "show all button, draw polygon and filter, add time slider, format infowindow, format toggles"
