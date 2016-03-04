import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import classNames from "classnames"
import { loginSetPassword } from "actions/login"
import { signupSetPassword } from "actions/signup"

class Password extends Component {
  constructor (props) {
    super(props)

    this.onUpdateInLogin = this.onUpdateInLogin.bind(this)
    this.onUpdateInSignup = this.onUpdateInSignup.bind(this)
  }

  onUpdateInLogin ({ target: { value } }) {
    const {
      updateInLogin
    } = this.props

    updateInLogin(value)
  }

  onUpdateInSignup ({ target: { value } }) {
    const {
      updateInSignup
    } = this.props

    updateInSignup(value)
  }

  render () {
    const {
      isLoginUsed,
      valueInLogin,
      isEmptyInLogin,
      isInvalidInLogin,
      isSignupUsed,
      valueInSignup,
      isEmptyInSignup,
      isInvalidInSignup
    } = this.props
    let classes
    let onUpdate
    let value

    if (isLoginUsed) {
      classes = classNames("field", {
        "is-empty": isEmptyInLogin,
        "is-invalid": isInvalidInLogin
      })
      onUpdate = this.onUpdateInLogin
      value = valueInLogin
    }

    if (isSignupUsed) {
      classes = classNames("field", {
        "is-empty": isEmptyInSignup,
        "is-invalid": isInvalidInSignup
      })
      onUpdate = this.onUpdateInSignup
      value = valueInSignup
    }

    return (
      <input
        className={classes}
        type="password"
        onChange={onUpdate}
        value={value}
        placeholder="Password" />
    )
  }
}

function mapStateToProps ({
  login: {
    isUsed: isLoginUsed,
    password: valueInLogin,
    passwordIsEmpty: isEmptyInLogin,
    passwordIsInvalid: isInvalidInLogin
  },
  signup: {
    isUsed: isSignupUsed,
    password: valueInSignup,
    passwordIsEmpty: isEmptyInSignup,
    passwordIsInvalid: isInvalidInSignup
  }
}) {
  return {
    isLoginUsed,
    valueInLogin,
    isEmptyInLogin,
    isInvalidInLogin,
    isSignupUsed,
    valueInSignup,
    isEmptyInSignup,
    isInvalidInSignup
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    updateInLogin: loginSetPassword,
    updateInSignup: signupSetPassword
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Password)