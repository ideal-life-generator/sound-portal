import { createServer } from "http"
import pg from "pg"
import { Server } from "ws"
import sessions from "./server/utils/ws-sessions"
import filesStreamInit from "./server/utils/file-stream"
import { parse } from "url"
import login from "./server/api/login"
import signup from "./server/api/signup"
import { tokenVerification } from "./server/db/users"
import {
  APP_FOLDER,
  HTTP_SERVER_PATH,
  HTTP_SERVER_PORT,
  DB_SERVER_PATH,
  SOCKET_SERVER_PATH,
  SOCKET_SERVER_PORT
} from "./config.js"

const filesStream = filesStreamInit(APP_FOLDER)
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
      filesStream(pathname, res)
  }
})
const wsServer = new Server({
  server: httpServer,
  host: SOCKET_SERVER_PATH,
  port: SOCKET_SERVER_PORT
})
const connections = sessions({
  wsServer,
  secureIdentifiers: [
    "user.request",
    "user.delete.request"
  ],
  strategy ({ email, token }, success, cancel) {
    tokenVerification(db, { email, token }, (errors, exists) => {
      if (exists) success()
      else cancel(errors)
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
  subscribe
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
  login({ currentSession, subscribe })
  signup({ currentSession, subscribe })
})

httpServer.listen(HTTP_SERVER_PORT, HTTP_SERVER_PATH, () => {
  console.info(`http server is listen on ${HTTP_SERVER_PATH}:${HTTP_SERVER_PORT}.`)
})

process.on("uncaughtException", (error) => {
  console.log(error)
})