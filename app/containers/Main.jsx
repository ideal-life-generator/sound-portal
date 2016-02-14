import React from "react"
import { connect } from "react-redux"

import Join from "components/Join.jsx"

function Main ({ connection }) {
  return (
    <div>
      <Join connection={connection} />
    </div>
  )
}

export default Main