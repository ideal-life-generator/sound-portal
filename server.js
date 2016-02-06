import { createServer } from "http"
import path from "path"
// import { Server } from "ws"

import { HTTP_SERVER_PATH, HTTP_SERVER_PORT, SOCKET_SERVER_PORT, APP_DIRECTORY, SUPPORTED_TEMPLATES, SUPPORTED_FILE_TYPES } from "./config"

import filesStreamConfig from "./server/file-stream"

const filesStream = filesStreamConfig({
  directory: APP_DIRECTORY,
  supportedTemplates: SUPPORTED_TEMPLATES,
  supportedFiles: SUPPORTED_FILE_TYPES
})

createServer((req, res) => {
  filesStream(req, res)
}).listen(HTTP_SERVER_PORT, HTTP_SERVER_PATH, () => {
  console.info(`HTTP server is listening on ${HTTP_SERVER_PATH}:${HTTP_SERVER_PORT}.`)
})

// Server({ port: SOCKET_SERVER_PORT })