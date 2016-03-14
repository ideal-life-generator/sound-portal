import { get } from "../db/users"

export default function ({ currentSession, subscribe }) {
  subscribe("login.request", ({ username, password }) => {
    get({ username, password }, (errors, user) => {
      if (errors) currentSession("login.response", errors)
      else currentSession("login.response", null, user)
    })
  })
}