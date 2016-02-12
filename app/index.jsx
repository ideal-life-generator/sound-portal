import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"

import session from "ws-session"

import { 
  SOCKET_SERVER_PATH,
  SOCKET_SERVER_PORT,
} from "./../config"

import store from "./store"
import Main from "./containers/Main.jsx"

render(
  <Provider store={store}>
    <Main connection={session(`ws://${SOCKET_SERVER_PATH}:${SOCKET_SERVER_PORT}`)} />
  </Provider>,
  document.getElementById("app")
)