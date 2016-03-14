import {
  SIGNUP_UPDATE_USERNAME,
  SIGNUP_EMPTY_USERNAME,
  SIGNUP_INVALID_USERNAME,
  SIGNUP_REQUIRED_USERNAME
} from "constants/signup"

const initialState = {
  username: "",
  usernameIsEmpty: false,
  usernameIsInvalid: false,
  usernameIsRequired: false
}

export default function signup (state = initialState, action) {
  switch (action.type) {
    case SIGNUP_UPDATE_USERNAME:
      return {
        ...state,
        username: action.username,
        usernameIsEmpty: false,
        usernameIsInvalid: false,
        usernameIsRequired: false
      }
    case SIGNUP_EMPTY_USERNAME:
      return {
        ...state,
        usernameIsEmpty: true,
        usernameIsInvalid: false,
        usernameIsRequired: false
      }
    case SIGNUP_INVALID_USERNAME:
      return {
        ...state,
        usernameIsEmpty: false,
        usernameIsInvalid: true,
        usernameIsRequired: false
      }
    case SIGNUP_REQUIRED_USERNAME:
      return {
        ...state,
        usernameIsEmpty: false,
        usernameIsInvalid: false,
        usernameIsRequired: true
      }
    default:
      return state
  }
}