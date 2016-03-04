import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import classNames from "classnames"
import { signupSetEmail } from "actions/signup"

class Email extends Component {
  constructor (props) {
    super(props)

    this.onUpdate = this.onUpdate.bind(this)
  }

  onUpdate ({ target: { value } }) {
    const { update } = this.props

    update(value)
  }

  render () {
    const {
      value,
      isEmpty,
      isInvalid,
      isUsed
    } = this.props

    return (
      <input
        className={classNames("field", {
          "is-empty": isEmpty,
          "is-invalid": isInvalid,
          "is-used": isUsed
        })}
        type="text"
        onChange={this.onUpdate}
        defaultValue={value}
        placeholder="Email" />
    )
  }
}

function mapStateToProps ({
  signup: {
    email: value,
    emailIsEmpty: isEmpty,
    emailIsInvalid: isInvalid,
    emailIsUsed: isUsed
  }
}) {
  return {
    value,
    isEmpty,
    isInvalid,
    isUsed
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ update: signupSetEmail }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Email)