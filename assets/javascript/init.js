(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space

var config = {
  apiKey: "AIzaSyCnvr_DzP4nJOhWuYNMPR1mOP03ECQ19yA",
  authDomain: "recradar-90218.firebaseapp.com",
  databaseURL: "https://recradar-90218.firebaseio.com",
  projectId: "recradar-90218",
  storageBucket: "recradar-90218.appspot.com",
  messagingSenderId: "1059119511624"
};
firebase.initializeApp(config);
var database = firebase.database();

//this will store all the inputs from the form into variables
var userObj = {
  firstName: '',
  lastName: '',
  age: '',
  phone: '',
  zip: '',
  city: '',
  coordinates: ''
};

//clears the form
var clearForm = function() {
  $("#first-name").val('');
  $("#last-name").val('');
  $("#age").val('');
  $('#number').val('');
  $('#zip').val('');
};

//gets user input from the form
var getUserInput = function() {
  userObj.firstName = $("#first-name").val().trim();
  userObj.lastName = $("#last-name").val().trim();
  userObj.age = $("#age").val().trim();
  userObj.phone = $('#number').val().trim();
  userObj.zip = $('#zip').val().trim();
}


//gets user location based on zip code
var locationRequest = function(zipCode) {
  var url = 'https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:'+zipCode+'&key='+'AIzaSyD66EiTmbLSvi2GWAiZSLKB3CowEYbvxRc';
  $.ajax({ url: url, method: 'GET' }).then(function(response) {
    
    //stores the user latitude and longitude based on the zip as an object
    userObj.coordinates = response.results[0].geometry.location;

    //stores the user city based on zip code
    userObj.city = response.results[0].address_components[1].long_name;

    //sets the user to the db. We do this at the end of the ajax request to get the location of the user from the geolocation api, to set all user data at once
    database.ref().push(userObj);

    //invoke function to request to google places with coordinates
    
  });
};

//gets user input, and creates location request on click
$('#submit-form').on('click', function(e) {
  e.preventDefault();

  //sets the user values
  getUserInput();

  //sets user name to session storage 
  sessionStorage.name = userObj.firstName;

  //clears the user input
  clearForm();

  //hides form when submit is pressed
  $('#input-form').hide();

  //gets the user location based on zip code
  locationRequest(userObj.zip);

  database.ref().orderByChild("dateAdded").limitToFirst(10).on("child_added", function(snapshot) {

    // full list of items to the well
  $(".results").append("<div class='well row'><span class='train-name col-md-2'> " + snapshot.val().firstName +
    " </span><span class='employee-role col-md-2'> " + snapshot.val().lastName +
    " </span><span class='employee-start col-md-2'> " + snapshot.val().age +
    " </span><span class='employee-rate col-md-2'> " + snapshot.val().phone + " </span></div>");
  });
});