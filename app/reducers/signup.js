import {
  SIGNUP_ACTIVE,
  SIGNUP_NOT_ACTIVE,
  SET_REFRESH_TOKEN,
  REFRESH_TOKEN_SET_REQUIRED,
  REFRESH_TOKEN_SET_UNSUCCESS,
  SIGNUP_SET_USERNAME,
  SIGNUP_USERNAME_SET_EMPTY,
  SIGNUP_USERNAME_SET_INVALID,
  SIGNUP_USERNAME_SET_USED,
  SIGNUP_SET_EMAIL,
  SIGNUP_EMAIL_SET_EMPTY,
  SIGNUP_EMAIL_SET_INVALID,
  SIGNUP_EMAIL_SET_USED,
  SIGNUP_SET_PASSWORD,
  SIGNUP_PASSWORD_SET_EMPTY,
  SIGNUP_PASSWORD_SET_INVALID
} from "actions/signup"

export default function (signup, action) {
  switch (action.type) {
    case SIGNUP_ACTIVE:
      return {
        ...signup,
        isActive: true
      }
    case SIGNUP_NOT_ACTIVE:
      return {
        ...signup,
        isActive: false
      }
    case SET_REFRESH_TOKEN:
      return {
        ...signup,
        refresh_token: action.refresh_token,
        refreshTokenIsSuccess: true,
        refreshTokenIsRequired: false,
        refreshTokenIsUnsuccess: false
      }
    case REFRESH_TOKEN_SET_REQUIRED:
      return {
        ...signup,
        refreshTokenIsRequired: true
      }
    case REFRESH_TOKEN_SET_UNSUCCESS:
      return {
        ...signup,
        refreshTokenIsUnsuccess: true
      }
    case SIGNUP_SET_USERNAME:
      return {
        ...signup,
        username: action.username,
        usernameIsEmpty: false,
        usernameIsInvalid: false,
        usernameIsUsed: false
      }
    case SIGNUP_USERNAME_SET_EMPTY:
      return {
        ...signup,
        usernameIsEmpty: true
      }
    case SIGNUP_USERNAME_SET_INVALID:
      return {
        ...signup,
        usernameIsInvalid: true
      }
    case SIGNUP_USERNAME_SET_USED:
      return {
        ...signup,
        usernameIsUsed: true
      }
    case SIGNUP_SET_EMAIL:
      return {
        ...signup,
        email: action.email,
        emailIsEmpty: false,
        emailIsInvalid: false,
        emailIsUsed: false
      }
    case SIGNUP_EMAIL_SET_EMPTY:
      return {
        ...signup,
        emailIsEmpty: true
      }
    case SIGNUP_EMAIL_SET_INVALID:
      return {
        ...signup,
        emailIsInvalid: true
      }
    case SIGNUP_EMAIL_SET_USED:
      return {
        ...signup,
        emailIsUsed: true
      }
    case SIGNUP_SET_PASSWORD:
      return {
        ...signup,
        password: action.password,
        passwordIsEmpty: false,
        passwordIsInvalid: false
      }
    case SIGNUP_PASSWORD_SET_EMPTY:
      return {
        ...signup,
        passwordIsEmpty: true
      }
    case SIGNUP_PASSWORD_SET_INVALID:
      return {
        ...signup,
        passwordIsInvalid: true
      }
    default:
      return signup
  }
}