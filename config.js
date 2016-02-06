const HTTP_SERVER_PATH = "127.0.0.1"
const HTTP_SERVER_PORT = 5000

const SOCKET_SERVER_PORT = 3000

const APP_DIRECTORY = "app"

const SUPPORTED_TEMPLATES = [
  {
    test: /^\/$/,
    path: "index.html"
  },
  {
    test: /^\/signin$/,
    path: "additionals/signin.html"
  }
]

const SUPPORTED_FILE_TYPES = [
  {
    test: /.ico$/,
    contentType: "image/x-icon"
  },
  {
    test: /.html$/,
    contentType: "text/html"
  },
  {
    test: /.css$/,
    contentType: "text/css"
  },
  {
    test: /.js$/,
    contentType: "application/javascript"
  },
  {
    test: /.png$/,
    contentType: "image/png"
  },
  {
    test: /.ttf$/,
    contentType: "application/octet-stream"
  }
]

export { HTTP_SERVER_PATH, HTTP_SERVER_PORT, SOCKET_SERVER_PORT, APP_DIRECTORY, SUPPORTED_TEMPLATES, SUPPORTED_FILE_TYPES }