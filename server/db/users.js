import { randomBytes } from "crypto"
import {
  validation,
  usernameValidator,
  emailValidator,
  passwordValidator,
  tokenValidator,
  refreshTokenValidator
} from "./../utils/validation"

export function tokenVerification (db, { email, token }, callback) {
  validation(
    emailValidator(email),
    tokenValidator(token)
  , (errors) => {
    if (errors) callback(errors)
    else {
      db.query(`
        SELECT EXISTS(
          SELECT 1 FROM users
          WHERE email=$1 AND token=$2
        );
      `, [ email, token ], (error, result) => {
        if (error) {
          console.log(error)
          callback([ 0 ])
        }
        else {
          const { rows: [ { exists } ] } = result

          callback(null, exists)
        }
      })
    }
  })
}

export function usernameExist (db, username, callback) {
  validation(usernameValidator(username), (errors) => {
    if (errors) callback(errors)
    else {
      db.query(`
        SELECT EXISTS(
          SELECT 1 FROM users
          WHERE username=$1
        );
      `, [ username ], (error, result) => {
        if (error) {
          console.log(error)
          callback([ 0 ])
        }
        else {
          const { rows: [ { exists } ] } = result

          callback(null, exists)
        }
      })
    }
  })
}

export function emailExist (db, email, callback) {
  validation(emailValidator(email), (errors) => {
    if (errors) callback(errors)
    else {
      db.query(`
        SELECT EXISTS(
          SELECT 1 FROM users
          WHERE email=$1
        );
      `, [ email ], (error, result) => {
        if (error) {
          console.log(error)
          callback([ 0 ])
        }
        else {
          const { rows: [ { exists } ] } = result

          callback(null, exists)
        }
      })
    }
  })
}

export function refreshTokenExist (db, refresh_token, callback) {
  validation(refreshTokenValidator(refresh_token), (errors) => {
    if (errors) callback(errors)
    else {
      db.query(`
        SELECT EXISTS(
          SELECT 1 FROM users
          WHERE refresh_token=$1
        );
      `, [ refresh_token ], (error, result) => {
        if (error) {
          console.log(error)
          callback([ 0 ])
        }
        else {
          const { rows: [ { exists } ] } = result

          callback(null, exists)
        }
      })
    }
  })
}

export function addUser (db, { username, email, password, refresh_token }, callback) {
  validation(
    usernameValidator(username),
    emailValidator(email),
    passwordValidator(password),
    refreshTokenValidator(refresh_token),
  (errors) => {
    if (errors) callback(errors)
    else {
      const token = randomBytes(16, "base64").toString("base64")
      db.query(`
        INSERT INTO users (
          "username",
          "email",
          "password",
          "refresh_token",
          "token"
        )
        SELECT
          $1,
          $2,
          $3,
          $4,
          $5
        WHERE NOT EXISTS (SELECT 1 FROM users WHERE username=$1 AND email=$2)
        RETURNING id, username, email, refresh_token, token;
      `, [ username, email, password, refresh_token, token ], (error, result) => {
        if (error) {
          console.log(error)
          callback([ 0 ])
        }
        else {
          const { rows: [ user ] } = result

          callback(null, user)
        }
      })
    }
  })
}

export function getUser (db, { username, password }, callback) {
  validation(
    usernameValidator(username),
    passwordValidator(password)
  , (errors) => {
    if (errors) callback(errors)
    else {
      db.query(`
        SELECT
          id,
          username,
          email,
          token
        FROM users
        WHERE username=$1 AND password=$2;
      `, [ username, password ], (error, result) => {
        if (error) { callback([ 0 ]) }
        else {
          const { rows: [ user ] } = result

          callback(null, user)
        }
      })
    }
  })
}