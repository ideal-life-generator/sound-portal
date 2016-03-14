import { add } from "../db/users"
import { getRefreshToken } from "../google-drive"

export default function ({ currentSession, subscribe }) {
  subscribe("signup.refresh-token.request", (code) => {
    getRefreshToken(code, ({ refresh_token }) => {
      currentSession("signup.refresh-token.response", null, refresh_token)
    })
  })

  subscribe("signin.request", ({ username, email, password, refresh_token }) => {
    add({ username, email, password, refresh_token }, (errors, user) => {
      if (errors) currentSession("signin.response", errors)
      else currentSession("signin.response", null, user)
    })
  })
}