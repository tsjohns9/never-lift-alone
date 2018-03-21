// This needs to be added to the bottom of index.html to get the map info
// <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA0TMyaurfHnCORhKqG8lKjBrhXxT1pg9U&libraries=places"></script>

// creates a map based on the user location
// location will be an object representing the users lattitude and longitude

function initMap(location) {
  console.log("sanity");
  // we will need to make an HTML div with an ID of map to initialize the map
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: location
  });

  // puts the marker at our approximate location based off our zip
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
}

// function will get invoked in locationRequest(), which runs when a user submits their info
// initMap(userObj.coordinates);