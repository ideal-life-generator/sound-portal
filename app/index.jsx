import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import store from "store"
import common from "styles/common.less"
import fontello from "styles/fontello.css"
import font from "fonts/fontello.woff"
import Main from "containers/Main.jsx"

render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById("app")
)