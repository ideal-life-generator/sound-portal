import {
  USER_LOGGED,
  USER_LOGOUT,
  USER_REQUIRE_USERNAME,
  USER_SET
} from "constants/user"

export const initialState = {
  isLogged: false,
  isRequireUsername: false,
  id: null,
  username: null
}

export default function user (state = initialState, action) {
  switch (action.type) {
    case USER_LOGGED:
      return {
        ...state,
        isLogged: true,
        isRequireUsername: false
      }
    case USER_LOGOUT:
      return {
        ...state,
        isLogged: false,
        id: null,
        username: null
      }
    case USER_REQUIRE_USERNAME:
      return {
        ...state,
        isRequireUsername: true,
        id: action.id
      }
    case USER_SET:
      return {
        ...state,
        ...action.user
      }
    default:
      return state
  }
}