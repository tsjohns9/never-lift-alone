 $(document).ready(function() {
  //google maps geocode api: AIzaSyD66EiTmbLSvi2GWAiZSLKB3CowEYbvxRc
  // Initialize Firebase
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

  // userObj represents the current user. It is the person who last submitted the form. this will store all the inputs from the form into variables
  var userObj = {
    firstName: '',
    lastName: '',
    age: '',
    phone: '',
    address: '',
    city: '',
    coordinates: ''
  };

  //clears the form
  var clearForm = function() {
    $("#first-name").val('');
    $("#last-name").val('');
    $("#age").val('');
    $('#number').val('');
    $('#address').val('');
  };

  //gets user input from the form
  var getUserInput = function() {
    userObj.firstName = $("#first-name").val().trim();
    userObj.lastName = $("#last-name").val().trim();
    userObj.age = $("#age").val().trim();
    userObj.phone = $('#number').val().trim();
    userObj.address = $('#address').val().trim();
  };

  // passed into the .then promise found in locationRequest(), to run upon a successful request
  var ajaxDone = function(response) {

    // creates an error message if the ajax call was unsuccessful.
    if (response.status !== 'OK') {
      if (response.status === 'ZERO_RESULTS') {
        throw new Error('Address not found.');
      } else {
        throw new Error('Could not connect to server.')
      }
    }

    //stores the user latitude and longitude as an object
    userObj.coordinates = response.results[0].geometry.location;

    //stores the user city based on address
    userObj.city = response.results[0].address_components[2].long_name;

    //invoke function to display map
    initMap(userObj.coordinates);

    // location of user who submitted the form
    var currentUser = userObj.coordinates;

    // contains an object of all users in the db
    var allUsers;

    // contains an array of all keys from the db
    var allUserKeys;

    // each object will get pushed to its own index in the array
    var allUserArr = [];

    // gets all users from the db
    database.ref().once("value").then(function (snapshot) {

      // stores all the users from the db locally
      allUsers = snapshot.val();

      // gets all the keys
      allUserKeys = Object.keys(allUsers);

      // loops through each key
      for (i = 0; i < allUserKeys.length; i++) {

        // tmp is the current user. the key gets plugged back into the allUsers object to get the full object for the key
        var tmp = allUsers[allUserKeys[i]];

        // contains the coordinates of the current user in the loop
        var coord = tmp.coordinates;

        // executes function to determine how far away the user in the db is away from the user who submitted the form
        // the result is how far away the user is from the db
        tmp.distance = distance(currentUser.lat, currentUser.lng, coord.lat, coord.lng);

        // adds the user, with the new distance property to the array
        allUserArr.push(tmp)
      }

      // loops through each object in the allUserArr, and sorts each object from smallest to largest based on the value of distance
      // allUserArr is an array. sort is an array method to filter based off some value. It returns a new array.
      allUserArr.sort((a, b) => {
        // rounds the number to 1 decimal place
        a.distance = (Math.round(a.distance * 10) / 10);
        b.distance = (Math.round(b.distance * 10) / 10);
        return a.distance - b.distance

      // at this point we have a new array in order from closest to furthest. map is used to append each result to the page.
      // sort gets called on allUserArray to return a new array. map gets called on the returned array from allUserArr.sort
      }).map( (a,index) => {

        // loops through each object to append info to the screen
        $(".results").append(`
          <div class='card-panel teal' id='result-card'>
            <div id='icon-div'>
              <i class='large material-icons'>account_circle</i>
            </div>
            <div id='name-div'> ${a.firstName} ${a.distance}</div>
          </div>`
        );
      });

      //sets the user to the db after we make our query so that our user does not return in the results.
      //We also do this within the ajax request because we need info for the user from the geocode api.
      database.ref().push(userObj);
    });

  };
   
  //gets user location based on address
   var locationRequest = function (address) {
     var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyAvug71J9dikt9EgBYuElKS4-9ahCJ1dow';
    $.ajax({ url: url, method: 'GET' })
      // .then is invoked upon a successful response from the ajax request
      .then( resolve => ajaxDone(resolve) )
      // .catch is invoked upon an error response from the ajax request
      .catch( error => console.log(error) );
  };

  /* Dropdown initialization
  //$('.dropdown-trigger').click(function(e){
    $('.dropdown-trigger').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: true, 
      hover: false, 
      gutter: 0, 
      belowOrigin: false 
    });*/
    //this is for the initialization of the select field in HTML
    //$('select').material_select();

  //gets user input, and creates location request on click
  $('#submit-form').on('click', function(e) {
    e.preventDefault();

    //sets the user values
    getUserInput();

    //clears the user input
    clearForm();

    //hides form when submit is pressed
    $('#input-form').hide();

    //gets the user location based on address
    locationRequest(userObj.address);

    $('select').material_select();
  });

   // image effects
   (function ($) {
     $(function () {
       $('.button-collapse').sideNav();
       $('.parallax').parallax();
     });
   })(jQuery); // end of jQuery name space

   $('select').material_select();

 });