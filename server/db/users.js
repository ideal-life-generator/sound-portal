import { randomBytes } from "crypto"
import {
  validation,
  emailValidator,
  usernameValidator
} from "./../utils/validation"

// CREATE TABLE users (
//   "id" SERIAL UNIQUE,
//   "email" CITEXT UNIQUE,
//   "refresh_token" TEXT UNIQUE,
//   "username" CITEXT UNIQUE
// );

function existEmail (db, email, callback) {
  validation(emailValidator(email), (errors) => {
    if (errors) { callback(errors) }
    else {
      db.query(`
        SELECT EXISTS(SELECT 1 FROM users WHERE email=$1);
      `, [ email ], (error, result) => {
        if (error) { callback([ 0 ]) }
        else {
          const { rows: [ { exists } ] } = result
          callback(null, exists)
        }
      })
    }
  })
}

function get (db, email, callback) {
  validation(emailValidator(email), (errors) => {
    if (errors) { callback(errors) }
    else {
      db.query(`
        SELECT * FROM users WHERE email=$1;
      `, [ email ], (error, result) => {
        if (error) { console.log(error); callback([ 0 ]) }
        else {
          const { rows: [ user ] } = result
          callback(null, user)
        }
      })
    }
  })
}

function insert (db, { email, refresh_token }, callback) {
  validation(emailValidator(email), (errors) => {
    if (errors) { callback(errors) }
    else {
      const token = randomBytes(16, "base64").toString("base64")
      db.query(`
        INSERT INTO users (
          "email",
          "refresh_token",
          "token"
        )
        SELECT
          $1,
          $2,
          $3
        RETURNING id, email, token;
      `, [ email, refresh_token, token ], (error, result) => {
        if (error) { callback([ 0 ]) }
        else {
          const { rows: [ user ] } = result
          callback(null, user)
        }
      })
    }
  })
}

function update (db, { email, refresh_token }, callback) {
  validation(emailValidator(email), (errors) => {
    if (errors) { callback(errors) }
    else {
      const token = randomBytes(16, "base64").toString("base64")
      db.query(`
        UPDATE users SET
          refresh_token=$2,
          token=$3
        WHERE email=$1
        RETURNING id, email, token, username;
      `, [ email, refresh_token, token ], (error, result) => {
        if (error) { callback([ 0 ]) }
        else {
          const { rows: [ user ] } = result
          callback(null, user)
        }
      })
    }
  })
}

function tokenVerification (db, { email, token }, callback) {
  validation(emailValidator(email), (errors) => {
    if (errors) { callback(errors) }
    else {
      db.query(`
        SELECT EXISTS(
          SELECT 1 FROM users
          WHERE email=$1 AND token=$2
        );
      `, [ email, token ], (error, result) => {
        if (error) { callback([ 0 ]) }
        else {
          const { rows: [ { exists } ] } = result
          callback(null, exists)
        }
      })
    }
  })
}

function existUsername (db, username, callback) {
  validation(usernameValidator(username), (errors) => {
    if (errors) { callback(errors) }
    else {
      db.query(`
        SELECT EXISTS(
          SELECT 1 FROM users
          WHERE username=$1
        );
      `, [ username ], (error, result) => {
        if (error) { callback([ 0 ]) }
        else {
          const { rows: [ { exists } ] } = result
          callback(null, exists)
        }
      })
    }
  })
}

function updateUsername (db, { email, username }, callback) {
  validation(usernameValidator(username), (errors) => {
    if (errors) { callback(errors) }
    else {
      const token = randomBytes(16, "base64").toString("base64")
      db.query(`
        UPDATE users SET
          username=$2
        WHERE email=$1
        RETURNING username;
      `, [ email, username ], (error, result) => {
        if (error) { callback([ 0 ]) }
        else {
          const { rows: [ { username } ] } = result
          callback(null, username)
        }
      })
    }
  })
}

export {
  existEmail,
  insert,
  update,
  tokenVerification,
  existUsername,
  updateUsername
}