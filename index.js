import { createServer } from 'http'
import { resolve } from 'path'
import { createReadStream } from 'fs'
import connect from 'connect'
import serveStatic from 'serve-static'
import favicon from 'serve-favicon'
import { Server } from 'ws'
import sessions from './utils/ws-sessions'
import {
  APP_FOLDER,
  HTTP_SERVER_PATH,
  HTTP_SERVER_PORT
} from './config'
import { verification } from './collections/users'
import controllers from './controllers'
import validation, {
  idValidator,
  tokenValidator
} from './globals/validation'

const app = connect()
const httpServer = createServer(app)

app.use(serveStatic('app/static'))

app.use(favicon(resolve('public/favicon.ico')))

app.use((req, res) => {
  const { method, _parsedUrl: { pathname } } = req

  if (method === 'GET') {
    switch (pathname) {
      case '/google-access': {
        createReadStream(resolve('app/static/google-access.html')).pipe(res)
      }
    }
  }
})

const wsServer = new Server({ server: httpServer })

const connections = sessions({
  wsServer,
  protectedIdentifiers: [
    'user: request',
    'username: update'
  ],
  strategy ({ id, token }, success, failure) {
    validation(idValidator(id), tokenValidator(token), (errors) => {
      if (errors) console.log(`Invalid verification data: ${id}, ${token}. Errors: ${errors}.`)
      else {
        verification({ id, token }, (exists) => {
          if (exists) success()
          else failure('user: authentication error')
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

process.on('uncaughtException', (error) => {
  console.error(error.stack)
})

process.once('SIGUSR2', () => {
  process.kill(process.pid, 'SIGUSR2')
})

process.on('SIGINT', () => {
  httpServer.close(() => {
    process.exit(0)
  })
})

process.on('SIGTERM', () => {
  process.exit(0)
})



// const google = require('googleapis')
// const googleAuth = require('google-auth-library')
// const auth = new googleAuth()
// const clientId = '205946784859-n4ckbriqes7j9etrh7dvm9608qr958qs.apps.googleusercontent.com'
// const clientSecret = 'WvMDMnSwHJmNNkNE1Enfd3Ux'
// const redirectUrl = 'http://localhost:5000/google-offline-access'
// const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl)