import { createServer } from "http"
import pg from "pg"
import { Server } from "ws"
import sessions from "./server/ws-sessions"
import filesStreamInit from "./server/file-stream"

const APP_FOLDER = "app"

const HTTP_SERVER_PATH = "localhost"
const HTTP_SERVER_PORT = 5000

const filesStream = filesStreamInit(APP_FOLDER)

import { parse as ursParse } from "url"
import { parse as qsParse } from "qs"

const httpServer = createServer(({ url }, res) => {
  const { pathname } = ursParse(url)
  switch (pathname) {
    case "/google-access":
      filesStream("templates/google-access.html", res)
      break
    case "/":
      filesStream("index.html", res)
      break
    default:
      filesStream(url, res)
  }
})

httpServer.listen(HTTP_SERVER_PORT, HTTP_SERVER_PATH, () => {
  console.info(`http server is listen on ${HTTP_SERVER_PATH}:${HTTP_SERVER_PORT}.`)
})

const DB_SERVER_PATH = "postgres://red_dragon:12345678@localhost:5432/sound_portal"

const SOCKET_SERVER_PATH = "localhost"
const SOCKET_SERVER_PORT = 5001

import authorization from "./server/api/authorization"

import {
  tokenVerification
} from "./server/db/users"

pg.connect(DB_SERVER_PATH, (error, db, done) => {
  if (error) { throw error }
  else {
    const wsServer = new Server({
      server: httpServer,
      host: SOCKET_SERVER_PATH,
      port: SOCKET_SERVER_PORT
    })
    const { connections, single, session, exceptSingle, exceptSession, all, subscribe, setStrategy } = sessions({
      wsServer: wsServer,
      secureIdentifiers: [
        "user.request",
        "user.delete.request"
      ],
      strategy ({ email, token }, success, cancel) {
        tokenVerification(db, { email, token }, (errors, exists) => {
          if (exists) { success() }
          else { cancel(errors) }
        })
      }
    })
    connections(({ current, currentSession, exceptCurrent, exceptCurrentSession, socketId, socketSessionId, socket }) => {
      authorization(db, { currentSession, subscribe })
    })
  }
})

// process.on("uncaughtException", (error) => {
//   console.log(error)
// })