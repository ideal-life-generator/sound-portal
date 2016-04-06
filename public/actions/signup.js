 import {
  SIGNUP_UPDATE_USERNAME,
  SIGNUP_EMPTY_USERNAME,
  SIGNUP_INVALID_USERNAME
} from "constants/signup"
import validation, { usernameValidator } from "globals/validation"
import {
  USERS_EMTPY_USERNAME,
  USERS_INVALID_USERNAME
} from "globals/codes"
import { send } from "connection"

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

export function sendUsername () {
  return function (dispatch, getState) {
    const state = getState()
    const {
      signup: { username },
      user: { id }
    } = state

    validation(usernameValidator(username), (errors) => {
      if (errors) {
        if (errors.includes(USERS_EMTPY_USERNAME)) dispatch(emptyUsername())
        else if (errors.includes(USERS_INVALID_USERNAME)) dispatch(invalidUsername())
      } else {
        send("username: update", { id, username })
      }
    })
  }
}