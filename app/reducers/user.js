import reducerInterface from "utils/reducer-interface"
import {
  USER_REQUEST,
  USER_LOGIN,
  USER_LOGIN_NOT_FULL,
  USER_AUTHENTICATION_ERROR,
  USER_SET_ADDITIONAL_DATA_USERNAME,
  USER_ADDITIONAL_DATA_USERNAME_EMPTY,
  USER_ADDITIONAL_DATA_USERNAME_INVALID,
  USER_LEAVE,
  USER_LOGOUT
} from "constants/user"
import { initialState, User } from "interfaces/user"

export default reducerInterface(initialState, User, {
  [USER_REQUEST]() {
    this.fetching()
  },

  [USER_LOGIN]({ user }) {
    this.full(user)
  },

  [USER_LOGIN_NOT_FULL]({ user }) {
    this.notFull(user)
  },

  [USER_AUTHENTICATION_ERROR]() {
    this.authenticationError()
  },

  [USER_SET_ADDITIONAL_DATA_USERNAME]({ username }) {
    this.setUsername(username)
  },

  [USER_ADDITIONAL_DATA_USERNAME_EMPTY]() {
    this.usernameIsEmpty()
  },

  [USER_ADDITIONAL_DATA_USERNAME_INVALID]() {
    this.usernameIsInvalid()
  },

  [USER_LEAVE]() {
    this.leave()
  },

  [USER_LOGOUT]() {
    this.logout()
  }
})