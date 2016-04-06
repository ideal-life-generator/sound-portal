import {
  ok,
  strictEqual,
  deepEqual,
  deepStrictEqual,
  ifError
} from "assert"
import pg from "pg"
import { DB_SERVER_PATH } from "../../constants"
import {
  emailExist,
  insert,
  authorization,
  get,
  usernameExist,
  setUsername,
  checkUsername,
  updateSessionId,
  verification
} from "../../collections/users"

describe("Collections", () => {
  describe("users", () => {
    const testEmail = "test@email.com"
    const testUsername = "test username"
    const testRefreshToken = "1/Sd0T68Ppvwg2m7OEO6O8RtN7DTbI-VZd82PBLgfUdhMMEudVrK5jSpoR30zcRFq8"
    const testToken = "dd792763-d216-45f5-a5fb-28a376dc313d"
    const testSessionId = "85899320-f65f-11e5-86bb-49683c47ed6e"

    function getUser (refreshToken, callback) {
      pg.connect(DB_SERVER_PATH, (error, db, done) => {
        if (error) reject(error)
        else {
          db.query(`
            SELECT
              id,
              email,
              username,
              token
            FROM users
            WHERE email = $1;
          `, [ refreshToken ], (error, result) => {
            done()

            if (error) throw error
            else {
              const { rows: [ user ] } = result

              callback(user)
            }
          })
        }
      })
    }

    function deleteUser (testRefreshToken, callback) {
      pg.connect(DB_SERVER_PATH, (error, db, done) => {
        if (error) reject(error)
        else {
          db.query(`
            DELETE FROM users
            WHERE refresh_token = $1;
          `, [ testRefreshToken ], (error, result) => {
            done()

            if (error) throw error
            else callback()
          })
        }
      })
    }

    after(() => {
      return new Promise((resolve) => {
        deleteUser(testRefreshToken, resolve)
      })
    })

    it("emailExist()", (done) => {
      emailExist(testEmail, (exists) => {
        ifError(exists)

        done()
      })
    })

    it("insert()", (done) => {
      const testUser = {
        email: testEmail,
        refresh_token: testRefreshToken
      }

      insert(testUser, (user) => {
        getUser(testEmail, ({ id, email, token, session_id }) => {
          const expectedUser = { id, token }

          strictEqual(testEmail, email)

          ok(testToken, token)

          deepEqual(user, expectedUser)

          done()
        })
      })
    })

    it("authorization()", (done) => {
      getUser(testEmail, ({ id, username, token }) => {
        const expectedUser = { id, username, token }
        
        authorization(testEmail, (user) => {
          deepEqual(user, expectedUser)

          done()
        })
      })
    })

    it("get()", (done) => {
      getUser(testEmail, ({ id, username }) => {
        const expectedUser = { id, username }

        get(id, (user) => {
          deepEqual(user, expectedUser)

          done()
        })
      })
    })

    it("usernameExist()", (done) => {
      usernameExist(testUsername, (exists) => {
        ifError(exists)

        done()
      })
    })

    it("setUsername()", (done) => {
      getUser(testEmail, ({ id }) => {
        setUsername({ id, username: testUsername }, (username) => {
          strictEqual(username, testUsername)

          done()
        })
      })
    })

    it("verification()", (done) => {
      getUser(testEmail, ({ id, token }) => {
        const testUser = { id, token }

        verification(testUser, (exists) => {
          ok(exists)

          done()
        })
      })
    })
  })
})