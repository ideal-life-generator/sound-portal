import { exists, insert } from "./../db/users"

export default function join (db, subscribe, current) {
  subscribe("join", ({ email, password }) => {
    insert(db, { email, password }, (errors, user) => {
      current("join", errors, user)
    })
  })
  subscribe("join.check-email", ({ email }) => {
    exists(db, { email }, (errors) => {
      current("join.check-email", errors)
    })
  })
}