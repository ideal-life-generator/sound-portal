import React from "react"
import { connect } from "react-redux"

export function Signup ({ }) {
  return (
    <form>
      Signup
    </form>
  )
}

function mapStateToProps ({ }) {
  return { }
}

export default connect(mapStateToProps)(Signup)