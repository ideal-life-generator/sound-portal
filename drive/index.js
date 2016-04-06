import { readFileSync } from "fs"
import { join } from "path"
import { request } from "https"

export function getRefreshToken (code, callback) {
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

export function getToken (refreshToken, callback) {
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

export function files (token) {
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

export function getProfile (token, callback) {
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