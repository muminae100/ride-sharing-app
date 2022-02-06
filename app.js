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

  
var infoWindow = new google.maps.InfoWindow();
const locationButton = document.createElement("button");

locationButton.textContent = "Find me";

locationButton.classList.add("custom-map-control-button");
map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

locationButton.addEventListener('click', function() {
// set default map location where the use is located
// Try HTML5 geolocation.
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const marker = new google.maps.Marker({
          position: pos,
          map: map,
        });  

        infoWindow.setPosition(pos);
        infoWindow.setContent('Me');
        infoWindow.open(map, marker);
        map.setCenter(pos);
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
}

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