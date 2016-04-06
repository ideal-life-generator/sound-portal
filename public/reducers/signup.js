import {
  SIGNUP_UPDATE_USERNAME,
  SIGNUP_EMPTY_USERNAME,
  SIGNUP_INVALID_USERNAME
} from "constants/signup"

const initialState = {
  usernameIsEmpty: false,
  usernameIsInvalid: false,
  username: ""
}

export default function signup (state = initialState, action) {
  switch (action.type) {
    case SIGNUP_UPDATE_USERNAME:
      return {
        ...state,
        usernameIsEmpty: false,
        usernameIsInvalid: false,
        username: action.username
      }
    case SIGNUP_EMPTY_USERNAME:
      return {
        ...state,
        usernameIsEmpty: true,
        usernameIsInvalid: false
      }
    case SIGNUP_INVALID_USERNAME:
      return {
        ...state,
        usernameIsEmpty: false,
        usernameIsInvalid: true
      }
    default:
      return state
  }
}