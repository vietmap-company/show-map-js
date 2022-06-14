
// var polyUtil = require('./Polyline.encoded.js');
// var encoded = '_p~iF~cn~U_ulLn{vA_mqNvxq`@';
// console.log(polyUtil.decode(encoded));
var locations = [
	{ "x": 106.68534799462223, "y": 10.78252517522869, "id": 1, "name": "Điểm 1", "address": "địa chỉ 1" },
	{ "x": 106.66938629614792, "y": 10.784824619376634, "id": 2, "name": "Điểm 2", "address": "địa chỉ 2" },
	{ "x": 106.66217651892876, "y": 10.789293262425321, "id": 3, "name": "Điểm 3", "address": "địa chỉ 3" },
	{ "x": 106.65771332350738, "y": 10.792075591529395, "id": 4, "name": "Điểm 4", "address": "địa chỉ 4" },
	{ "x": 106.65033188492585, "y": 10.796122569704261, "id": 5, "name": "Điểm 5", "address": "địa chỉ 5" },
	{ "x": 106.64355126111259, "y": 10.799916562239094, "id": 6, "name": "Điểm 6", "address": "địa chỉ 6" }
]

var mapLocations = {};
var markersLayer = new L.LayerGroup();
function onMapClick(e) {
	var id = e.sourceTarget.options.id;
	if (!id) return;
}

var mymap = L.map('mapid').setView([10.78252517522869, 106.68534799462223], 13);
L.tileLayer('https://maps.vietmap.vn/tm/{z}/{x}/{y}@2x.png?apikey=YOUR KEY', {
	maxZoom: 20,
	id: 'vietmap',
	tileSize: 512,
	zoomOffset: -1
}).addTo(mymap);
function showPoint() {
	this.markersLayer.clearLayers();
	for (i = 0; i < locations.length; i++) {
		var myIcon = L.icon({
			iconUrl: 'my-icon.png',
			iconSize: [32, 32],
			iconAnchor: [16, 32],
			popupAnchor: [0, -32],
			shadowSize: [68, 95],
			shadowAnchor: [22, 94]
		});
		var marker = L.marker([locations[i].y, locations[i].x], { icon: myIcon, id: locations[i].id }).on('click', onMapClick);
		marker.bindPopup(`
		<table style="width:100%">
		<tr style="margin: 10px; border: 1px solid black ;">
		  <th>ID</th>
		  <td>${locations[i].id}</td>
		</tr>
		<tr style="margin: 10px; border: 1px solid black">
		  <th>Name</th>
		  <td>${locations[i].name}</td>
		</tr>
		<tr style="margin: 10px; border: 1px solid black">
		  <th>Address</th>
		  <td>${locations[i].address}</td>
		</tr>
	  </table>
		`
		)
		markersLayer.addLayer(marker);
		
		mapLocations[locations[i].id] = locations[i];
	}
	markersLayer.addTo(mymap);

}
function showLine(){

var myHeaders = new Headers();
myHeaders.append("accept", "text/plain");
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};
var points=locations.map(p=>`point=${p.y},${p.x}`).join("&");
fetch(`https://maps.vietmap.vn/api/route?api-version=1.1&apikey=YOUR KEY&vehicle=car&${points}`, requestOptions)
  .then(response => response.text())
  .then(result =>{
	  var resRouting=JSON.parse(result);
	  console.log(resRouting);
	  var pointList=L.PolylineUtil.decode(resRouting.paths[0].points);
	  console.log(pointList);
	  var polyline  = new L.polyline(pointList,{color: 'red'}).addTo(mymap);;
	// zoom the map to the polyline
	mymap.fitBounds(polyline.getBounds());
    
  } )
  .catch(error => console.log('error', error));

}







