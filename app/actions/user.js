import {
  USER_LOGGED,
  USER_LOGOUT,
  USER_REQUIRE_USERNAME,
  USER_SET
} from "constants/user"
import { setItems } from "utils/multi-storage"

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

export function requireUsername (id) {
  return {
    type: USER_REQUIRE_USERNAME,
    id
  }
}

export function set (user) {
  return {
    type: USER_SET,
    user
  }
}

export function signup ({ id, token }) {
  setItems({ id, token })

  return function (dispatch, getState) {
    dispatch(requireUsername(id))
  }
}