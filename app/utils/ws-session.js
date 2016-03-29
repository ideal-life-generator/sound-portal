import { v1 } from "uuid"
import { parse } from "cookie"

export default function session (url) {
  const connects = new Set()
  const subscribes = new Map()
  const socket = new WebSocket(url)
  const cookieObj = parse(document.cookie)
  let { "socket-session-id": sessionId } = cookieObj

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
    const callback = subscribes.get(identifier)

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
      data
    })

    socket.send(messageJSON)
  }

  function subscribe (identifier, callback) {
    subscribes.set(identifier, callback)

    return function unsubscribe () {
      subscribes.delete(identifier)
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

  return {
    connected,
    send,
    subscribe,
    subscribeOnce,
    sessionId,
    socket
  }
}