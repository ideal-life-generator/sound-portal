import {
  GOOGLE_AUTH_STATE,
  USERNAME_STATE,
  USER_STATE,
  USERNAME_CHANGE
} from "constants/join"

const googleAuthState = () => ({
  type: GOOGLE_AUTH_STATE
})

const usernameState = () => ({
  type: USERNAME_STATE
})

const userState = () => ({
  type: USER_STATE
})

const usernameChange = username => ({
  type: USERNAME_CHANGE,
  username
})

export {
  googleAuthState,
  usernameState,
  userState,
  usernameChange
}