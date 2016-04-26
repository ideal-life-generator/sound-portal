import React from "react"
import { connect } from "react-redux"

export default function Username (props) {
  const { username } = props

  return (
    <div className="username">
      {username}
    </div>
  )
}

function mapStateToProps (state) {
  const {
    user: { username }
  } = state
  
  return { username }
}

export default connect(mapStateToProps)(Username)