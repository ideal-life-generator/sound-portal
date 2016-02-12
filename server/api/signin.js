import { exists, insert } from "./../db/users"
import { randomBytes } from "crypto"

export default function signin (db, subscribe, current) {
  subscribe("signin", ({ email, password }) => {
    exists(db, email, (err, exists) => {
      if (err) { current("signin.response.exists", err) }
      else {
        if (!exists) {
          const token = randomBytes(16, "base64").toString("base64")
          insert(db, { email, password, token }, (err, user) => {
            current("signin.response", err, user)
          })
        }
        else {
          current("signin.response.exists", exists)
        }
      }
    })
  })
}