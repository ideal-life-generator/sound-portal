import {
  insert,
  checkEmail
} from "../collections/users"
import {
  validation,
  idValidator,
  usernameValidator,
  emailValidator,
  tokenValidator,
  refreshTokenValidator
} from "./../utils/validation"
import {
  USERS_USED_EMAIL,
  USERS_USED_USERNAME
} from "../utils/codes"
import {
  getRefreshToken,
  getToken,
  getProfile
} from "../google-drive"

export default function ({ currentSession, subscribe, socketSessionId }) {
  subscribe("signup.request", (code) => {
    getRefreshToken(code, ({ refresh_token }) => {
      insert({ refresh_token }, (user) => {
        currentSession("signin.response", null, user)
      })
    })
  })
}