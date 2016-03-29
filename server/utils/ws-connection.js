/**
 * Build for server sockets relationships
 */

export default function (socket) {
  const connectedCallbacks = new Set()
  const subscribeCallbacks = new Map()

  socket.on("open", () => {
    connectedCallbacks.forEach((connectedCallback) => {
      connectedCallback()
    })
  })

  socket.on("message", (messageJSON) => {
    const {
      identifier,
      data
    } = JSON.parse(messageJSON)

    const subscribers = subscribeCallbacks.get(identifier)
    if (subscribers) {
      subscribers.forEach((subscriber) => {
        subscriber.apply(null, data)
      })
    }
  })

  function connected (callback) {
    connectedCallbacks.add(callback)
  }

  function subscribe (identifier, callback) {
    let subscribers = subscribeCallbacks.get(identifier)
    if (!subscribers) {
      subscribers = new Set()
      subscribeCallbacks.set(identifier, subscribers)
    }
    subscribers.add(callback)
  }

  function send (identifier, ...data) {
    const message = {
      identifier,
      data
    }
    const messageJSON = JSON.stringify(message)
    socket.send(messageJSON)
  }

  return {
    connected,
    subscribe,
    send
  }
}