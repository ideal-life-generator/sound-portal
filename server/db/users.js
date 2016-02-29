import { randomBytes } from "crypto"
import {
  validation,
  usernameValidator,
  emailValidator,
  passwordValidator,
  tokenVerificator,
  refreshTokenValidator
} from "./../utils/validation"

// CREATE TABLE users (
//   "id" SERIAL UNIQUE,
//   "username" CITEXT UNIQUE,
//   "email" CITEXT UNIQUE,
//   "password" TINYTEXT,
//   "refresh_token" TINYTEXT UNIQUE,
//   "token" TINYTEXT UNIQUE
// );

function tokenVerification (db, { email, token }, callback) {
  validation(
    emailValidator(email),
    tokenVerificator(token)
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

function usernameExist (db, username, callback) {
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

function emailExist (db, email, callback) {
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

function refreshTokenExist (db, refresh_token, callback) {
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

function addUser (db, { username, email, password, refresh_token }, callback) {
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

function getUser (db, { username, password }, callback) {
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

function get (db, email, callback) {
  validation(emailValidator(email), (errors) => {
    if (errors) callback(errors)
    else {
      db.query(`
        SELECT
          id,
          email,
          username
        FROM users WHERE email=$1;
      `, [ email ], (error, result) => {
        if (error) { callback([ 0 ]) }
        else {
          const { rows: [ user ] } = result
          callback(null, user)
        }
      })
    }
  })
}

function deleteToken (db, { email }, callback) {
  validation(emailValidator(email), (errors) => {
    if (errors) callback(errors)
    else {
      db.query(`
        UPDATE users SET
          refresh_token='',
          token=''
        WHERE email=$1;
      `, [ email ], (error) => {
        if (error) { callback([ 0 ]) }
        else { callback() }
      })
    }
  })
}

function existEmail (db, email, callback) {
  validation(emailValidator(email), (errors) => {
    if (errors) callback(errors)
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

function insert (db, { email, refresh_token }, callback) {
  validation(emailValidator(email), (errors) => {
    if (errors) callback(errors)
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
    if (errors) callback(errors)
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

function existUsername (db, username, callback) {
  validation(usernameValidator(username), (errors) => {
    if (errors) callback(errors)
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
  validation(emailValidator(email), usernameValidator(username), (errors) => {
    if (errors) callback(errors)
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
          callback(null, username)
        }
      })
    }
  })
}

export {
  tokenVerification,
  usernameExist,
  emailExist,
  refreshTokenExist,
  getUser,
  addUser
}