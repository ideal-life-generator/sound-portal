import {
  GOOGLE_AUTH_STATE,
  USERNAME_STATE,
  USER_STATE,
  USERNAME_CHANGE
} from "constants/join"

export default function user (state = {
  state: 0,
  username: {
    isEmpty: false,
    isInvalid: false,
    isNotAvailable: false,
    username: ""
  }
}, action) {
  switch (action.type) {
    case GOOGLE_AUTH_STATE:
      return {
        ...state,
        state: 0
      }
    case USERNAME_STATE:
      return {
        ...state,
        state: 1
      }
    case USER_STATE:
      return {
        ...state,
        state: 2
      }
    case USERNAME_CHANGE:
      return {
        ...state,
        username: {
          ...state.username,
          username: action.username
        }
      }
    default:
      return state
  }
}