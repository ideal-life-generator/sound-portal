import {
  SIGNUP_ACTIVE,
  SIGNUP_NOT_ACTIVE,
  SIGNUP_USED,
  SIGNUP_NOT_USED,
  SIGNUP_SET_REFRESH_TOKEN,
  SIGNUP_REFRESH_TOKEN_SET_REQUIRED,
  SIGNUP_REFRESH_TOKEN_SET_UNSUCCESS,
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

export default function signup (state = {
  isActive: true,
  isUsed: true,
  username: "wsadas",
  usernameIsEmpty: false,
  usernameIsInvalid: false,
  usernameIsUsed: false,
  email: "dsdf@ddsa.sadas",
  emailIsEmpty: false,
  emailIsInvalid: false,
  emailIsUsed: false,
  password: "dasdsadaas",
  passwordIsEmpty: false,
  passwordIsInvalid: false,
  refresh_token: "1/cJfrzMKaMOfzBtNSAd5OYM-DYP_YJtea74oWWrGyVikMEudVrK5jSpoR30zcRFq6",
  refreshTokenIsRequired: false,
  refreshTokenIsSuccess: true,
  refreshTokenIsUnsuccess: false
}, action) {
  switch (action.type) {
    case SIGNUP_ACTIVE:
      return {
        ...state,
        isActive: true
      }
    case SIGNUP_NOT_ACTIVE:
      return {
        ...state,
        isActive: false
      }
    case SIGNUP_USED:
      return {
        ...state,
        isUsed: true
      }
    case SIGNUP_NOT_USED:
      return {
        ...state,
        isUsed: false
      }
    case SIGNUP_SET_REFRESH_TOKEN:
      return {
        ...state,
        refresh_token: action.refresh_token,
        refreshTokenIsSuccess: true,
        refreshTokenIsRequired: false,
        refreshTokenIsUnsuccess: false
      }
    case SIGNUP_REFRESH_TOKEN_SET_REQUIRED:
      return {
        ...state,
        refreshTokenIsRequired: true
      }
    case SIGNUP_REFRESH_TOKEN_SET_UNSUCCESS:
      return {
        ...state,
        refreshTokenIsUnsuccess: true
      }
    case SIGNUP_SET_USERNAME:
      return {
        ...state,
        username: action.username,
        usernameIsEmpty: false,
        usernameIsInvalid: false,
        usernameIsUsed: false
      }
    case SIGNUP_USERNAME_SET_EMPTY:
      return {
        ...state,
        usernameIsEmpty: true
      }
    case SIGNUP_USERNAME_SET_INVALID:
      return {
        ...state,
        usernameIsInvalid: true
      }
    case SIGNUP_USERNAME_SET_USED:
      return {
        ...state,
        usernameIsUsed: true
      }
    case SIGNUP_SET_EMAIL:
      return {
        ...state,
        email: action.email,
        emailIsEmpty: false,
        emailIsInvalid: false,
        emailIsUsed: false
      }
    case SIGNUP_EMAIL_SET_EMPTY:
      return {
        ...state,
        emailIsEmpty: true
      }
    case SIGNUP_EMAIL_SET_INVALID:
      return {
        ...state,
        emailIsInvalid: true
      }
    case SIGNUP_EMAIL_SET_USED:
      return {
        ...state,
        emailIsUsed: true
      }
    case SIGNUP_SET_PASSWORD:
      return {
        ...state,
        password: action.password,
        passwordIsEmpty: false,
        passwordIsInvalid: false
      }
    case SIGNUP_PASSWORD_SET_EMPTY:
      return {
        ...state,
        passwordIsEmpty: true
      }
    case SIGNUP_PASSWORD_SET_INVALID:
      return {
        ...state,
        passwordIsInvalid: true
      }
    default:
      return state
  }
}