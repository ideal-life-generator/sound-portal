import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import classNames from "classnames"
import { setAdditionalDataUsername } from "actions/user"

export class Username extends Component {
  constructor (props) {
    super(props)

    this.updateUsername = this.updateUsername.bind(this)
  }

  updateUsername ({ target: { value } }) {
    const { set } = this.props

    set(value)
  }

  render () {
    const {
      isEmpty,
      isInvalid,
      value
    } = this.props

    return (
      <input
        className={classNames("username", {
          "empty": isEmpty,
          "invalid": isInvalid
        })}
        type="text"
        onChange={this.updateUsername}
        value={value}
        placeholder="Username"
        autoFocus />
    )
  }
}

function mapStateToProps ({
  user: {
    id,
    additionalData: {
      username: {
        isEmpty,
        isInvalid,
        value
      }
    }
  }
}) {
  return {
    isEmpty,
    isInvalid,
    value
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    set: setAdditionalDataUsername,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Username)