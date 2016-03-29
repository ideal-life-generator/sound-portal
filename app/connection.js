import session from "utils/ws-session"

export const {
  connected,
  send,
  subscribe,
  subscribeOnce,
  sessionId,
  socket
} = session(`ws://localhost:5001`)