import { send } from "connection"
import {
  validation,
  errorMessages,
  usernameValidator,
  passwordValidator
} from "utils/validation"
import {
  signupNotActive,
  signupNotUsed
} from "actions/signup"

export const LOGIN_ACTIVE = "LOGIN_ACTIVE"
export const LOGIN_NOT_ACTIVE = "LOGIN_NOT_ACTIVE"
export const LOGIN_USED = "LOGIN_USED"
export const LOGIN_NOT_USED = "LOGIN_NOT_USED"
export const LOGIN_SET_USERNAME = "LOGIN_SET_USERNAME"
export const LOGIN_USERNAME_SET_EMPTY = "LOGIN_USERNAME_SET_EMPTY"
export const LOGIN_USERNAME_SET_INVALID = "LOGIN_USERNAME_SET_INVALID"
export const LOGIN_SET_PASSWORD = "LOGIN_SET_PASSWORD"
export const LOGIN_PASSWORD_SET_EMPTY = "LOGIN_PASSWORD_SET_EMPTY"
export const LOGIN_PASSWORD_SET_INVALID = "LOGIN_PASSWORD_SET_INVALID"

export function loginActive () {
  return {
    type: LOGIN_ACTIVE
  }
}

export function loginNotActive () {
  return {
    type: LOGIN_NOT_ACTIVE
  }
}

export function loginUsed () {
  return {
    type: LOGIN_USED
  }
}

export function loginNotUsed () {
  return {
    type: LOGIN_NOT_USED
  }
}

export function loginSetUsername (username) {
  return {
    type: LOGIN_SET_USERNAME,
    username
  }
}

export function loginEmptyUsername () {
  return {
    type: LOGIN_USERNAME_SET_EMPTY
  }
}

export function loginInvalidUsername () {
  return {
    type: LOGIN_USERNAME_SET_INVALID
  }
}

export function loginSetPassword (password) {
  return {
    type: LOGIN_SET_PASSWORD,
    password
  }
}

export function loginEmptyPassword () {
  return {
    type: LOGIN_PASSWORD_SET_EMPTY
  }
}

export function loginInvalidPassword () {
  return {
    type: LOGIN_PASSWORD_SET_INVALID
  }
}

export function login () {
  return function (dispatch, getState) {
    const state = getState()
    const {
      login: {
        isActive: isLogin
      },
      signup: {
        isActive: isSignup
      }
    } = state

    if (!isLogin) {
      dispatch(loginActive())
      dispatch(loginUsed())
    }

    if (isSignup) {
      dispatch(signupNotActive())
      dispatch(signupNotUsed())
    }
  }
}

export function loginSubmit () {
  return function (dispatch, getState) {
    const state = getState()
    const {
      login: {
        username,
        password
      }
    } = state

    validation(
      usernameValidator(username),
      passwordValidator(password)
    , (errors) => {
      if (errors) {
        errors.forEach(error => console.log(errorMessages(error)))

        if (errors.includes(51)) dispatch(loginEmptyUsername())

        if (errors.includes(52)) dispatch(loginInvalidUsername())

        if (errors.includes(81)) dispatch(loginEmptyPassword())

        if (errors.includes(82)) dispatch(loginInvalidPassword())
      } else {
        send("authorization.login.request", {
          username,
          password
        })
      }
    })
  }
}