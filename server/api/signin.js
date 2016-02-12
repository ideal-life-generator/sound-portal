import { exists, insert } from "./../db/users"

export default function signin (db, subscribe, current) {
  subscribe("signin", ({ email, password }) => {
    insert(db, { email, password }, (errors, user) => {
      current("signin.response", errors, user)
    })
  })
}