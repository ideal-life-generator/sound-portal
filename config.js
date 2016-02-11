const HTTP_SERVER_PATH = "localhost"
const HTTP_SERVER_PORT = 5000

const SOCKET_SERVER_PATH = "localhost"
const SOCKET_SERVER_PORT = 5001

const DB_SERVER_PATH = "postgres://postgres:postgres@localhost:5432/soundPortal"

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

const DRIVE_ACCESSING_PATH = `
  https://accounts.google.com/o/oauth2/auth?
    access_type=offline&
    scope=https://www.googleapis.com/auth/drive.metadata.readonly&
    response_type=code&
    client_id=205946784859-n4ckbriqes7j9etrh7dvm9608qr958qs.apps.googleusercontent.com&
    redirect_uri=http://localhost:5000/drive-credentials
`

const EMAIL_VALIDATOR = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const PASSWORD_VALIDATOR = /^.*(?=.{8,32})(?=.*[a-zA-Z]).*$/

export {
  HTTP_SERVER_PATH,
  HTTP_SERVER_PORT,
  SOCKET_SERVER_PATH,
  SOCKET_SERVER_PORT,
  DB_SERVER_PATH,
  APP_DIRECTORY,
  SUPPORTED_TEMPLATES,
  SUPPORTED_FILE_TYPES,
  DRIVE_ACCESSING_PATH,
  EMAIL_VALIDATOR,
  PASSWORD_VALIDATOR
}