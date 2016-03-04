import {
  usernameExist,
  emailExist,
  refreshTokenExist,
  addUser,
  getUser
} from "../db/users"
import { getRefreshToken } from "../google-drive"

export default function (db, { currentSession, subscribe }) {
  subscribe("authorization.login.request", ({ username, password }) => {
    getUser(db, { username, password }, (errors, user) => {
      if (errors) currentSession("authorization.login.response", errors)
      else currentSession("authorization.login.response", null, user)
    })
  })

  subscribe("authorization.google-drive.refresh-token.request", (code) => {
    getRefreshToken(code, ({ refresh_token }) => {
      currentSession("authorization.google-drive.refresh-token.response", null, refresh_token)
    })
  })

  subscribe("authorization.signin.request", ({ username, email, password, refresh_token }) => {
    const usernameExistPromise = new Promise((resolve, reject) => {
      usernameExist(db, username, (errors, exists) => {
        if (errors) reject(errors)
        else resolve(exists)
      })
    })

    const emailExistPromise = new Promise((resolve, reject) => {
      emailExist(db, email, (errors, exists) => {
        if (errors) reject(errors)
        else resolve(exists)
      })
    })

    const refreshTokenExistPromise = new Promise((resolve, reject) => {
      refreshTokenExist(db, refresh_token, (errors, exists) => {
        if (errors) reject(errors)
        else resolve(exists)
      })
    })

    Promise.all([ usernameExistPromise, emailExistPromise, refreshTokenExistPromise ])
      .then(([ existsUsername, existsEmail, existRefreshToken ]) => {
        const errors = [ ]

        if (existsUsername) errors.push(53)

        if (existsEmail) errors.push(68)

        if (existRefreshToken) errors.push(112)

        if (errors.length) currentSession("authorization.signin.response", errors)
        else {
          addUser(db, { username, email, password, refresh_token }, (errors, user) => {
            if (errors) currentSession("authorization.signin.response", errors)
            else currentSession("authorization.signin.response", null, user)
          })
        }
      }, (errors) => {
        console.log(errors)
        currentSession("authorization.signin.response", errors)
      })
  })
}