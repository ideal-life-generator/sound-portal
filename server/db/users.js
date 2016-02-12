// CREATE TABLE users (
//   "id" SERIAL UNIQUE,
//   "email" CITEXT UNIQUE,
//   "password" TEXT,
//   "token" TEXT UNIQUE
// );

/*
  
  Errors codes:
    0 - unknown;
    5 - email is not available;

*/

import validation from "./../validation"
import passwordValidator from "./../validators/password"
import emailValidator from "./../validators/email"

function exists (db, email, callback) {
  validation(emailValidator(email), (err) => {
    if (err) { callback(err) }
    else {
      db.query(`
        SELECT EXISTS(SELECT 1 FROM users WHERE email=$1);
      `, [ email ], (err, result) => {
        if (err) {
          switch (err.code) {
            default:
              callback(0)
          }
        }
        else {
          const { rows: [ { exists } ] } = result
          if (exists) {
            callback(5)
          }
          else {
            callback(null, exists)
          }
        }
      })
    }
  })
}

function insert (db, { email, password, token }, callback) {
  validation(emailValidator(email), passwordValidator(password), (err) => {
    if (err) { callback(err) }
    else {
      db.query(`
        INSERT INTO users (
          "email",
          "password",
          "token"
        )
        SELECT
          $1,
          $2,
          $3
        RETURNING id, email, token;
      `, [ email, password, token ], (err, result) => {
        if (err) {
          switch (err.code) {
            case "23505":
              callback(5)
              break;
            default:
              callback(0)
          }
        }
        else {
          const { rows: [ user ] } = result
          callback(null, user)
        }
      })
    }
  })
}

export {
  exists,
  insert
}