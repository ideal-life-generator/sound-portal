const EMAIL_VALIDATOR = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

/*
  
  Errors codes:
    1 - email is empty;
    2 - email is invalid;

*/

export default function emailValidator (email) {
  if (email) {
    if (EMAIL_VALIDATOR.test(email)) { return }
    else { return 2 }
  }
  else { return 1 }
}