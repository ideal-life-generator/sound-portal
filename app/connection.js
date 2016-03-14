import session from "utils/ws-session"

export const {
  connected,
  send,
  subscribe,
  subscribeOnce,
  socketId,
  socketInstance,
  setSecure
} = session(`ws://localhost:5001`)