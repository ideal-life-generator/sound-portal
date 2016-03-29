import pg from "pg"
import { DB_SERVER_PATH } from "../../config"

// CREATE TABLE users (
//   "id" SERIAL UNIQUE,
//   "username" CITEXT UNIQUE,
//   "email" CITEXT UNIQUE,
//   "token" uuid NOT NULL DEFAULT uuid_generate_v4(),
//   "refresh_token" TEXT UNIQUE
// );


/**
 * Insert and return new user
 *
 * @param {String} user.token
 * @param {String} user.refresh_token
 * @param {Funcion} callback(user)
 */

export function insert ({ refresh_token, token }, callback) {
  pg.connect(DB_SERVER_PATH, (error, db, done) => {
    if (error) throw error
    else {
      db.query(`
        INSERT INTO users (
          refresh_token
        )
        SELECT
          $1
        RETURNING id, token;
      `, [ refresh_token ], (error, result) => {
        done()

        if (error) throw error
        else {
          const { rows: [ user ] } = result

          callback(result.rows[0])
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
 * Check if current username is already used
 *
 * @param {String} username
 * @param {Funcion} callback(exists)
 */

export function checkUsername (username, callback) {
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
 * Check if user token is valid
 *
 * @param {Number} user.id
 * @param {String} user.token
 * @param {Funcion} callback(user)
 */

export function updateSessionId ({ id, token, sessionId }, callback) {
  pg.connect(DB_SERVER_PATH, (error, db, done) => {
    if (error) throw error
    else {
      db.query(`
        UPDATE users
        SET session_id = $3
        WHERE id = $1 AND token = $2
        RETURNING *;
      `, [ id, token, sessionId ], (error, result) => {
        done()

        console.log(result)

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
 * Check if user token is valid
 *
 * @param {Number} user.id
 * @param {String} user.token
 * @param {Funcion} callback(exists)
 */

export function tokenVerification ({ id, token }, callback) {
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