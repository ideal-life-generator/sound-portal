import { parse } from "cookie"

export default function sessions ({
  wsServer,
  protectedRequests,
  protectedResponses,
  strategy
}) {
  const sockets = new Map()
  const sessions = new Map()
  const identifiers = new Map()

  function connected (callback) {
    function generateId () {
      return generateId.id++
    }

    generateId.id = 0

    wsServer.on("connection", (socket) => {
      const { upgradeReq: { headers: { cookie } } } = socket
      
      if (cookie) {
        const { "socket-session-id": sessionId } = parse(cookie)

        if (sessionId) {
          const id = generateId()
          const current = single.bind(null, id)
          const currentSession = session.bind(null, sessionId)
          const exceptCurrent = exceptSingle.bind(null, id)
          const exceptCurrentSession = exceptSession.bind(null, sessionId)

          sockets.set(id, socket)

          if (!sessions.has(sessionId)) sessions.set(sessionId, new Set())

          {
            const session = sessions.get(sessionId)

            session.add(socket)

            socket.on("message", (messageJSON) => {
              const message = JSON.parse(messageJSON)
              const { identifier, data } = message

              if (identifiers.has(identifier)) {
                const callback = identifiers.get(identifier)

                if (protectedRequests.includes(identifier)) {
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
              sockets.delete(id)
              session.delete(socket)

              if (!session.size) sessions.delete(sessionId)

              socket.terminate()
            })
          }

          callback({
            current,
            currentSession,
            exceptCurrent,
            exceptCurrentSession,
            id,
            sessionId,
            socket
          })
        }
      }
      // else {
      //   const id = generate()
      //   const current = single.bind(null, id)
      //   const exceptCurrent = exceptSingle.bind(null, id)

      //   sockets.set(id, socket)

      //   socket.on("message", (messageJSON) => {
      //     const message = JSON.parse(messageJSON)
      //     const { identifier, data } = message

      //     if (identifiers.has(identifier)) {
      //       const callback = identifiers.get(identifier)
      //       if (callback) callback.apply(null, data)
      //     }    
      //   })

      //   socket.on("close", () => {
      //     sockets.delete(id)

      //     socket.terminate()
      //   })

      //   callback({
      //     current,
      //     exceptCurrent,
      //     id,
      //     socket
      //   })
      // }
    })
  }

  function single (id, identifier, ...data) {
    const socket = sockets.get(id)

    socket.send(JSON.stringify({ identifier, data }))
  }

  function session (sessionId, identifier, ...data) {
    const session = sessions.get(sessionId)
    const messageJSON = JSON.stringify({ identifier, data })

    session.forEach((socket) => {
      socket.send(messageJSON)
    })
  }

  function exceptSingle (id, identifier, ...data) {
    const messageJSON = JSON.stringify({ identifier, data })

    sockets.forEach((socket, collectedId) => {
      if (id !== collectedId) {
        socket.send(messageJSON)
      }
    })
  }

  function exceptSession (sessionId, identifier, ...data) {
    const messageJSON = JSON.stringify({ identifier, data })

    sessions.forEach((session, id) => {
      if (id !== sessionId) {
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