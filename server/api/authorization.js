import {
  usernameExist,
  emailExist,
  refreshTokenExist,
  addUser,
  getUser
} from "./../db/users"

export default function (db, { currentSession, subscribe }, current) {
  subscribe("authorization.login.request", ({ username, password }) => {
    getUser(db, { username, password }, (errors, user) => {
      if (errors) currentSession("authorization.login.response", errors)
      else currentSession("authorization.login.response", null, user)
    })
  })
  subscribe("authorization.google-drive.refresh-token.request", (code) => {
    getRefresh(code, ({ refresh_token }) => {
      currentSession("authorization.google-drive.refresh-token.response", null, refresh_token)
    })
  })
  subscribe("authorization.signin.request", ({ username, email, password, refresh_token }) => {
    const usernameExistPromise = new Promise((resolve, reject) => {
      usernameExist(db, username, (errors, exists) => {
        if (errors) reject(errors)
        else resolve(exists)
      })
    })
    const emailExistPromise = new Promise((resolve, reject) => {
      emailExist(db, email, (errors, exists) => {
        if (errors) reject(errors)
        else resolve(exists)
      })
    })
    const refreshTokenExistPromise = new Promise((resolve, reject) => {
      refreshTokenExist(db, refresh_token, (errors, exists) => {
        if (errors) reject(errors)
        else resolve(exists)
      })
    })
    Promise.all([ usernameExistPromise, emailExistPromise, refreshTokenExistPromise ])
    .then(([ existsUsername, existsEmail, existRefreshToken ]) => {
      const errors = [ ]
      if (existsUsername) errors.push(53)
      if (existsEmail) errors.push(68)
      if (existRefreshToken) errors.push(112)
      if (errors.length) currentSession("authorization.signin.response", errors)
      else {
        addUser(db, { username, email, password, refresh_token }, (errors, user) => {
          if (errors) currentSession("authorization.signin.response", errors)
          else currentSession("authorization.signin.response", null, user)
        })
      }
    }, (errors) => {
      console.log(errors)
      currentSession("authorization.signin.response", errors)
    })
  })
}

import { readFileSync } from "fs"
import { join } from "path"
import { request } from "https"

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