import { createServer } from "http"
import pg from "pg"
import { Server } from "ws"
import sessions from "./server/ws-sessions"

import {
  HTTP_SERVER_PATH,
  HTTP_SERVER_PORT,
  SOCKET_SERVER_PATH,
  SOCKET_SERVER_PORT,
  DB_SERVER_PATH,
  APP_DIRECTORY,
  SUPPORTED_TEMPLATES,
  SUPPORTED_FILE_TYPES,
  DRIVE_ACCESSING_PATH
} from "./config"


import filesStreamConfig from "./server/file-stream"

const filesStream = filesStreamConfig({
  directory: APP_DIRECTORY,
  supportedTemplates: SUPPORTED_TEMPLATES,
  supportedFiles: SUPPORTED_FILE_TYPES
})

const httpServer = createServer((req, res) => {
  filesStream(req, res)
  if (req.url.includes("/drive-credentials")) {
    res.end(req.url)
  }
})

httpServer.listen(HTTP_SERVER_PORT, HTTP_SERVER_PATH, () => {
  console.info(`HTTP server is listening on ${HTTP_SERVER_PATH}:${HTTP_SERVER_PORT}.`)
})


import signin from "./server/api/signin"

// const api = new Set()
// api.add(signin)

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
      signin(db, subscribe, current)
    })
  }
})



// var fs = require("fs");
// var readline = require("readline");
// var google = require("googleapis");
// var googleAuth = require("google-auth-library");

// var SCOPES = ["https://www.googleapis.com/auth/drive.metadata.readonly"];
// var TOKEN_DIR = process.cwd() + "/";
// var TOKEN_PATH = TOKEN_DIR + "drive-nodejs-quickstart.json";

// // Load client secrets from a local file.""
// fs.readFile("client_secret.json", function processClientSecrets(err, content) {
//   if (err) {
//     console.log("Error loading client secret file: " + err);
//     return;
//   }
//   // Authorize a client with the loaded credentials, then call the
//   // Drive API.
//   authorize(JSON.parse(content), listFiles);
// });

// /**
//  * Create an OAuth2 client with the given credentials, and then execute the
//  * given callback function.
//  *
//  * @param {Object} credentials The authorization client credentials.
//  * @param {function} callback The callback to call with the authorized client.
//  */
// function authorize(credentials, callback) {
//   var clientSecret = credentials.web.client_secret;
//   var clientId = credentials.web.client_id;
//   var redirectUrl = credentials.web.redirect_uris[0];
//   var auth = new googleAuth();
//   var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

//   // Check if we have previously stored a token.
//   fs.readFile(TOKEN_PATH, function(err, token) {
//     if (err) {
//       getNewToken(oauth2Client, callback);
//     } else {
//       // oauth2Client.credentials = JSON.parse(token);
//       // callback(oauth2Client);
//     }
//   });
// }



//  // * Get and store new token after prompting for user authorization, and then
//  // * execute the given callback with the authorized OAuth2 client.
//  // *
//  // * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
//  // * @param {getEventsCallback} callback The callback to call with the authorized
//  // *     client.

 
// function getNewToken(oauth2Client, callback) {
//   var authUrl = oauth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: SCOPES
//   });
//   console.log("Authorize this app by visiting this url: ", authUrl);
//   var rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });
//   rl.question("Enter the code from that page here: ", function(code) {
//     rl.close();
//     oauth2Client.getToken(code, function(err, token) {
//       if (err) {
//         console.log("Error while trying to retrieve access token", err);
//         return;
//       }
//       oauth2Client.credentials = token;
//       storeToken(token);
//       callback(oauth2Client);
//     });
//   });
// }

// /**
//  * Store token to disk be used in later program executions.
//  *
//  * @param {Object} token The token to store to disk.
//  */
// function storeToken(token) {
//   try {
//     fs.mkdirSync(TOKEN_DIR);
//   } catch (err) {
//     if (err.code != "EEXIST") {
//       throw err;
//     }
//   }
//   fs.writeFile(TOKEN_PATH, JSON.stringify(token));
//   console.log("Token stored to " + TOKEN_PATH);
// }

// /**
//  * Lists the names and IDs of up to 10 files.
//  *
//  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
//  */
// function listFiles(auth) {
//   var service = google.drive("v3");
//   const req = service.files.list({
//     auth: auth,
//     pageSize: 10,
//     fields: "nextPageToken, files(id, name)"
//   }, function(err, response) {
//     if (err) {
//       console.log("The API returned an error: " + err);
//       return;
//     }
//     var files = response.files;
//     if (files.length == 0) {
//       console.log("No files found.");
//     } else {
//       // console.log("Files:");
//       for (var i = 0; i < files.length; i++) {
//         var file = files[i];
//         // console.log("%s (%s)", file.name, file.id);
//       }
//     }
//   });
// }

// function getToken (callback) {
//   const req = request({
//     method: "POST",
//     hostname: "www.googleapis.com",
//     path: "/oauth2/v4/token?client_id=205946784859-n4ckbriqes7j9etrh7dvm9608qr958qs.apps.googleusercontent.com&client_secret=WvMDMnSwHJmNNkNE1Enfd3Ux&refresh_token=1/c8ujebfqaU-qKrE3t7qRetHiwMkALRmpb-feZd6rX59IgOrJDtdun6zK6XiATCKT&grant_type=refresh_token"
//   }, (res) => {
//     let result = ""
//     res.on("data", (data) => {
//       result += data
//     })
//     res.on("end", (data) => {
//       callback(JSON.parse(result).access_token)
//     })
//   })
//   req.end()
// }

// function files (token) {
//   const req = request({
//     method: "GET",
//     hostname: "www.googleapis.com",
//     path: "/drive/v3/files?pageSize=10&fields=files(id,name),nextPageToken",
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   }, (res) => {
//     let result = ""
//     res.on("data", (data) => {
//       result += data
//     })
//     res.on("end", (data) => {
//       console.log(JSON.parse(result))
//     })
//   })
//   req.end()
// }

// getToken((token) => {
//   console.log(token)
//   files(token)
// })

// "https://accounts.google.com/o/oauth2/auth?access_type=offline&scope=https://www.googleapis.com/auth/drive.metadata.readonly&response_type=code&client_id=205946784859-n4ckbriqes7j9etrh7dvm9608qr958qs.apps.googleusercontent.com&redirect_uri=http://localhost:5000/drive-credentials"