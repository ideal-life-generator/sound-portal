import {
  USER_LOGGED,
  USER_LOGOUT,
  USER_REQUIRE_USERNAME
} from "constants/user"

export const initialState = {
  isLogged: false,
  isRequireUsername: false,
  id: null,
  username: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOGGED:
      return {
        ...state,
        isLogged: true,
        isRequireUsername: false,
        ...action.user
      }
    case USER_LOGOUT:
      return {
        ...state,
        isLogged: false,
        isRequireUsername: false,
        id: null,
        username: null
      }
    case USER_REQUIRE_USERNAME:
      return {
        ...state,
        isRequireUsername: true,
        id: action.id
      }
    default:
      return state
  }
}