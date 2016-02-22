import { parse } from "cookie"
import { generate } from "shortid"

export default function session (url) {
  const connects = new Set()
  const subscribes = new Map()

  let secure

  const cookieObj = parse(document.cookie)
  let { socketSessionId } = cookieObj
  if (!socketSessionId) {
    socketSessionId = generate()
    document.cookie = `socketSessionId=${socketSessionId};`
  }

  const socketInstance = new WebSocket(url)

  socketInstance.addEventListener("open", () => {
    connects.forEach(callback => callback())
  })

  socketInstance.addEventListener("message", event => {
    const { data: messageJSON } = event
    const { identifier, data } = JSON.parse(messageJSON)
    const callback = subscribes.get(identifier)
    if (Boolean(callback)) {
      callback.apply(null, data)
    }
  })

  function connected (callback) {
    connects.add(callback)
    return function unsubscribe () {
      connects.delete(callback)
    }
  }

  function send (identifier, ...data) {
    socketInstance.send(JSON.stringify({ identifier, data, secure }))
  }

  function subscribe (identifier, callback) {
    subscribes.set(identifier, callback)
    return function unsubscribe () {
      subscribes.delete(identifier)
    }
  }

  function subscribeOnce (identifier, callback) {
    function handler () {
      callback.apply(null, arguments)
      unsubscribe()
    }
    const unsubscribe = subscribe(identifier, handler)
    return unsubscribe
  }

  function setSecure (pairs) { secure = pairs }

  return {
    connected,
    send,
    subscribe,
    subscribeOnce,
    socketSessionId,
    socketInstance,
    setSecure
  }
}