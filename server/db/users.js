import { randomBytes } from "crypto"
import pg from "pg"
import {
  validation,
  usernameValidator,
  emailValidator,
  passwordValidator,
  tokenValidator,
  refreshTokenValidator
} from "./../utils/validation"

// CREATE TABLE users (
//   "id" SERIAL UNIQUE,
//   "username" CITEXT UNIQUE,
//   "email" CITEXT UNIQUE,
//   "password" TEXT,
//   "token" uuid NOT NULL DEFAULT uuid_generate_v4(),
//   "refresh_token" TEXT UNIQUE
// );

const DB_SERVER_PATH = "postgres://red_dragon:12345678@localhost:5432/sound_portal"

export function add ({ username, email, password, refresh_token }, callback) {
  validation(
    usernameValidator(username),
    emailValidator(email),
    passwordValidator(password),
    refreshTokenValidator(refresh_token)
  , (errors) => {
    if (errors) callback(errors)
    else {
      const checkUsernamePromise = new Promise((resolve, reject) => {
        checkUsername(username, (errors, exists) => {
          if (errors) reject(errors)
          else resolve(exists)
        })
      })
      const checkEmailPromise = new Promise((resolve, reject) => {
        checkEmail(email, (errors, exists) => {
          if (errors) reject(errors)
          else resolve(exists)
        })
      })

      Promise.all([ checkUsernamePromise, checkEmailPromise ])
        .then(([ existsUsername, existsEmail ]) => {
          const errors = [ ]

          if (existsUsername) errors.push(53)

          if (existsEmail) errors.push(68)

          if (errors.length) callback(errors)
          else {
            const token = randomBytes(16, "base64").toString("base64")
            pg.connect(DB_SERVER_PATH, (error, db, done) => {
              if (error) throw error
              else {
                db.query(`
                  INSERT INTO users (
                    "username",
                    "email",
                    "password",
                    "refresh_token"
                  )
                  SELECT
                    $1,
                    $2,
                    $3,
                    $4
                  WHERE NOT EXISTS (SELECT 1 FROM users WHERE username=$1 AND email=$2)
                  RETURNING id, username, email, token;
                `, [ username, email, password, refresh_token ], (error, result) => {
                  done()
                  if (error) throw error
                  else {
                    const { rows: [ user ] } = result

                    callback(null, user)
                  }
                })
              }
            })
          }
        }, (errors) => {
          callback(errors)
        })
    }
  })
}

export function get (username, callback) {
  validation(usernameValidator(username), (errors) => {
    if (errors) callback(errors)
    else {
      pg.connect(DB_SERVER_PATH, (error, db, done) => {
        if (error) throw error
        else {
          db.query(`
            SELECT
              id,
              username,
              email,
              token
            FROM users
            WHERE username=$1;
          `, [ username ], (error, result) => {
            done()
            if (error) throw error
            else {
              const { rows: [ user ] } = result

              callback(null, user)
            }
          })
        }
      })
    }
  })
}

export function checkUsername (username, callback) {
  validation(usernameValidator(username), (errors) => {
    if (errors) callback(errors)
    else {
      pg.connect(DB_SERVER_PATH, (error, db, done) => {
        if (error) throw error
        else {
          db.query(`
            SELECT EXISTS(
              SELECT 1 FROM users
              WHERE username=$1
            );
          `, [ username ], (error, result) => {
            done()
            if (error) throw error
            else {
              const { rows: [ { exists } ] } = result

              callback(null, exists)
            }
          })
        }
      })
    }
  })
}

export function checkEmail (email, callback) {
  validation(emailValidator(email), (errors) => {
    if (errors) callback(errors)
    else {
      pg.connect(DB_SERVER_PATH, (error, db, done) => {
        if (error) throw error
        else {
          db.query(`
            SELECT EXISTS(
              SELECT 1 FROM users
              WHERE email=$1
            );
          `, [ email ], (error, result) => {
            if (error) throw error
            else {
              const { rows: [ { exists } ] } = result

              callback(null, exists)
            }
          })
        }
      })
    }
  })
}

export function verification ({ username, token }, callback) {
  validation(
    usernameValidator(username),
    tokenValidator(token)
  , (errors) => {
    if (errors) callback(errors)
    else {
      pg.connect(DB_SERVER_PATH, (error, db, done) => {
        if (error) throw error
        else {
          db.query(`
            SELECT EXISTS(
              SELECT 1 FROM users
              WHERE username=$1 AND token=$2
            );
          `, [ username, token ], (error, result) => {
            done()
            if (error) throw error
            else {
              const { rows: [ { exists } ] } = result

              callback(null, exists)
            }
          })
        }
      })
    }
  })
}