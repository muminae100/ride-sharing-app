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
if (
    window.location.pathname == "/index.php" ||
    window.location.pathname == "/"
  ) {
    $(() => {
      /**
       * @description: next, lets get our input fields for pickup and dropoff
       *
       */
      let pickup = document.getElementById("pickup");
      let dropoff = document.getElementById("dropoff");
  
      /**
       * @description: we initialize google maps js api on the inputs
       * for pickup and dropoff
       */
  
      let pickup_autocomplete = new google.maps.places.Autocomplete(pickup);
      let dropoff_autocomplete = new google.maps.places.Autocomplete(dropoff);
  
      /**
       * @description: now we want to listen to the input fields for pickup and dropoff and load Googles' autocomplete
       */
  
      google.maps.event.addListener(pickup_autocomplete, "place_changed", () => {
        /**
         * @description: get place name from google autocomplete callback
         */
        let place = pickup_autocomplete.getPlace();
  
        /**
         * @description: extract lat and lng from place object
         */
        let lat = place.geometry.location.lat();
        let lon = place.geometry.location.lng();
  
        /**
         * @description: set the marker to the new location and center the map on it
         */
        map.setCenter({ lat: lat, lng: lon });
  
        /**
         * @description: save the new location to the database(LocalStorage)
         */
        localStorage.setItem(
          "pickup",
          JSON.stringify({ lat: lat, lng: lon, place_name: place.name })
        );
  
        /**
         * @description: if there were any markers on the map, remove them
         * @see: https://developers.google.com/maps/documentation/javascript/reference/marker#Marker.setMap
         * 
         */
        if (marker) {
          marker.setMap(null);
        }
  
        /**
         * @description: next, we want to create a marker for the new pickup location
         * @see: https://developers.google.com/maps/documentation/javascript/markers
         * 
         */
        marker = new google.maps.Marker({
          position: { lat: lat, lng: lon },
          map: map,
          title: "Pickup",
          draggable: false,
          animation: google.maps.Animation.DROP, // optional
        });
      });
  
      /**
       * @description: Listen for changes on the dropoff input field and load places using Googles' autocomplete
       * @see: https://developers.google.com/maps/documentation/javascript/places-autocomplete
       * 
       */
  
      google.maps.event.addListener(dropoff_autocomplete, "place_changed", () => {
        /**
         * @description: get place name from google autocomplete callback
         * 
         */
        let place = dropoff_autocomplete.getPlace();
  
        /**
         * @description: extract lat and lng from place object
         * 
         */
        let lat = place.geometry.location.lat();
        let lon = place.geometry.location.lng();
  
        /**
         * @description: get place name
         * 
         */
        let place_name = place.name;

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }