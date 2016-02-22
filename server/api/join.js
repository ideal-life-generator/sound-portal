import {
  get,
  existEmail,
  insert,
  update,
  tokenVerification,
  existUsername,
  updateUsername,
  deleteToken
} from "./../db/users"

export default function (db, { currentSession, subscribe }, current) {
  subscribe("user.request", email => {
    get(db, email, (errors, user) => {
      if (errors) { currentSession("user.response", errors) }
      else { currentSession("user.response", null, user) }
    })
  })
  subscribe("user.delete.request", ({ email, token }) => {
    deleteToken(db, { email }, errors => {
      if (errors) { currentSession("user.delete.response", errors) }
      else { currentSession("user.delete.response") }
    })
  })
  subscribe("join.google-auth", code => {
    getRefresh(code, ({ refresh_token }) => {
      getToken(refresh_token, token => {
        profile(token, ({ email }) => {
          existEmail(db, email, (errors, exists) => {
            if (errors) { currentSession("join.google-auth", errors) }
            else if (!exists) {
              insert(db, { email, refresh_token }, (errors, user) => {
                if (errors) { currentSession("join.google-auth", errors) }
                else { currentSession("join.google-auth", null, user) }
              })
            }
            else {
              update(db, { email, refresh_token }, (errors, user) => {
                if (errors) { currentSession("join.google-auth", errors) }
                else { currentSession("join.google-auth", null, user) }
              })
            }
          })
        })
      })
    })
  })
  // subscribe("user.check", ({ email, token }) => {
  //   tokenVerification(db, { email, token }, (errors, exists) => {
  //     if (errors) { currentSession("user.check", errors) }
  //     else if (exists) {
  //       deleteToken(db, { email }, errors => {
  //         if (errors) { currentSession("user.check", errors) }
  //         else { currentSession("user.check") }
  //       })
  //     }
  //   })
  // })
  subscribe("join.username.request", ({ email, token, username }) => {
    existUsername(db, username, (errors, exists) => {
      if (errors) { currentSession("join.username.response", errors) }
      else if (!exists) {
        updateUsername(db, { email, username }, (errors, username) => {
          if (errors) { currentSession("join.username.response", errors) }
          else { currentSession("join.username.response", null, username) }
        })
      }
      else { currentSession("join.username.response", [ 4 ]) }
    })
  })
}


const DRIVE_ACCESSING_PATH = `
  https://accounts.google.com/o/oauth2/auth?
    client_id=205946784859-n4ckbriqes7j9etrh7dvm9608qr958qs.apps.googleusercontent.com&
    scope=emails&
    access_type=offline&
    response_type=code&
    prompt=consent&
    redirect_uri=http://localhost:5000/google-access
`

/*
https://accounts.google.com/o/oauth2/auth?client_id=205946784859-n4ckbriqes7j9etrh7dvm9608qr958qs.apps.googleusercontent.com&scope=email&access_type=offline&response_type=code&prompt=consent&redirect_uri=http://localhost:5000/google-access
*/

import { readFileSync } from "fs"
import { join } from "path"
import { request } from "https"

// https://accounts.google.com/o/oauth2/token
// {
//   code: "4/kKLsle7hx3ecQgEHUi7UhAvKVvjkyr6VtGH4Bn951Xs#",
//   client_id: "205946784859-n4ckbriqes7j9etrh7dvm9608qr958qs.apps.googleusercontent.com",
//   client_secret: "WvMDMnSwHJmNNkNE1Enfd3Ux",
//   redirect_uri: "http://localhost:5000/google-access",
//   grant_type: "authorization_code"
// }

// https://developers.google.com/identity/protocols/OAuth2WebServer

function getRefresh (code, callback) {
  const req = request({
    method: "POST",
    hostname: "www.googleapis.com",
    path:
      "/oauth2/v4/token?"
      + "client_id=205946784859-n4ckbriqes7j9etrh7dvm9608qr958qs.apps.googleusercontent.com&"
      + "client_secret=WvMDMnSwHJmNNkNE1Enfd3Ux&"
      + "grant_type=authorization_code&"
      + "redirect_uri=http://localhost:5000/google-access&"
      + `code=${code}`,
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

function getToken (refreshToken, callback) {
  const req = request({
    method: "POST",
    hostname: "www.googleapis.com",
    path:
      "/oauth2/v4/token?"
      + "client_id=205946784859-n4ckbriqes7j9etrh7dvm9608qr958qs.apps.googleusercontent.com&"
      + "client_secret=WvMDMnSwHJmNNkNE1Enfd3Ux&"
      + "grant_type=refresh_token&"
      + `refresh_token=${refreshToken}`
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
    hostname: "www.googleapis.com",
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

function profile (token, callback) {
  const req = request({
    method: "GET",
    hostname: "www.googleapis.com",
    path: "/plus/v1/people/me/openIdConnect",
    headers: {
      Authorization: `Bearer ${token}`
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

// const access = JSON.parse(readFileSync(join(process.cwd(), "drive-nodejs-quickstart.json")))
// console.log(access.refresh_token)

// getToken("1/HKVTrApTOR9A-mxGeF0ni3wjK2NsyCS5vbx_lBHAM70", (token) => {
//   // files(token)
//   profile(token)
// })