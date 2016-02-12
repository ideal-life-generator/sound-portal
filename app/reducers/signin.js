import {
  SIGNIN_USERNAME_INPUT,
  SIGNIN_EMAIL_INPUT,
  SIGNIN_PASSWORD_INPUT
} from "constants/signin"

export default function signin (state = { }, action) {
  switch (action.type) {
    case SIGNIN_USERNAME_INPUT:
      return {
        ...state,
        username: action.username
      }
    case SIGNIN_EMAIL_INPUT:
      return {
        ...state,
        email: action.email
      }
    case SIGNIN_PASSWORD_INPUT:
      return {
        ...state,
        password: action.password
      }
    default:
      return state
  }
}