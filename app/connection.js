import session from "ws-session"

export const {
  connected,
  send,
  subscribe,
  subscribeOnce,
  socketId,
  socketInstance,
  setSecure
} = session(`ws://localhost:5001`)