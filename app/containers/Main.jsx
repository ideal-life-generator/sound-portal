import React from "react"
import { connect } from "react-redux"

import Signin from "components/Signin.jsx"

function Main ({ connection }) {
  return (
    <div>
      <Signin connection={connection} />
    </div>
  )
}

export default Main