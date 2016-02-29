import {
  LOGIN_ACTIVE,
  LOGIN_NOT_ACTIVE,
  LOGIN_SET_USERNAME,
  LOGIN_USERNAME_SET_EMPTY,
  LOGIN_USERNAME_SET_INVALID,
  LOGIN_SET_PASSWORD,
  LOGIN_PASSWORD_SET_EMPTY,
  LOGIN_PASSWORD_SET_INVALID
} from "actions/login"

export default function (login, action) {
  switch (action.type) {
    case LOGIN_ACTIVE:
      return {
        ...login,
        isActive: true
      }
    case LOGIN_NOT_ACTIVE:
      return {
        ...login,
        isActive: false
      }
    case LOGIN_SET_USERNAME:
      return {
        ...login,
        username: action.username,
        usernameIsEmpty: false,
        usernameIsInvalid: false
      }
    case LOGIN_USERNAME_SET_EMPTY:
      return {
        ...login,
        usernameIsEmpty: true
      }
    case LOGIN_USERNAME_SET_INVALID:
      return {
        ...login,
        usernameIsInvalid: true
      }
    case LOGIN_SET_PASSWORD:
      return {
        ...login,
        password: action.password,
        passwordIsEmpty: false,
        passwordIsInvalid: false
      }
    case LOGIN_PASSWORD_SET_EMPTY:
      return {
        ...login,
        passwordIsEmpty: true
      }
    case LOGIN_PASSWORD_SET_INVALID:
      return {
        ...login,
        passwordIsInvalid: true
      }
    default:
      return login
  }
}