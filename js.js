
var currentDate = new Date()
var day = currentDate.getDate()
var month = currentDate.getMonth() + 1
var year = currentDate.getFullYear()
var date =year + "-" + month + "-" + day;



map = new OpenLayers.Map("mapdiv");
map.addLayer(new OpenLayers.Layer.OSM());
map.setCenter([0,0]);

function getinfo(){

    var mag = document.querySelector('#mag');
    var location = document.querySelector('#location');
    var count = document.querySelector('#count');
    var lon, lat;

    fetch("https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime="+date).
    then(result=>result.json()).
    then(json=>{
        mag.textContent = json.features[0].properties.mag;
        location.textContent = json.features[0].properties.place;
        count.textContent = json.metadata.count;
        console.log(json.features[0].geometry.coordinates[0])
        console.log(json.features[0].geometry.coordinates[1])
        lon = json.features[0].geometry.coordinates[0];
        lat = json.features[0].geometry.coordinates[1];

        var lonLat = new OpenLayers.LonLat( lon ,lat )
          .transform(
            new OpenLayers.Projection("EPSG:4326"), 
            map.getProjectionObject() 
          );
          
    var zoom=12;

    var markers = new OpenLayers.Layer.Markers( "Markers" );
    map.addLayer(markers);
    
    markers.addMarker(new OpenLayers.Marker(lonLat));
    
    map.setCenter (lonLat, zoom);

    });

}