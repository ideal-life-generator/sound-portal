import {
  USER_LOADED_NOT_FULL,
  USER_SET_ADDITIONAL_DATA_USERNAME,
  USER_ADDITIONAL_DATA_USERNAME_EMPTY,
  USER_ADDITIONAL_DATA_USERNAME_INVALID,
  USER_LOADING,
  USER_LOADED,
  USER_LEAVE,
  USER_LOGOUT,
  USER_AUTHENTICATION_ERROR,
  USER_DESTROY
} from "constants/user"

export function loadedNotFull (user) {
  return {
    type: USER_LOADED_NOT_FULL,
    user
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

export function loading () {
  return {
    type: USER_LOADING
  }
}

export function loaded (user) {
  return {
    type: USER_LOADED,
    user
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

export function authenticationInvalid () {
  return {
    type: USER_AUTHENTICATION_ERROR
  }
}

export function destroy () {
  return {
    type: USER_DESTROY
  }
}