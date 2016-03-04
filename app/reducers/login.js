import {
  LOGIN_ACTIVE,
  LOGIN_NOT_ACTIVE,
  LOGIN_USED,
  LOGIN_NOT_USED,
  LOGIN_SET_USERNAME,
  LOGIN_USERNAME_SET_EMPTY,
  LOGIN_USERNAME_SET_INVALID,
  LOGIN_SET_PASSWORD,
  LOGIN_PASSWORD_SET_EMPTY,
  LOGIN_PASSWORD_SET_INVALID
} from "actions/login"

export default function login (state = {
  isActive: false,
  isUsed: false,
  username: "abc",
  usernameIsEmpty: false,
  usernameIsInvalid: false,
  password: "12345678",
  passwordIsEmpty: false,
  passwordIsInvalid: false
}, action) {
  switch (action.type) {
    case LOGIN_ACTIVE:
      return {
        ...state,
        isActive: true
      }
    case LOGIN_NOT_ACTIVE:
      return {
        ...state,
        isActive: false
      }
    case LOGIN_USED:
      return {
        ...state,
        isUsed: true
      }
    case LOGIN_NOT_USED:
      return {
        ...state,
        isUsed: false
      }
    case LOGIN_SET_USERNAME:
      return {
        ...state,
        username: action.username,
        usernameIsEmpty: false,
        usernameIsInvalid: false
      }
    case LOGIN_USERNAME_SET_EMPTY:
      return {
        ...state,
        usernameIsEmpty: true
      }
    case LOGIN_USERNAME_SET_INVALID:
      return {
        ...state,
        usernameIsInvalid: true
      }
    case LOGIN_SET_PASSWORD:
      return {
        ...state,
        password: action.password,
        passwordIsEmpty: false,
        passwordIsInvalid: false
      }
    case LOGIN_PASSWORD_SET_EMPTY:
      return {
        ...state,
        passwordIsEmpty: true
      }
    case LOGIN_PASSWORD_SET_INVALID:
      return {
        ...state,
        passwordIsInvalid: true
      }
    default:
      return state
  }
}