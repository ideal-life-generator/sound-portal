import {
  USER_REQUEST,
  USER_LOGIN,
  USER_LOGIN_NOT_FULL,
  USER_AUTHENTICATION_ERROR,
  USER_SET_ADDITIONAL_DATA_USERNAME,
  USER_ADDITIONAL_DATA_USERNAME_EMPTY,
  USER_ADDITIONAL_DATA_USERNAME_INVALID,
  USER_LEAVE,
  USER_LOGOUT
} from "constants/user"

export function loading () {
  return {
    type: USER_REQUEST
  }
}

export function loaded (user) {
  return {
    type: USER_LOGIN,
    user
  }
}

export function loadedNotFull (user) {
  return {
    type: USER_LOGIN_NOT_FULL,
    user
  }
}

export function authenticationInvalid () {
  return {
    type: USER_AUTHENTICATION_ERROR
  }
}

export function setAdditionalDataUsername (username) {
  return {
    type: USER_SET_ADDITIONAL_DATA_USERNAME,
    username
  }
}

export function additionalDataUsernameEmpty () {
  return {
    type: USER_ADDITIONAL_DATA_USERNAME_EMPTY
  }
}

export function additionalDataUsernameInvalid () {
  return {
    type: USER_ADDITIONAL_DATA_USERNAME_INVALID
  }
}

export function leave () {
  return {
    type: USER_LEAVE
  }
}

export function logout () {
  return {
    type: USER_LOGOUT
  }
}