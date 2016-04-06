import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { subscribe } from "connection"
import { sendUsername } from "actions/signup"
import { logged } from "actions/user"
import Username from "components/Username.jsx"
import "styles/signup.less"

export class Signup extends Component {
  constructor (props) {
    super(props)

    this.sendUsername = this.sendUsername.bind(this)
  }

  componentDidMount () {
    const { logged } = this.props

    this.unsubscribe = subscribe("username: updated", (username) => {
      logged({ username })
    })
  }

  componentWillUnmount () {  
    this.unsubscribe()
  }

  sendUsername (event) {
    event.preventDefault()

    sendUsername()
  }

  render () {
    const { sendUsername } = this

    return (
      <form
        name="signup"
        onSubmit={sendUsername}>
        <Username />
      </form>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    sendUsername,
    logged
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(Signup)