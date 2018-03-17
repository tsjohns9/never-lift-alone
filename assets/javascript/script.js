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
  var firstName = $("#first-name").val().trim();
  var lastName = $("#last-name").val().trim();
  var age = $("#age").val().trim();
  var phone = $("#number").val().trim();

  $('#submit-form').on('click', function() {

    database.ref().push({
      firstName: firstName,
      lastName: lastName,
      age: age,
      phone: phone,
    });
  
  });










 });
