import {
  USER_LOGGED,
  USER_LOGOUT,
  USER_SIGNUP
} from "constants/user"

export function logged () {
  return {
    type: USER_LOGGED
  }
}
export function logout () {
  return {
    type: USER_LOGOUT
  }
}
export function signup () {
  return {
    type: USER_SIGNUP
  }
}