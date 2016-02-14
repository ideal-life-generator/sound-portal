import { exists, insert } from "./../db/users"

export default function join (db, subscribe, current) {
  subscribe("join", ({ email, password }) => {
    console.log(email, password)
    insert(db, { email, password }, (errors, user) => {
      current("join", errors, user)
    })
  })
}