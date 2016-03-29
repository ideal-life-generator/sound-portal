import {
  ok,
  strictEqual,
  deepEqual,
  deepStrictEqual,
  ifError
} from "assert"
import {
  insert,
  setUsername,
  checkUsername,
  get,
  tokenVerification
} from "../../server/collections/users"
import pg from "pg"
import {
  DB_SERVER_PATH
} from "../../config"

describe("Collections", () => {
  describe("users", () => {
    const testUsername = "test username"
    const testRefreshToken = "1/Sd0T68Ppvwg2m7OEO6O8RtN7DTbI-VZd82PBLgfUdhMMEudVrK5jSpoR30zcRFq8"

    function getNewUser (refreshToken, callback) {
      pg.connect(DB_SERVER_PATH, (error, db, done) => {
        if (error) reject(error)
        else {
          db.query(`
            SELECT
              id,
              token
            FROM users
            WHERE refresh_token = $1;
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

    function getFullUser (refreshToken, callback) {
      pg.connect(DB_SERVER_PATH, (error, db, done) => {
        if (error) reject(error)
        else {
          db.query(`
            SELECT
              id,
              username,
              token
            FROM users
            WHERE refresh_token = $1;
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

    it("insert()", (done) => {
      const testUser = {
        refresh_token: testRefreshToken
      }

      insert(testUser, (user) => {
        getNewUser(testRefreshToken, (expectedUser) => {
          deepEqual(user, expectedUser)

          done()
        })
      })
    })

    it("setUsername()", (done) => {
      getFullUser(testRefreshToken, ({ id }) => {
        const testUser = {
          id,
          username: testUsername
        }

        setUsername(testUser, (username) => {
          strictEqual(username, testUsername)

          done()
        })
      })
    })

    it("get()", (done) => {
      getFullUser(testRefreshToken, (expectedUser) => {
        const {
          id: expectedUserId
        } = expectedUser

        get(expectedUserId, (user) => {
          deepEqual(user, expectedUser)

          done()
        })
      })
    })

    it("tokenVerification()", (done) => {
      getFullUser(testRefreshToken, ({ id, token }) => {
        const testUser = {
          id,
          token
        }

        tokenVerification(testUser, (exists) => {
          ok(exists)

          done()
        })
      })
    })
  })
})