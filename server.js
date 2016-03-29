import { createServer } from "http"
import pg from "pg"
import { Server } from "ws"
import sessions from "./server/utils/ws-sessions"
import filesStreamInit from "./server/utils/file-stream"
import { parse } from "url"
import login from "./server/api/login"
import signup from "./server/api/signup"
import user from "./server/api/user"
import { tokenVerification } from "./server/collections/users"
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
  protectedRequests: [ "user" ],
  protectedResponses: [ "user" ],
  strategy: {
    request ({ sessionId, id, token }, success) {
      tokenVerification({ id, token, sessionId }, (exists) => {
        if (exists) success()
      })
    }
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
  id,
  sessionId,
  socket
}) => {
  login({ currentSession, subscribe })

  signup({ currentSession, subscribe, sessionId })

  user({ subscribe, current, sessionId })
})

httpServer.listen(HTTP_SERVER_PORT, HTTP_SERVER_PATH, () => {
  console.info(`http server is listen on ${HTTP_SERVER_PATH}:${HTTP_SERVER_PORT}`)
})

// process.once("SIGUSR2", () => {
//   console.log("Will be triggered when nodemon server is restar.")
//   process.kill(process.pid, "SIGUSR2")
// })

process.on("SIGINT", () => {
  httpServer.close(() => {
    process.exit(0)
  })
})

process.on("SIGTERM", () => {
  process.exit(0)
})

process.on("uncaughtException", (error) => {
  console.error(error.stack)
})