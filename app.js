var map, marker;
    
var _default = { lat: -0.284925, lng: 36.0701259 };

//map initialization function, called when the page loads
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: _default,
    focus: false,
    gestureHandling: "greedy",
  });

  marker = new google.maps.Marker({
    position: _default,
    map: map,
    draggable: false,
    title: "Hello World!",
  });


}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }