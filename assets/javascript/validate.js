//validates first and last name. a name must only contain letters, and be between 2 and 13 characters
function validateName(userName) {
  var nameCheck = /^[A-Za-z\s]{2,13}$/ig;
  if (nameCheck.test(userName)) {
    return true;
  } else {
    return 'Not a valid name'
  }
}

//checks for 5 digits.
function validateZip(userZip) {
  var zipCheck = /^[0-9]{5}$/g;
  if (zipCheck.test(userZip)) {
    return true;
  } else {
    return 'Not a valid zip code';
  }
}

//validates age. returns true if valid
function validAge(userAge) {  
  //checks for exactly 2 digits
  var ageCheck = /^[0-9]{2}$/g;
  
  //checks if age is older than 18
  if (ageCheck.test(userAge) && userAge > 17) {
    return true;
  } else if (userAge < 18) {
    return 'You must be 18 years old';
  } else {
    return 'Not a valid age';
  }
}

//validates phone numbers.
//ex: 555-555-5555, 1 555-555-5555, 1 (555) 555-5555, 5555555555, 555-555-5555, (555)555-5555, 1(555)555-5555, 1 555 555 5555, 1 456 789 4444
function validatePhone(userPhone) {
  var phoneCheck = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;
  if (phoneCheck.test(userPhone)) {
    return true;
  } else {
    return 'Not a valid phone number';
  }
}
