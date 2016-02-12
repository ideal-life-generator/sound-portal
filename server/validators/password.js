const PASSWORD_VALIDATOR = /^.*(?=.{8,32})(?=.*[a-zA-Z]).*$/

/*
  
  Errors codes:
    3 - password is empty;
    4 - password is invalid;

*/

export default function passwordValidator (password) {
  if (password) {
    if (PASSWORD_VALIDATOR.test(password)) { return }
    else { return 4 }
  }
  else { return 3 }
}