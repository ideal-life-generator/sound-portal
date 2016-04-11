import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import {
  send,
  subscribe
} from "connection"
import {
  additionalDataUsernameEmpty,
  additionalDataUsernameInvalid,
  loaded
} from "actions/user"
import Username from "components/Username.jsx"
import validation, { usernameValidator } from "globals/validation"
import {
  USERS_EMTPY_USERNAME,
  USERS_INVALID_USERNAME
} from "globals/codes"

export class AdditionalData extends Component {
  constructor (props) {
    super(props)

    this.sendUsername = this.sendUsername.bind(this)
  }

  componentDidMount () {
    const { loaded } = this.props

    this.unsubscribe = subscribe("username: updated", (username) => {
      loaded({ username })
    })
  }

  componentWillUnmount () {  
    this.unsubscribe()
  }

  sendUsername (event) {
    const {
      id,
      username,
      additionalDataUsernameEmpty,
      additionalDataUsernameInvalid
    } = this.props

    validation(usernameValidator(username), (errors) => {
      if (errors) {
        if (errors.includes(USERS_EMTPY_USERNAME)) additionalDataUsernameEmpty()
        else if (errors.includes(USERS_INVALID_USERNAME)) additionalDataUsernameInvalid()
      } else {
        send("username: update", { id, username })
      }
    })
    
    event.preventDefault()
  }

  render () {
    const { sendUsername } = this

    return (
      <form
        name="additional-data"
        className="additional-data"
        onSubmit={sendUsername}>
        <Username />
      </form>
    )
  }
}

function mapStateToProps (state) {
  const {
    user: {
      id,
      additionalData: {
        username: {
          value: username
        }
      }
    }
  } = state

  return {
    id,
    username
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    additionalDataUsernameEmpty,
    additionalDataUsernameInvalid,
    loaded
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AdditionalData)