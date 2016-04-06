import pg from "pg"
import { DB_SERVER_PATH } from "../constants"

// CREATE TABLE users (
//   "id" SERIAL UNIQUE,
//   "username" CITEXT UNIQUE,
//   "email" CITEXT UNIQUE,
//   "token" uuid NOT NULL DEFAULT uuid_generate_v4(),
//   "refresh_token" TEXT UNIQUE
// );


/**
 * Check if current email is already used
 *
 * @param {String} email
 * @param {Funcion} callback(exists)
 */

export function emailExist (email, callback) {
  pg.connect(DB_SERVER_PATH, (error, db, done) => {
    if (error) throw error
    else {
      db.query(`
        SELECT EXISTS(
          SELECT 1 FROM users
          WHERE email=$1
        );
      `, [ email ], (error, result) => {
        done()

        if (error) throw error
        else {
          const { rows: [ { exists } ] } = result

          callback(exists)
        }
      })
    }
  })
}


/**
 * Signup when you want to create an new user
 *
 * @param {String} user.email
 * @param {String} user.refresh_token
 * @param {Funcion} callback(user)
 */

export function insert ({ email, refresh_token }, callback) {
  pg.connect(DB_SERVER_PATH, (error, db, done) => {
    if (error) throw error
    else {
      db.query(`
        INSERT INTO users (
          email,
          refresh_token
        )
        SELECT
          $1,
          $2
        RETURNING id, token;
      `, [ email, refresh_token ], (error, result) => {
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


/**
 * Get user data with authorization token
 *
 * @param {Number} email
 * @param {Funcion} callback(user)
 */

export function authorization (email, callback) {
  pg.connect(DB_SERVER_PATH, (error, db, done) => {
    if (error) throw error
    else {
      db.query(`
        SELECT
          id,
          username,
          token
        FROM users
        WHERE email = $1;
      `, [ email ], (error, result) => {
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


/**
 * Get user by id
 *
 * @param {Number} id
 * @param {Funcion} callback(user)
 */

export function get (id, callback) {
  pg.connect(DB_SERVER_PATH, (error, db, done) => {
    if (error) throw error
    else {
      db.query(`
        SELECT
          id,
          username
        FROM users
        WHERE id = $1;
      `, [ id ], (error, result) => {
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


/**
 * Check if current username is already used
 *
 * @param {String} username
 * @param {Funcion} callback(exists)
 */

export function usernameExist (username, callback) {
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

          callback(exists)
        }
      })
    }
  })
}


/**
 * Set user username
 *
 * @param {Number} user.id
 * @param {String} user.username
 * @param {Funcion} callback(username)
 */

export function setUsername ({ id, username }, callback) {
  pg.connect(DB_SERVER_PATH, (error, db, done) => {
    if (error) throw error
    else {
      db.query(`
        UPDATE users
        SET username = $2
        WHERE id = $1
        RETURNING username;
      `, [ id, username ], (error, result) => {
        done()

        if (error) throw error
        else {
          const { rows: [ { username } ] } = result

          callback(username)
        }
      })
    }
  })
}


/**
 * Check if user token is valid
 *
 * @param {Number} user.id
 * @param {String} user.token
 * @param {Funcion} callback(exists)
 */

export function verification ({ id, token }, callback) {
  pg.connect(DB_SERVER_PATH, (error, db, done) => {
    if (error) throw error
    else {
      db.query(`
        SELECT EXISTS(
          SELECT 1 FROM users
          WHERE id = $1 and token = $2
        );
      `, [ id, token ], (error, result) => {
        done()

        if (error) throw error
        else {
          const { rows: [ { exists } ] } = result

          callback(exists)
        }
      })
    }
  })
}