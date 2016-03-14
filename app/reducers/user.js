import {
  USER_LOGGED,
  USER_LOGOUT,
  USER_SIGNUP
} from "constants/user"

export const initialState = {
  isLogged: false,
  inSignup: false
}

export default function user (state = initialState, action) {
  switch (action.type) {
    case USER_LOGGED:
      return {
        ...state,
        isLogged: true,
        inSignup: false
      }
    case USER_LOGOUT:
      return {
        ...state,
        isLogged: false
      }
    case USER_SIGNUP:
      return {
        ...state,
        inSignup: true
      }
    default:
      return state
  }
}