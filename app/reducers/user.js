import {
  UPDATE_USER,
  DELETE_USER,
  UPDATE_USERNAME
} from "constants/user"

export default function user (state = {
  user: {
    id: NaN,
    email: "",
    token: "",
    username: ""
  }
}, action) {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        user: action.user
      }
    case DELETE_USER:
      return {
        ...state,
        user: {
          id: NaN,
          email: "",
          token: "",
          username: ""
        }
      }
    case UPDATE_USERNAME:
      return {
        ...state,
        user: {
          ...state.user,
          username: action.username
        }
      }
    default:
      return state
  }
}