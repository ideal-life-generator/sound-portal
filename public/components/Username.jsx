import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import classNames from "classnames"
import { updateUsername } from "actions/signup"
import "styles/username.less"

export class Username extends Component {
  constructor (props) {
    super(props)

    this.updateUsername = this.updateUsername.bind(this)
  }

  updateUsername ({ target: { value } }) {
    const { updateUsername } = this.props

    updateUsername(value)
  }

  render () {
    const {
      username,
      usernameIsEmpty,
      usernameIsInvalid
    } = this.props

    return (
      <input
        className={classNames("username", {
          "empty": usernameIsEmpty,
          "invalid": usernameIsInvalid
        })}
        type="text"
        onChange={this.updateUsername}
        value={username}
        placeholder="Username"
        autoFocus />
    )
  }
}

function mapStateToProps ({
  signup: {
    username,
    usernameIsEmpty,
    usernameIsInvalid
  }
}) {
  return {
    username,
    usernameIsEmpty,
    usernameIsInvalid
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ updateUsername }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Username)