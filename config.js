const HTTP_SERVER_PATH = "localhost"
const HTTP_SERVER_PORT = 5000

const SOCKET_SERVER_PATH = "localhost"
const SOCKET_SERVER_PORT = 5001

const DB_SERVER_PATH = "postgres://postgres:postgres@localhost:5432/soundPortal"

const APP_FOLDER = "app"

const DRIVE_ACCESSING_PATH = `
  https://accounts.google.com/o/oauth2/auth?
    access_type=offline&
    scope=https://www.googleapis.com/auth/drive.metadata.readonly&
    response_type=code&
    client_id=205946784859-n4ckbriqes7j9etrh7dvm9608qr958qs.apps.googleusercontent.com&
    redirect_uri=http://localhost:5000/drive-credentials
`

export {
  HTTP_SERVER_PATH,
  HTTP_SERVER_PORT,
  SOCKET_SERVER_PATH,
  SOCKET_SERVER_PORT,
  DB_SERVER_PATH,
  APP_FOLDER,
  DRIVE_ACCESSING_PATH
}