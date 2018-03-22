var map;
var infowindow;

function initMap(locationObj) {
  //user location based on zip code. stored as an object containing lattitude and longitude
  var location = locationObj;

  //creates a map with the center at the lat & long from the zip code
  map = new google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 12
  });

  infowindow = new google.maps.InfoWindow();

  //creates a search radius for gyms within 10 miles of the lat & long of the user
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: location,
    radius: 16093,
    type: ['gym']
  }, callback);
}

//creates a map marker for each gym that came back in the search radius
function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

// creates marker
function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  // creates popup info for the location on click
  google.maps.event.addListener(marker, 'click', function () {
    var request = {
      placeId: place.id
    };
    infowindow.setContent('<div><strong>' + place.name + '</strong><br>'+
    place.vicinity + '</div>');
    console.log(place.id);
    infowindow.open(map, this);
    service = new google.maps.places.PlacesService(map);
    service.getDetails(request, callback);
    console.log(service);
    console.log(request);
  });
}