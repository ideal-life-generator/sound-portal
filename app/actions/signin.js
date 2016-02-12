import {
  SIGNIN_USERNAME_INPUT,
  SIGNIN_EMAIL_INPUT,
  SIGNIN_PASSWORD_INPUT
} from "constants/signin"

function signinUsername (username) {
  return {
    type: SIGNIN_USERNAME_INPUT,
    username
  }
}

function signinEmail (email) {
  return {
    type: SIGNIN_EMAIL_INPUT,
    email
  }
}

function signinPassword (password) {
  return {
    type: SIGNIN_PASSWORD_INPUT,
    password
  }
}

export {
  signinUsername,
  signinEmail,
  signinPassword
}