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
  subscribe("signup", (code) => {
    getRefreshToken(code, ({ refresh_token }) => {
      getToken(refresh_token, (token) => {
        getProfile(token, ({ email }) => {
          validation(refreshTokenValidator(refresh_token), emailValidator(email), (errors) => {
            if (errors) currentSession("signup", errors)
            else {
              emailExist(email, (exists) => {
                if (exists) {
                  authorization(email, (fullUser) => {
                    const { id, username, token } = fullUser
                    const user = { id, username }
                    const authenticationData = { id, token }

                    currentSession("user", { user })

                    currentSession("authentication-data", { authenticationData })
                  })
                } else {
                  insert({ email, refresh_token }, (fullUser) => {
                    const { id, token } = fullUser
                    const user = { id }
                    const authenticationData = { id, token }

                    currentSession("user", { user })

                    currentSession("authentication-data", { authenticationData })
                  })
                }
              })
            }
          })
        })
      })
    })
  })

  subscribe("user", (id) => {
    validation(idValidator(id), (errors) => {
      if (errors) currentSession("user", { errors })
      else {
        get(id, (user) => {
          if (user) currentSession("user", { user })
          else {
            const errors = [ USERS_USER_IS_NOT_DEFINED ]

            currentSession("user", { errors })
          }
        })
      }
    })
  })

  subscribe("username", (usernameData) => {
    const { id, username } = usernameData

    validation(idValidator(id), usernameValidator(username), (errors) => {
      if (errors) currentSession("username", { errors })
      else {
        usernameExist(username, (exists) => {
          if (exists) {
            const errors = [ USERS_USED_USERNAME ]

            currentSession("username", { errors })
          }
          else {
            setUsername(usernameData, (username) => {
              currentSession("username", { username })
            })
          }
        })
      }
    })
  })
}