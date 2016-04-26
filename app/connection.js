import session from "utils/ws-session"

export const {
  connected,
  send,
  subscribe,
  subscribeOnce,
  updateVerificationData,
  destroyVerificationData,
  sessionId,
  socket
} = session(`ws://localhost:5000`)