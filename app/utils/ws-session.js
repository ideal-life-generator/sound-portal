import { v1 } from "uuid"
import { parse } from "cookie"

export default function (url) {
  const connects = new Set()
  const subscribers = new Map()
  const socket = new WebSocket(url)
  const cookies = parse(document.cookie)
  let { "socket-session-id": sessionId } = cookies
  let verificationData = { }

  if (!sessionId) {
    sessionId = v1()

    document.cookie = `socket-session-id=${sessionId};`
  }

  socket.addEventListener("open", () => {
    connects.forEach((callback) => {
      callback()
    })

    connects.clear()
  })

  socket.addEventListener("message", (event) => {
    const { data: messageJSON } = event
    const { identifier, data } = JSON.parse(messageJSON)
    const callback = subscribers.get(identifier)

    if (callback) callback.apply(null, data)
  })

  function connected (callback) {
    connects.add(callback)

    return function unsubscribe () {
      connects.delete(callback)
    }
  }

  function send (identifier, ...data) {
    const messageJSON = JSON.stringify({
      identifier,
      data,
      verificationData
    })

    socket.send(messageJSON)
  }

  function subscribe (identifier, callback) {
    subscribers.set(identifier, callback)

    return function unsubscribe () {
      subscribers.delete(identifier)
    }
  }

  function subscribeOnce (identifier, callback) {
    const unsubscribe = subscribe(identifier, handler)

    function handler () {
      callback.apply(null, arguments)

      unsubscribe()
    }

    return unsubscribe
  }

  function updateVerificationData (data) {
    verificationData = {
      ...data
    }
  }

  function destroyVerificationData () {
    verificationData = { }
  }

  return {
    connected,
    send,
    subscribe,
    subscribeOnce,
    updateVerificationData,
    destroyVerificationData,
    sessionId,
    socket
  }
}