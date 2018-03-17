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

  //this will store all the inputs from the form into variables 
  var firstName;
  var lastName;
  var age;
  var phone;

  var hideForm = function() {
    $('#input-form').hide();
  }
  

  $('#submit-form').on('click', function(e) {
    e.preventDefault();

    //sets the user values
    firstName = $("#first-name").val().trim();
    lastName = $("#last-name").val().trim();
    age = $("#age").val().trim();
    phone = $('#number').val().trim();

    //sets user name to session storage 
    sessionStorage.name = firstName;

    //clears the user input
    $("#first-name").val('');
    $("#last-name").val('');
    $("#age").val('');
    $('#number').val('');

    //sets the user to the db
    database.ref().push({
      firstName: firstName,
      lastName: lastName,
      age: age,
      phone: phone,
    });

    
    $('#input-form').hide();
    database.ref().orderByChild("dateAdded").limitToLast(10).on("child_added", function(snapshot) {
   
      // full list of items to the well
    $(".results").append("<div class='well row'><span class='train-name col-md-2'> " + snapshot.val().firstName +
      " </span><span class='employee-role col-md-2'> " + snapshot.val().lastName +
      " </span><span class='employee-start col-md-2'> " + snapshot.val().age +
      " </span><span class='employee-rate col-md-2'> " + snapshot.val().phone + " </span></div>");
    }); 
  });


 });
