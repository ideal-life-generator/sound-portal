import session from "ws-session"

import { 
  SOCKET_SERVER_PATH,
  SOCKET_SERVER_PORT,
} from "./../config"

export const { connected, send, subscribe, subscribeOnce, socketId, socketInstance } = session(`ws://${SOCKET_SERVER_PATH}:${SOCKET_SERVER_PORT}`)