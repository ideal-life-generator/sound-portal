import { createServer } from "http"
import pg from "pg"
import { Server } from "ws"
import sessions from "./server/ws-sessions"
import filesStreamInit from "./server/file-stream"
import { parse } from "url"
import authorization from "./server/api/authorization"
import { tokenVerification } from "./server/db/users"

const APP_FOLDER = "app"
const HTTP_SERVER_PATH = "localhost"
const HTTP_SERVER_PORT = 5000
const filesStream = filesStreamInit(APP_FOLDER)
const DB_SERVER_PATH = "postgres://red_dragon:12345678@localhost:5432/sound_portal"
const SOCKET_SERVER_PATH = "localhost"
const SOCKET_SERVER_PORT = 5001

const httpServer = createServer(({ url }, res) => {
  const { pathname } = parse(url)

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

pg.connect(DB_SERVER_PATH, (error, db, done) => {
  if (error) { throw error }
  else {
    const wsServer = new Server({
      server: httpServer,
      host: SOCKET_SERVER_PATH,
      port: SOCKET_SERVER_PORT
    })
    const connections = sessions({
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
    const {
      connected,
      single,
      session,
      exceptSingle,
      exceptSession,
      all,
      subscribe,
      setStrategy
    } = connections

    connected(({
      current,
      currentSession,
      exceptCurrent,
      exceptCurrentSession,
      socketId,
      socketSessionId,
      socket
    }) => {
      authorization(db, { currentSession, subscribe })
    })
  }
})

httpServer.listen(HTTP_SERVER_PORT, HTTP_SERVER_PATH, () => {
  console.info(`http server is listen on ${HTTP_SERVER_PATH}:${HTTP_SERVER_PORT}.`)
})

// process.on("uncaughtException", (error) => {
//   console.log(error)
// })