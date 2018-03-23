// //validates first and last name. a name must only contain letters, and be between 2 and 13 characters
// function validateName(userName) {
//   var nameCheck = /^[A-Za-z\s]{2,13}$/ig;
//   if (nameCheck.test(userName)) {
//     return true;
//   } else {
//     return 'Not a valid name'
//   }
// }

// //checks for 5 digits.
// function validateZip(userZip) {
//   var zipCheck = /^[0-9]{5}$/g;
//   if (zipCheck.test(userZip)) {
//     return true;
//   } else {
//     return 'Not a valid zip code';
//   }
// }

// //validates age. returns true if valid
// function validAge(userAge) {  
//   //checks for exactly 2 digits
//   var ageCheck = /^[0-9]{2}$/g;
  
//   //checks if age is older than 18
//   if (ageCheck.test(userAge) && userAge > 17) {
//     return true;
//   } else if (userAge < 18) {
//     return 'You must be 18 years old';
//   } else {
//     return 'Not a valid age';
//   }
// }

// //validates phone numbers.
// //ex: 555-555-5555, 1 555-555-5555, 1 (555) 555-5555, 5555555555, 555-555-5555, (555)555-5555, 1(555)555-5555, 1 555 555 5555, 1 456 789 4444
// function validatePhone(userPhone) {
//   var phoneCheck = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;
//   if (phoneCheck.test(userPhone)) {
//     return true;
//   } else {
//     return 'Not a valid phone number';
//   }
// }

// https://jqueryvalidation.org/

// $(document).ready(function() {
//   $("#form-validate").validate({
//     rules: {
//       firstName: {
//         required: true,
//         minlength: 2
//       },
//       lastName: {
//         required: true,
//         minlength: 2
//       },
//       age: {
//         required: true,
//         min: 18
//       },
//       number: {
//         required: true,
//         pattern: /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/
//       },
//       address: "required"
//     },
//     //For custom messages
//     messages: {
//       firstName: {
//         required: "Please enter your first name",
//         minlength: "Enter at least 2 characters"
//       },
//       lastName: {
//         required: "Please enter your last name",
//         minlength: "Enter at least 2 characters"
//       },
//       age: {
//         required: "Please enter your age",
//         min: "You must be at least 18 years old"
//       },
//       number: {
//         required: "Please enter your phone number",
//         pattern: "Not a valid phone number"
//       },
//       address: "Please enter your address"
//     },
//     errorElement: 'div',
//     errorPlacement: function (error, element) {
//       var placement = $(element).data('error');
//       if (placement) {
//         $(placement).append(error)
//       } else {
//         error.insertAfter(element);
//       }
//     }
//   });
// });



