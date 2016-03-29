import {
  get,
  updateSessionId
} from "../collections/users"

export default function ({ subscribe, current, sessionId }) {
  subscribe("authorization", ({ id, token }) => {
    updateSessionId({ id, token, sessionId }, () => {
      if (exists) {
        get(id, (user) => {
          current("user", user)
        })
      }
    })
  })
}