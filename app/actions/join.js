import {
  JOIN_EMAIL_CHANGE,
  JOIN_PASSWORD_CHANGE,
  JOIN_EMPTY_EMAIL,
  JOIN_EMPTY_PASSWORD,
  JOIN_INVALID_EMAIL,
  JOIN_INVALID_PASSWORD,
  JOIN_NOT_AVAILABLE_EMAIL
} from "constants/join"

function joinEmailChange (email) {
  return {
    type: JOIN_EMAIL_CHANGE,
    email
  }
}

function joinPasswordChange (password) {
  return {
    type: JOIN_PASSWORD_CHANGE,
    password
  }
}

function joinEmptyEmail () {
  return {
    type: JOIN_EMPTY_EMAIL
  }
}

function joinEmptyPassword () {
  return {
    type: JOIN_EMPTY_PASSWORD
  }
}

function joinInvalidEmail () {
  return {
    type: JOIN_INVALID_EMAIL
  }
}

function joinInvalidPassword () {
  return {
    type: JOIN_INVALID_PASSWORD
  }
}

function joinNotAvailableEmail () {
  return {
    type: JOIN_NOT_AVAILABLE_EMAIL
  }
}

export {
  joinEmailChange,    
  joinPasswordChange,
  joinEmptyEmail,
  joinEmptyPassword,
  joinInvalidEmail,
  joinInvalidPassword,
  joinNotAvailableEmail
}