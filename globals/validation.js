import {
  UNKNOWN_ERROR,
  USERS_UNKNOWN_ERROR,
  USERS_EMTPY_ID,
  USERS_INVALID_ID,
  USERS_EMTPY_EMAIL,
  USERS_INVALID_EMAIL,
  USERS_USED_EMAIL,
  USERS_EMTPY_USERNAME,
  USERS_INVALID_USERNAME,
  USERS_USED_USERNAME,
  USERS_EMTPY_TOKEN,
  USERS_INVALID_TOKEN,
  USERS_EMTPY_REFRESH_TOKEN,
  USERS_INVALID_REFRESH_TOKEN,
  USERS_USER_IS_NOT_DEFINED
} from "./codes"

const USERNAME_VALIDATOR = /^[a-zA-Z0-9 ._-]{3,36}$/
const EMAIL_VALIDATOR = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const TOKEN_VALIDATOR = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
const REFRESH_TOKEN_VALIDATOR = /.*/

export default function validation (...results) {
  const callback = results.pop()
  const returns = results.filter(result => result)

  if (returns.length) callback(returns)
  else callback(null)
}

export function idValidator (id) {
  if (id) {
    if (typeof id === "number") return null
    else return USERS_INVALID_ID
  }
  else return USERS_EMTPY_ID
}

export function emailValidator (email) {
  if (email) {
    if (EMAIL_VALIDATOR.test(email)) return null
    else return USERS_INVALID_EMAIL
  }
  else return USERS_EMTPY_EMAIL
}

export function usernameValidator (username) {
  if (username) {
    if (USERNAME_VALIDATOR.test(username)) return null
    else return USERS_INVALID_USERNAME
  }
  else return USERS_EMTPY_USERNAME
}

export function tokenValidator (token) {
  if (token) {
    if (TOKEN_VALIDATOR.test(token)) return null
    else return USERS_INVALID_TOKEN
  }
  else return USERS_EMTPY_TOKEN
}

export function refreshTokenValidator (refresh_token) {
  if (refresh_token) {
    if (refresh_token.length === 66) return null
    else return USERS_INVALID_REFRESH_TOKEN
  }
  else return USERS_EMTPY_REFRESH_TOKEN
}