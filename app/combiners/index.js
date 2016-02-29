import {
  loginActive,
  loginNotActive,
  loginEmptyUsername,
  loginInvalidUsername,
  loginEmptyPassword,
  loginInvalidPassword
} from "actions/login"

import {
  signupActive,
  signupNotActive,
  signupEmptyUsername,
  signupInvalidUsername,
  signupUsedUsername,
  signupEmptyEmail,
  signupInvalidEmail,
  signupUsedEmail,
  signupEmptyPassword,
  signupInvalidPassword,
  signupResfreshTokenRequired
} from "actions/signup"

import {
  send,
  subscribe
} from "connection"

import {
  validation,
  errorMessages,
  usernameValidator,
  emailValidator,
  passwordValidator,
  refreshTokenValidator
} from "utils/validation"

export function login () {
  return function (dispatch, getState) {
    const { authorization: { login: { isActive: isLogin }, signup: { isActive: isSignup } } } = getState()
    if (!isLogin) dispatch(loginActive())
    if (isSignup) dispatch(signupNotActive())
  }
}

export function signup () {
  return function (dispatch, getState) {
    const { authorization: { login: { isActive: isLogin }, signup: { isActive: isSignup } } } = getState()
    if (!isSignup) dispatch(signupActive())
    if (isLogin) dispatch(loginNotActive())
  }
}

export function submit () {
  return function (dispatch, getState) {
    const state = getState()
    const { authorization: { login: { isActive: isLogin }, signup: { isActive: isSignup } } } = state
    if (isLogin) {
      const { authorization: { login: { username, password } } } = state
      validation(
        usernameValidator(username),
        passwordValidator(password)
      , errors => {
        if (errors) {
          errors.forEach(error => console.log(errorMessages(error)))
          if (errors.includes(51)) { dispatch(loginEmptyUsername()) }
          if (errors.includes(52)) { dispatch(loginInvalidUsername()) }
          if (errors.includes(81)) { dispatch(loginEmptyPassword()) }
          if (errors.includes(82)) { dispatch(loginInvalidPassword()) }
        }
        else send("authorization.login.request", { username, password })
      })
    }
    if (isSignup) {
      const {
        authorization: { signup: { refresh_token, email, username, password } }
      } = state
      validation(
        usernameValidator(username),
        emailValidator(email),
        passwordValidator(password),
        refreshTokenValidator(refresh_token)
      , errors => {
        if (errors) {
          errors.forEach(error => console.log(errorMessages(error)))
          if (errors.includes(51)) { dispatch(signupEmptyUsername()) }
          if (errors.includes(52)) { dispatch(signupInvalidUsername()) }
          if (errors.includes(66)) { dispatch(signupEmptyEmail()) }
          if (errors.includes(67)) { dispatch(signupInvalidEmail()) }
          if (errors.includes(81)) { dispatch(signupEmptyPassword()) }
          if (errors.includes(82)) { dispatch(signupInvalidPassword()) }
          if (errors.includes(96)) { dispatch(signupResfreshTokenRequired()) }
        }
        else send("authorization.signin.request", { refresh_token, username, email, password })
      })
    }
  }
}