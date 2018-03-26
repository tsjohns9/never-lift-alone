 $(document).ready(function() {
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

  // userObj represents the person who last submitted the form. this will store all the inputs from the form
  var userObj = {
    firstName: '',
    lastName: '',
    age: '',
    phone: '',
    address: '',
    city: '',
    coordinates: '',
    choices: []
  };

  // creates the reset button for cases when no users/results are returned
  var resetButton = $(`
    <div class="row">
      <div class="button-div">
        <button class="btn waves-effect waves-light" style="width:176px;" onClick="window.location.reload();">
          Search Again
        </button>
      </div>
    </div>
  `);

  // creates a message when no users are found
   var noUserMsgDiv = $(`
    <div class="col s12">
      <div class="icon-block>
        <h2 class="center brown-text">
          <i class="material-icons" style="margin-left:50%; margin-top:20px;">add_location</i>
        </h2>
        <h5 class="center">No Users Found, Please Modify Search</h5>
      </div>
    </div>
  `);

  // stores the radius of our search
  var searchDistance;
  
  //clears the form
  var clearForm = function() {
    $("#first-name").val('');
    $("#last-name").val('');
    $("#age").val('');
    $('#number').val('');
    $('#address').val('');
  };

  // gets user input from the form
  var getUserInput = function() {
    userObj.firstName = $("#first-name").val().trim();
    userObj.lastName = $("#last-name").val().trim();
    userObj.age = $("#age").val().trim();
    userObj.phone = $('#number').val().trim();
    userObj.address = $('#address').val().trim();
  };

  // passed into the .then promise found in locationRequest(), to run upon a successful request
  var ajaxDone = function(response) {
    console.log(response)
    // creates an error message if the ajax call was unsuccessful.
    if (response.status !== 'OK') {
      if (response.status === 'ZERO_RESULTS') {
        throw new Error('Address not found.');
      } else {
        throw new Error('Could not connect to server.')
      }
    }

    // stores the user latitude and longitude as an object
    userObj.coordinates = response.results[0].geometry.location;

    // stores the user city based on address
    userObj.city = response.results[0].address_components[2].long_name;

    // invoke function to display map
    initMap(userObj.coordinates, searchDistance, userObj.choices);

    // location of user who submitted the form
    var currentUser = userObj.coordinates;

    // will contain an object of all users in the db
    var allUsers;
    
    // will contain an array of all keys from the db
    var allUserKeys;

    // each object will get pushed to its own index in the array
    var allUserArr = [];

    // gets all users from the db
    database.ref().once("value").then(function (snapshot) {
      // stores all the users from the db locally
      allUsers = snapshot.val();

      // checks if the db is empty or not. doesn't do anything if its empty
      if (snapshot.val() !== null) {

        // reveals the map to show places
        $("#map").removeClass("d-none");

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
          allUserArr.push(tmp);
        }

        // loops through each object in the allUserArr, and sorts each object from smallest to largest based on the value of distance
        allUserArr.sort(function(a,b) {

          // rounds the number to 1 decimal place
          a.distance = (Math.round(a.distance * 10) / 10);
          b.distance = (Math.round(b.distance * 10) / 10);
          return a.distance - b.distance

        // returns users who pick the same type of workout
        }).filter(function(a) {
          return a.choices === userObj.choices

          // returns users who are within the specified search radius
        }).filter(function(a) {
          return a.distance <= searchDistance

          // loops through each object to append info to the screen
        }).map(function(a) {
          $(".results").append(`
            <div class='card-panel teal' id='result-card'>
              <div id='icon-div'>
                <i class='large material-icons'>perm_identity</i>
              </div>
              <div id='name-div'> 
                <p>${a.firstName}</p>
                <p>${a.distance} miles away from you</p>
                <p>${a.phone}</p>
              </div>
            </div>`
          );
        });

        // checks if anything was added to the results div. if nothing was added, then no users were found within the radius filter
        if ($('.results').children().length < 1) {
          $('.results').append(noUserMsgDiv, resetButton);
        }

      } else { // end of the condition to see if the db is empty
        $('.results').append(noUserMsgDiv, resetButton);
      }

      // sets the user to the db after we make our query so that our user does not return in the results.
      database.ref().push(userObj);
    });
  };

  // gets user location based on address
  var locationRequest = function (address) {
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyAvug71J9dikt9EgBYuElKS4-9ahCJ1dow';
  $.ajax({ url: url, method: 'GET' })

    // .then is invoked upon a successful response from the ajax request
    .then(function(resolve) {
      ajaxDone(resolve)
    })

    // .catch is invoked upon an error response from the ajax request
    .catch(function(error) {

      // creates an error message from an unsuccessful ajax request
      $('.results').append(`
        <div class="col s12">
          <div class="icon-block>
            <h2 class="center brown-text">
              <i class="material-icons" style="margin-left:50%; margin-top:20px;">add_location</i>
            </h2>
            <h5 class="center">${error.message}</h5>
          </div>
        </div>`,
        resetButton
      );
    });
  };

  $('select').material_select();

  // gets the users choice
   $("#workout-select").on('change', function (workout) {
     var selectChoices = $("#workout-select").val();
     console.log(selectChoices);
     userObj.choices = selectChoices;
   }); 

  //gets user input, and creates location request on click
  $('#submit-form').on('click', function(e) {
    e.preventDefault();

    //sets the user values
    getUserInput();

    //clears the user input
    clearForm();

    //hides form when submit is pressed
    $('#input-form').hide();

    // gets the users search radius
    searchDistance = $('#slide')['0'].value;

    //gets the user location based on address
    locationRequest(userObj.address);
  });

  // image effects
  (function ($) {
    $(function () {
      $('.button-collapse').sideNav();
      $('.parallax').parallax();
    });
  })(jQuery); // end of jQuery name space
 });