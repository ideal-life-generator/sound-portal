import {
  emailExist,
  insert,
  authorization,
  get,
  usernameExist,
  setUsername
} from "../collections/users"
import validation, {
  idValidator,
  emailValidator,
  usernameValidator,
  refreshTokenValidator
} from "../globals/validation"
import {
  USERS_USER_IS_NOT_DEFINED,
  USERS_USED_USERNAME
} from "../globals/codes"
import {
  getRefreshToken,
  getToken,
  getProfile
} from "../drive"

export default function ({ currentSession, subscribe }) {
  subscribe("signup: google code", (code) => {
    getRefreshToken(code, ({ refresh_token }) => {
      getToken(refresh_token, (token) => {
        getProfile(token, ({ email }) => {
          validation(refreshTokenValidator(refresh_token), emailValidator(email), (errors) => {
            if (errors) currentSession("signup: errors", errors)
            else {
              emailExist(email, (exists) => {
                if (exists) {
                  authorization(email, (user) => {
                    const { id, username, token } = user

                    currentSession("authenticate: get", { id, token })

                    currentSession("user: response", { id, username })
                  })
                } else {
                  insert({ email, refresh_token }, (user) => {
                    const { id, token } = user

                    currentSession("authenticate: get", { id, token })

                    currentSession("user: response", { id })
                  })
                }
              })
            }
          })
        })
      })
    })
  })

  subscribe("user: request", (id) => {
    validation(idValidator(id), (errors) => {
      if (errors) currentSession("user: errors", errors)
      else {
        get(id, (user) => {
          if (user) currentSession("user: response", user)
          else currentSession("user: errors", [ USERS_USER_IS_NOT_DEFINED ])
        })
      }
    })
  })

  subscribe("username: update", ({ id, username }) => {
    validation(idValidator(id), usernameValidator(username), (errors) => {
      if (errors) currentSession("username: errors", errors)
      else {
        usernameExist(username, (exists) => {
          if (exists) currentSession("username: errors", [ USERS_USED_USERNAME ])
          else {
            setUsername({ id, username }, (username) => {
              currentSession("username: updated", username)
            })
          }
        })
      }
    })
  })
}