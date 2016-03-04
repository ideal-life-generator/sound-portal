import { send } from "connection"
import {
  validation,
  errorMessages,
  usernameValidator,
  emailValidator,
  passwordValidator,
  refreshTokenValidator
} from "utils/validation"
import {
  loginNotActive,
  loginNotUsed
} from "actions/login"

export const SIGNUP_ACTIVE = "SIGNUP_ACTIVE"
export const SIGNUP_NOT_ACTIVE = "SIGNUP_NOT_ACTIVE"
export const SIGNUP_USED = "SIGNUP_USED"
export const SIGNUP_NOT_USED = "SIGNUP_NOT_USED"
export const SIGNUP_SET_REFRESH_TOKEN = "SIGNUP_SET_REFRESH_TOKEN"
export const SIGNUP_REFRESH_TOKEN_SET_REQUIRED = "SIGNUP_REFRESH_TOKEN_SET_REQUIRED"
export const SIGNUP_REFRESH_TOKEN_SET_UNSUCCESS = "SIGNUP_REFRESH_TOKEN_SET_UNSUCCESS"
export const SIGNUP_SET_USERNAME = "SIGNUP_SET_USERNAME"
export const SIGNUP_USERNAME_SET_EMPTY = "SIGNUP_USERNAME_SET_EMPTY"
export const SIGNUP_USERNAME_SET_INVALID = "SIGNUP_USERNAME_SET_INVALID"
export const SIGNUP_USERNAME_SET_USED = "SIGNUP_USERNAME_SET_USED"
export const SIGNUP_SET_EMAIL = "SIGNUP_SET_EMAIL"
export const SIGNUP_EMAIL_SET_EMPTY = "SIGNUP_EMAIL_SET_EMPTY"
export const SIGNUP_EMAIL_SET_INVALID = "SIGNUP_EMAIL_SET_INVALID"
export const SIGNUP_EMAIL_SET_USED = "SIGNUP_EMAIL_SET_USED"
export const SIGNUP_SET_PASSWORD = "SIGNUP_SET_PASSWORD"
export const SIGNUP_PASSWORD_SET_EMPTY = "SIGNUP_PASSWORD_SET_EMPTY"
export const SIGNUP_PASSWORD_SET_INVALID = "SIGNUP_PASSWORD_SET_INVALID"

export function signupActive () {
  return {
    type: SIGNUP_ACTIVE
  }
}

export function signupNotActive () {
  return {
    type: SIGNUP_NOT_ACTIVE
  }
}

export function signupUsed () {
  return {
    type: SIGNUP_USED
  }
}

export function signupNotUsed () {
  return {
    type: SIGNUP_NOT_USED
  }
}

export function signupSetRefreshToken (refresh_token) {
  return {
    type: SIGNUP_SET_REFRESH_TOKEN,
    refresh_token
  }
}

export function signupResfreshTokenRequired () {
  return {
    type: SIGNUP_REFRESH_TOKEN_SET_REQUIRED
  }
}

export function signupResfreshTokenUnsuccess () {
  return {
    type: SIGNUP_REFRESH_TOKEN_SET_UNSUCCESS
  }
}

export function signupSetUsername (username) {
  return {
    type: SIGNUP_SET_USERNAME,
    username
  }
}

export function signupEmptyUsername () {
  return {
    type: SIGNUP_USERNAME_SET_EMPTY
  }
}

export function signupInvalidUsername () {
  return {
    type: SIGNUP_USERNAME_SET_INVALID
  }
}

export function signupUsedUsername () {
  return {
    type: SIGNUP_USERNAME_SET_USED
  }
}

export function signupSetEmail (email) {
  return {
    type: SIGNUP_SET_EMAIL,
    email
  }
}

export function signupEmptyEmail () {
  return {
    type: SIGNUP_EMAIL_SET_EMPTY
  }
}

export function signupInvalidEmail () {
  return {
    type: SIGNUP_EMAIL_SET_INVALID
  }
}

export function signupUsedEmail () {
  return {
    type: SIGNUP_EMAIL_SET_USED
  }
}

export function signupSetPassword (password) {
  return {
    type: SIGNUP_SET_PASSWORD,
    password
  }  
}

export function signupEmptyPassword () {
  return {
    type: SIGNUP_PASSWORD_SET_EMPTY
  }
}

export function signupInvalidPassword () {
  return {
    type: SIGNUP_PASSWORD_SET_INVALID
  }
}

export function signup () {
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

    if (!isSignup) {
      dispatch(signupActive())
      dispatch(signupUsed())
    }

    if (isLogin) {
      dispatch(loginNotActive())
      dispatch(loginNotUsed())
    }
  }
}

export function signupSubmit () {
  return function (dispatch, getState) {
    const state = getState()
    const {
      signup: {
        username,
        email,
        password,
        refresh_token
      }
    } = state

    validation(
      usernameValidator(username),
      emailValidator(email),
      passwordValidator(password),
      refreshTokenValidator(refresh_token)
    , (errors) => {
      if (errors) {
        errors.forEach(error => console.log(errorMessages(error)))

        if (errors.includes(51)) dispatch(signupEmptyUsername())
        if (errors.includes(52)) dispatch(signupInvalidUsername())
        if (errors.includes(66)) dispatch(signupEmptyEmail())
        if (errors.includes(67)) dispatch(signupInvalidEmail())
        if (errors.includes(81)) dispatch(signupEmptyPassword())
        if (errors.includes(82)) dispatch(signupInvalidPassword())
        if (errors.includes(96)) dispatch(signupResfreshTokenRequired())
      } else {
        send("authorization.signin.request", {
          username,
          email,
          password,
          refresh_token
        })
      }
    })
  }
}