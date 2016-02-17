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

const httpServer = createServer(({ url, query, params }, res) => {
  if (url.includes("/google-offline-access")) {
    const { code } = qsParse(ursParse(url).query)
    getToken(code, (access) => {
      console.log(access)
    })
    res.end(url)
  }
  else {
    switch (url) {
      case "/":
        filesStream("index.html", res)
        break;
      default:
        filesStream(url, res)
    }
  }
})

httpServer.listen(HTTP_SERVER_PORT, HTTP_SERVER_PATH, () => {
  console.info(`http server is listen on ${HTTP_SERVER_PATH}:${HTTP_SERVER_PORT}.`)
})

const DB_SERVER_PATH = "postgres://red.dragon:12345678@localhost:5432/soundPortal"

const SOCKET_SERVER_PATH = "localhost"
const SOCKET_SERVER_PORT = 5001

import joinAPI from "./server/api/join"

pg.connect(DB_SERVER_PATH, (error, db, done) => {
  if (error) { throw error }
  else {
    const wsServer = new Server({
      server: httpServer,
      host: SOCKET_SERVER_PATH,
      port: SOCKET_SERVER_PORT
    })
    const { connections, single, session, exceptSingle, exceptSession, all, subscribe } = sessions(wsServer)
    connections(({ current, currentSession, exceptCurrent, exceptCurrentSession, socketId, socketSessionId, socket }) => {
      joinAPI(db, subscribe, current)
    })
  }
})

process.on("uncaughtException", function(error) {
  console.log(error)
});

const DRIVE_ACCESSING_PATH = `
  https://accounts.google.com/o/oauth2/auth?
    access_type=offline&scope=https://www.googleapis.com/auth/plus.me&
    response_type=code&
    client_id=205946784859-n4ckbriqes7j9etrh7dvm9608qr958qs.apps.googleusercontent.com&
    redirect_uri=http://localhost:5000/google-offline-access
`

import { readFileSync } from "fs"
import { join } from "path"
import { request } from "https"

// https://accounts.google.com/o/oauth2/token
// {
//   code: "4/kKLsle7hx3ecQgEHUi7UhAvKVvjkyr6VtGH4Bn951Xs#",
//   client_id: "205946784859-n4ckbriqes7j9etrh7dvm9608qr958qs.apps.googleusercontent.com",
//   client_secret: "WvMDMnSwHJmNNkNE1Enfd3Ux",
//   redirect_uri: "http://localhost:5000/google-offline-access",
//   grant_type: "authorization_code"
// }

// https://developers.google.com/identity/protocols/OAuth2WebServer

function getToken (code, callback) {
  const req = request({
    method: "POST",
    hostname: "googleapis.com",
    // path: "/oauth2/v4/token?code=" + code + "&client_id=205946784859-n4ckbriqes7j9etrh7dvm9608qr958qs.apps.googleusercontent.com&client_secret=WvMDMnSwHJmNNkNE1Enfd3Ux&redirect_uri=http://localhost:5000/google-offline-access&grant_type=authorization_code",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }, (res) => {
    let result = ""
    res.on("data", (data) => {
      result += data
    })
    res.on("end", (data) => {
      callback(JSON.parse(result))
    })
  })
  req.end()
}

function updateToken (refreshToken, callback) {
  const req = request({
    method: "POST",
    hostname: "googleapis.com",
    path: `/oauth2/v4/token?client_id=205946784859-n4ckbriqes7j9etrh7dvm9608qr958qs.apps.googleusercontent.com&client_secret=WvMDMnSwHJmNNkNE1Enfd3Ux&refresh_token=${refreshToken}&grant_type=refresh_token`
  }, (res) => {
    let result = ""
    res.on("data", (data) => {
      result += data
    })
    res.on("end", (data) => {
      callback(JSON.parse(result).access_token)
    })
  })
  req.end()
}

function files (token) {
  const req = request({
    method: "GET",
    hostname: "googleapis.com",
    path: "/drive/v3/files?pageSize=10&fields=files(id,name),nextPageToken",
    headers: {
      Authorization: `Bearer ${token}`
    }
  }, (res) => {
    let result = ""
    res.on("data", (data) => {
      result += data
    })
    res.on("end", (data) => {
      console.log(JSON.parse(result))
    })
  })
  req.end()
}

function profile (token) {
  const req = request({
    method: "GET",
    hostname: "googleapis.com",
    path: "/plus/v1/people/me",
    headers: {
      Authorization: `Bearer ${token}`
    }
  }, (res) => {
    let result = ""
    res.on("data", (data) => {
      result += data
    })
    res.on("end", (data) => {
      console.log(JSON.parse(result))
    })
  })
  req.end()
}

// const access = JSON.parse(readFileSync(join(process.cwd(), "drive-nodejs-quickstart.json")))
// console.log(access.refresh_token)

// updateToken(access.refresh_token, (token) => {
//   // files(token)
//   profile(token)
// })

// "https://accounts.google.com/o/oauth2/auth?access_type=offline&scope=https://www.googleapis.com/auth/drive.metadata.readonly&response_type=code&client_id=205946784859-n4ckbriqes7j9etrh7dvm9608qr958qs.apps.googleusercontent.com&redirect_uri=http://localhost:5000/drive-credentials"