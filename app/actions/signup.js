 import {
  SIGNUP_UPDATE_USERNAME,
  SIGNUP_EMPTY_USERNAME,
  SIGNUP_INVALID_USERNAME,
  SIGNUP_REQUIRED_USERNAME
} from "constants/signup"

export function updateUsername (username) {
  return {
    type: SIGNUP_UPDATE_USERNAME,
    username
  }
}

export function emptyUsername () {
  return {
    type: SIGNUP_EMPTY_USERNAME
  }
}

export function invalidUsername () {
  return {
    type: SIGNUP_INVALID_USERNAME
  }
}

export function requiredUsername () {
  return {
    type: SIGNUP_REQUIRED_USERNAME
  }
}