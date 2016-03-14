import { parse } from "cookie"
import { generate } from "shortid"

export default function sessions ({ wsServer, secureIdentifiers, strategy }) {
  const sockets = new Map()
  const sessions = new Map()
  const identifiers = new Map()

  function connected (callback) {
    wsServer.on("connection", (socket) => {
      const { upgradeReq: { headers: { cookie } } } = socket

      if (cookie) {
        const { socketSessionId } = parse(cookie)

        if (socketSessionId) {
          const socketId = generate()
          const current = single.bind(null, socketId)
          const currentSession = session.bind(null, socketSessionId)
          const exceptCurrent = exceptSingle.bind(null, socketId)
          const exceptCurrentSession = exceptSession.bind(null, socketSessionId)

          sockets.set(socketId, socket)

          if (!sessions.has(socketSessionId)) sessions.set(socketSessionId, new Set())

          {
            const session = sessions.get(socketSessionId)

            session.add(socket)

            socket.on("message", (messageJSON) => {
              const message = JSON.parse(messageJSON)
              const { identifier, data } = message

              if (identifiers.has(identifier)) {
                const callback = identifiers.get(identifier)

                if (secureIdentifiers.includes(identifier)) {
                  const { secure } = message

                  strategy(secure, () => {
                    callback.apply(null, data)
                  }, (error) => {
                    callback.apply(null, error)
                  })
                } else callback.apply(null, data)
              }
            })

            socket.on("close", () => {
              sockets.delete(socketId)
              session.delete(socket)

              if (!session.size) sessions.delete(socketSessionId)

              socket.terminate()
            })
          }

          callback({
            current,
            currentSession,
            exceptCurrent,
            exceptCurrentSession,
            socketId,
            socketSessionId,
            socket
          })
        }
      }
      else {
        const socketId = generate()
        const current = single.bind(null, socketId)
        const exceptCurrent = exceptSingle.bind(null, socketId)

        sockets.set(socketId, socket)

        socket.on("message", (messageJSON) => {
          const message = JSON.parse(messageJSON)
          const { identifier, data } = message

          if (identifiers.has(identifier)) {
            const callback = identifiers.get(identifier)
            if (callback) callback.apply(null, data)
          }    
        })

        socket.on("close", () => {
          sockets.delete(socketId)

          socket.terminate()
        })

        callback({
          current,
          exceptCurrent,
          socketId,
          socket
        })
      }
    })
  }

  function single (socketId, identifier, ...data) {
    const socket = sockets.get(socketId)

    socket.send(JSON.stringify({ identifier, data }))
  }

  function session (socketSessionId, identifier, ...data) {
    const session = sessions.get(socketSessionId)
    const messageJSON = JSON.stringify({ identifier, data })

    session.forEach((socket) => {
      socket.send(messageJSON)
    })
  }

  function exceptSingle (socketId, identifier, ...data) {
    const messageJSON = JSON.stringify({ identifier, data })

    sockets.forEach((socket, id) => {
      if (id !== socketId) {
        socket.send(messageJSON)
      }
    })
  }

  function exceptSession (socketSessionId, identifier, ...data) {
    const messageJSON = JSON.stringify({ identifier, data })

    sessions.forEach((session, id) => {
      if (id !== socketSessionId) {
        session.forEach((socket) => {
          socket.send(messageJSON)
        })
      }
    })
  }

  function all (identifier, ...data) {
    const messageJSON = JSON.stringify({ identifier, data })
 
    sockets.forEach((socket) => {
      socket.send(messageJSON)
    })
  }

  function subscribe (identifier, callback) {
    identifiers.set(identifier, callback)
  }

  return {
    connected,
    single,
    session,
    exceptSingle,
    exceptSession,
    all,
    subscribe
  }
}