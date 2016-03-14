import {
  EMPTY_USERNAME,
  INVALID_USERNAME,
  EMPTY_EMAIL,
  INVALID_EMAIL,
  EMPTY_PASSWORD,
  INVALID_PASSWORD,
  EMPTY_TOKEN,
  INVALID_TOKEN,
  EMPTY_REFRESH_TOKEN,
  INVALID_REFRESH_TOKEN
} from "./codes"

const USERNAME_VALIDATOR = /^[a-zA-Z0-9 ._-]{3,36}$/
const EMAIL_VALIDATOR = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_VALIDATOR = /^[a-zA-Z0-9 .!@#$%^&*_-]{6,36}$/
const TOKEN_VALIDATOR = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
const REFRESH_TOKEN_VALIDATOR = /.*/

export function validation (...results) {
  const callback = results.pop()
  const returns = results.filter(result => result)

  if (returns.length) callback(returns)
  else callback(null)
}

export function usernameValidator (username) {
  if (username) {
    if (USERNAME_VALIDATOR.test(username)) return null
    else return INVALID_USERNAME
  }
  else return EMPTY_USERNAME
}

export function emailValidator (email) {
  if (email) {
    if (EMAIL_VALIDATOR.test(email)) return null
    else return INVALID_EMAIL
  }
  else return EMPTY_EMAIL
}

export function passwordValidator (password) {
  if (password) {
    if (PASSWORD_VALIDATOR.test(password)) return null
    else return INVALID_PASSWORD
  }
  else return EMPTY_PASSWORD
}

export function tokenValidator (token) {
  if (token) {
    if (TOKEN_VALIDATOR.test(token)) return null
    else return INVALID_TOKEN
  }
  else return EMPTY_TOKEN
}

export function refreshTokenValidator (refresh_token) {
  if (refresh_token) {
    if (refresh_token.length === 66) return null
    else return INVALID_REFRESH_TOKEN
  }
  else return EMPTY_REFRESH_TOKEN
}