import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import classNames from "classnames"

export class Username extends Component {
  constructor (props) {
    super(props)

    this.onUpdateUsername = this.onUpdateUsername.bind(this)
  }

  onUpdateUsername ({ target: { value } }) {
    const {
      updateUsername
    } = this.props

    updateUsername(value)
  }

  render () {
    const {
      username,
      usernameIsEmpty,
      usernameIsInvalid,
      usernameIsRequired
    } = this.props

    return (
      <input
        className={classNames("username", {
          "empty": usernameIsEmpty,
          "invalid": usernameIsInvalid,
          "required": usernameIsRequired
        })}
        type="text"
        onChange={this.onUpdateUsername}
        value={username}
        placeholder="Username" />
    )
  }
}

function mapStateToProps ({
}) {
  return { }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Username)