import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import store from "store"
import Main from "components/Main.jsx"
import "styles/common.less"
import "styles/fontello.css"
import "fonts/fontello.woff"

render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById("app")
)