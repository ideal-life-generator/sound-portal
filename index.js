import { createServer } from "http"
import { readFileSync } from "fs"
import { Server } from "ws"
import sessions from "./utils/ws-sessions"
import filesStreamInit from "./utils/file-stream"
import { parse } from "url"
import {
  APP_FOLDER,
  HTTP_SERVER_PATH,
  HTTP_SERVER_PORT
} from "./constants.js"
import { verification } from "./collections/users"
import controllers from "./controllers"
import validation, {
  idValidator,
  tokenValidator
} from "./globals/validation"

const filesStream = filesStreamInit(APP_FOLDER)
const httpServer = createServer(httpHandler)
const wsServer = new Server({
  server: httpServer
})
const connections = sessions({
  wsServer,
  protectedIdentifiers: [
    "user: request",
    "username: update"
  ],
  strategy ({ id, token }, success, failure) {
    validation(idValidator(id), tokenValidator(token), (errors) => {
      if (errors) console.log(`Invalid verification data: ${id}, ${token}. Errors: ${errors}.`)
      else {
        verification({ id, token }, (exists) => {
          if (exists) success()
          else failure("user: authentication error")
        })
      }
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

function httpHandler ({url }, res) {
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
}

connected(({
  current,
  currentSession,
  exceptCurrent,
  exceptCurrentSession,
  id,
  sessionId,
  socket
}) => {
  controllers({ currentSession, subscribe, sessionId })
})

httpServer.listen(HTTP_SERVER_PORT, HTTP_SERVER_PATH, () => {
  console.info(`listen on ${HTTP_SERVER_PATH}:${HTTP_SERVER_PORT}`)
})

process.on("uncaughtException", (error) => {
  console.error(error.stack)
})

// process.once("SIGUSR2", () => {
//   process.kill(process.pid, "SIGUSR2")
// })

// process.on("SIGINT", () => {
//   httpServer.close(() => {
//     process.exit(0)
//   })
// })

// process.on("SIGTERM", () => {
//   process.exit(0)
// })