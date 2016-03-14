import assert from "assert"
import WebSocket, { Server } from "ws"
import sessions from "../server/utils/ws-sessions"
import connection from "../server/utils/ws-connection"
import {
  SOCKET_SERVER_PATH,
  SOCKET_SERVER_PORT
} from "../config.js"

const testIdentifierResponse = "test.identifier.response"
const testIdentifierRequest = "test.identifier.request"
const testRequestData = "test request data"
const testResponseData = "test response data"
const wsServer = new Server({
  host: SOCKET_SERVER_PATH,
  port: SOCKET_SERVER_PORT
})
const {
  connected: sessionsConnected,
  subscribe: sessionSubscribe
} = sessions({ wsServer })

describe("ws-connection", () => {
  it("connected", (done) => {
    const webSocket = new WebSocket(`ws://${SOCKET_SERVER_PATH}:${SOCKET_SERVER_PORT}`)
    const { connected } = connection(webSocket)
    connected(() => {
      done()
    })
  })

  it("subscribe", (done) => {
    const webSocket = new WebSocket(`ws://${SOCKET_SERVER_PATH}:${SOCKET_SERVER_PORT}`)
    const { subscribe } = connection(webSocket)
    subscribe(testIdentifierResponse, (data) => {
      assert.strictEqual(data, testResponseData)
      done()
    })
    sessionsConnected(({ current }) => {
      current(testIdentifierResponse, testResponseData)
    })
  })

  it("send", (done) => {
    const webSocket = new WebSocket(`ws://${SOCKET_SERVER_PATH}:${SOCKET_SERVER_PORT}`)
    const { connected, send } = connection(webSocket)
    connected(() => {
      send(testIdentifierRequest, testRequestData)
    })
    sessionSubscribe(testIdentifierRequest, (data) => {
      assert.strictEqual(data, testRequestData)
      done()
    })
  })
})